#!/usr/bin/env python3
"""Build a private copy review from the unchanged production site."""
from pathlib import Path
import json
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
REVIEW_ROOT = ROOT / 'private' / 'copy-review'
SITE = REVIEW_ROOT / 'site'
PROPOSAL = ROOT / 'docs' / 'copy-review' / 'broader-copy.json'


def build():
    # Validate required inputs before touching an existing preview.
    proposal = json.loads(PROPOSAL.read_text(encoding='utf-8'))
    if proposal.get('version') != 1 or not isinstance(proposal.get('pages'), list):
        raise ValueError('The copy proposal must contain version 1 and a pages list.')
    studio = ROOT / 'tools' / 'copy-studio'
    if not (studio / 'index.html').is_file():
        raise FileNotFoundError('The copy studio is missing its index.html.')
    subprocess.run([sys.executable, str(ROOT / 'scripts' / 'build_growth.py')],
                   cwd=ROOT, check=True)
    if SITE.exists():
        shutil.rmtree(SITE)
    shutil.copytree(ROOT / 'public', SITE)
    shutil.copytree(studio, SITE / 'tools' / 'copy-studio')
    shutil.copy2(PROPOSAL, SITE / 'copy-review.json')
    for path in SITE.rglob('*.html'):
        html = path.read_text(encoding='utf-8')
        html = re.sub(r'<script\b[^>]*\bsrc=["\']/_vercel/insights/script\.js["\'][^>]*>\s*</script>',
                      '', html, flags=re.I)
        html = re.sub(r'<script>window\.va=window\.va\|\|function\(\)\{.*?</script>',
                      '', html, flags=re.S)
        # Neutralize enquiries even when a preview page is opened outside the editor.
        html = re.sub(r'(<form\b[^>]*\baction=)[\"\'][^\"\']*[\"\']',
                      r'\1"/api/disabled-enquiry"', html, flags=re.I)
        html = html.replace('</head>', '<meta http-equiv="Content-Security-Policy" content="form-action \'none\'">' +
                            '<script>document.addEventListener("submit",function(e){e.preventDefault();e.stopImmediatePropagation()},true)</script></head>')
        # This preview should never be indexed, even if someone changes its bind address.
        html = re.sub(r'<meta name="robots" content="[^"]*">',
                      '<meta name="robots" content="noindex,nofollow">', html)
        path.write_text(html, encoding='utf-8')
    (SITE / 'robots.txt').write_text('User-agent: *\nDisallow: /\n', encoding='utf-8')
    print(f'Built private copy review in {SITE}')
    print(f'Saved edits remain outside the rebuilt site: {REVIEW_ROOT / "drafts.json"}')
    print('Open http://127.0.0.1:4193/tools/copy-studio/ after starting the review server.')


if __name__ == '__main__':
    build()
