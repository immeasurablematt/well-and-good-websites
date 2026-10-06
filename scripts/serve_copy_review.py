#!/usr/bin/env python3
"""Serve the private copy studio and its durable draft API on loopback only."""
from functools import partial
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import json
import os
import tempfile
import threading
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
REVIEW_ROOT = ROOT / 'private' / 'copy-review'
MAX_BYTES = 2 * 1024 * 1024
SAVE_LOCK = threading.Lock()


def validate_drafts(value):
    if (not isinstance(value, dict) or 'pages' not in value
            or set(value) - {'version', 'pages', 'updatedAt'} or not isinstance(value['pages'], dict)):
        raise ValueError('Drafts must contain a pages object.')
    if 'version' in value and (type(value['version']) is not int or value['version'] != 1):
        raise ValueError('The draft version must be 1.')
    if 'updatedAt' in value:
        draft_timestamp(value)
    if len(value['pages']) > 100:
        raise ValueError('Too many draft pages.')
    for route, page in value['pages'].items():
        if (not isinstance(route, str) or not route.startswith('/') or route.startswith('//')
                or len(route) > 500 or '?' in route or '#' in route
                or '\\' in route or any(part in {'.', '..'} for part in route.split('/'))):
            raise ValueError('Invalid page route.')
        if not isinstance(page, dict) or set(page) - {'fields', 'metadata'}:
            raise ValueError('Invalid page draft.')
        fields = page.get('fields', {})
        if not isinstance(fields, dict) or len(fields) > 2000:
            raise ValueError('Invalid fields object.')
        required = {'tag', 'containerId', 'label', 'originalHtml', 'currentHtml'}
        for key, field in fields.items():
            if not isinstance(key, str) or not key or len(key) > 500:
                raise ValueError('Invalid field key.')
            if not isinstance(field, dict) or not required.issubset(field) or set(field) - required - {'selector'}:
                raise ValueError('Each field must contain tag, containerId, label, originalHtml and currentHtml.')
            if not all(isinstance(v, str) for v in field.values()):
                raise ValueError('Field values must be strings.')
            if any(len(field[name]) > 500 for name in {'tag', 'containerId', 'label'}):
                raise ValueError('Field identifiers are too long.')
            if 'selector' in field and len(field['selector']) > 1000:
                raise ValueError('Field selectors are too long.')
        metadata = page.get('metadata', {})
        if not isinstance(metadata, dict) or set(metadata) - {'title', 'description'}:
            raise ValueError('Metadata may contain only title and description changes.')
        for change in metadata.values():
            if (not isinstance(change, dict) or set(change) != {'original', 'current'}
                    or not all(isinstance(v, str) and len(v) <= 10000 for v in change.values())):
                raise ValueError('Metadata changes must contain original and current strings.')
    return value


def draft_timestamp(value):
    timestamp = value.get('updatedAt')
    if not isinstance(timestamp, str) or len(timestamp) > 100:
        raise ValueError('updatedAt must be an ISO timestamp with a timezone.')
    parsed = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
    if parsed.tzinfo is None:
        raise ValueError('updatedAt must include a timezone.')
    return parsed


def read_drafts(path):
    if not path.exists():
        return {'pages': {}}
    if path.stat().st_size > MAX_BYTES:
        raise ValueError('The existing draft file is larger than the allowed limit.')
    return validate_drafts(json.loads(path.read_text(encoding='utf-8')))


class ReviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, directory, drafts_path, **kwargs):
        self.site_root = Path(directory).resolve()
        self.drafts_path = Path(drafts_path)
        super().__init__(*args, directory=str(self.site_root), **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'same-origin')
        super().end_headers()

    def _json(self, status, value, head=False):
        data = json.dumps(value, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        if not head:
            self.wfile.write(data)

    def _guard(self, require_origin=False):
        port = self.server.server_port
        hosts = {f'127.0.0.1:{port}', f'localhost:{port}'}
        host = self.headers.get('Host', '')
        origin = self.headers.get('Origin')
        if host not in hosts or (origin is not None and origin != f'http://{host}') or (require_origin and origin is None):
            self._json(403, {'error': 'Only same-origin loopback review requests are allowed.'})
            return False
        return True

    def _get(self, head=False):
        if not self._guard():
            return
        if urlsplit(self.path).path == '/api/drafts':
            try:
                with SAVE_LOCK:
                    value = read_drafts(self.drafts_path)
                self._json(200, value, head=head)
            except (ValueError, UnicodeError, OSError) as error:
                self._json(409, {'error': f'Saved drafts need repair. The file was preserved. {error}'}, head=head)
            return
        if urlsplit(self.path).path.startswith('/api/'):
            self._json(404, {'error': 'Unknown API endpoint.'}, head=head)
            return
        path = Path(self.translate_path(self.path)).resolve()
        if not path.is_relative_to(self.site_root):
            self._json(403, {'error': 'The requested file is outside the preview.'}, head=head)
            return
        if path.is_dir() and not any((path / name).is_file() for name in ('index.html', 'index.htm')):
            self._json(404, {'error': 'Directory listings are disabled.'}, head=head)
            return
        if head:
            super().do_HEAD()
        else:
            super().do_GET()

    def do_GET(self):
        self._get()

    def do_HEAD(self):
        self._get(head=True)

    def do_POST(self):
        if not self._guard(require_origin=True):
            return
        if self.path != '/api/drafts':
            self._json(405, {'error': 'Only draft saves are supported. Forms are disabled in this preview.'})
            return
        if self.headers.get('Content-Type', '').split(';', 1)[0].strip().lower() != 'application/json':
            self._json(415, {'error': 'Draft saves require application/json.'})
            return
        try:
            length = int(self.headers.get('Content-Length', ''))
        except ValueError:
            self._json(411, {'error': 'A Content-Length header is required.'})
            return
        if length < 0 or length > MAX_BYTES or self.headers.get('Transfer-Encoding'):
            self._json(413, {'error': 'The draft must be at most 2 MB.'})
            return
        try:
            value = validate_drafts(json.loads(self.rfile.read(length).decode('utf-8')))
            data = json.dumps(value, ensure_ascii=False, indent=2).encode('utf-8')
            if len(data) > MAX_BYTES:
                self._json(413, {'error': 'The saved draft must be at most 2 MB.'})
                return
        except (ValueError, UnicodeError) as error:
            self._json(400, {'error': f'Invalid draft. {error}'})
            return
        try:
            with SAVE_LOCK:
                # Do not replace a malformed existing save with a misleading empty draft.
                existing = read_drafts(self.drafts_path)
                if 'updatedAt' in existing and ('updatedAt' not in value
                        or draft_timestamp(value) < draft_timestamp(existing)):
                    self._json(409, {'error': 'A newer draft is already saved. Reload before saving again.'})
                    return
                self.drafts_path.parent.mkdir(parents=True, exist_ok=True)
                temporary = None
                try:
                    with tempfile.NamedTemporaryFile(dir=self.drafts_path.parent, prefix='.drafts-', delete=False) as handle:
                        temporary = Path(handle.name)
                        handle.write(data)
                        handle.flush()
                        os.fsync(handle.fileno())
                    temporary.replace(self.drafts_path)
                finally:
                    if temporary is not None and temporary.exists():
                        temporary.unlink()
            self._json(200, {'saved': True})
        except (ValueError, UnicodeError, OSError) as error:
            self._json(409, {'error': f'Could not save drafts. The existing file was preserved. {error}'})


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=4193)
    parser.add_argument('--directory', type=Path, default=REVIEW_ROOT / 'site')
    parser.add_argument('--drafts', type=Path, default=REVIEW_ROOT / 'drafts.json')
    args = parser.parse_args()
    if not (args.directory / 'tools' / 'copy-studio' / 'index.html').is_file():
        parser.error('Build the copy review first with python3 scripts/build_copy_review.py.')
    if args.drafts.resolve().is_relative_to(args.directory.resolve()):
        parser.error('Saved drafts must be outside the served directory.')
    handler = partial(ReviewHandler, directory=args.directory, drafts_path=args.drafts)
    with ThreadingHTTPServer(('127.0.0.1', args.port), handler) as server:
        server.daemon_threads = True
        print(f'Copy review: http://127.0.0.1:{server.server_port}/tools/copy-studio/', flush=True)
        print(f'Draft saves: {args.drafts.resolve()}', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == '__main__':
    main()
