#!/usr/bin/env python3
"""Handoff notes: how Claude, Codex, and Hermes pick up each other's work.

Each workstream has one note in handoffs/NAME.md. This script finds the newest
version of every note across the GitHub branches and this folder, so the next
AI tool can continue from the right place.

  python3 scripts/handoff.py                     list open workstreams
  python3 scripts/handoff.py --all               include finished ones
  python3 scripts/handoff.py show NAME           print the newest version of one note
  python3 scripts/handoff.py new NAME "Title" --by "Codex on Mac"

It only reads from GitHub (git fetch). It never commits work, pushes, or switches
branches; the agent does that as the rules in CLAUDE.md / AGENTS.md describe.
"""
from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NOTES = 'handoffs'
NOT_NOTES = {'readme.md'}
NAME = re.compile(r'[a-z0-9]+(?:-[a-z0-9]+)*')
RECENT_MINUTES = 30
STALE_DAYS = 21
WORKTREE = 'this folder (not committed yet)'
ENV = dict(os.environ, GIT_TERMINAL_PROMPT='0')
for key, value in (('GIT_AUTHOR_NAME', 'handoff check'), ('GIT_AUTHOR_EMAIL', 'handoff@localhost'),
                   ('GIT_COMMITTER_NAME', 'handoff check'), ('GIT_COMMITTER_EMAIL', 'handoff@localhost')):
    ENV.setdefault(key, value)  # only names the throwaway squash-check commit

TEMPLATE = '''# {title}

Status: active
Branch: {branch}
Pull request: none yet
Updated: {now} by {by}

## Goal
What Matthew wants, in one or two plain sentences.

## Next step
The single next thing to do, specific enough to start without asking.

## Done so far
- Nothing yet.

## Waiting on Matthew
- Nothing right now.

## Notes for the next tool
- Decisions made, key files, and anything that must not be undone.
'''


def run(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run(['git', *args], cwd=ROOT, env=ENV, capture_output=True, text=True)


def git(*args: str) -> str:
    result = run(*args)
    if result.returncode != 0:
        sys.exit(f'git {" ".join(args)} failed: {result.stderr.strip()}')
    return result.stdout


def fetch() -> bool:
    try:
        return subprocess.run(['git', 'fetch', '--quiet', 'origin'], cwd=ROOT, env=ENV,
                              capture_output=True, timeout=60).returncode == 0
    except (OSError, subprocess.TimeoutExpired):
        return False


def branches() -> dict[str, str]:
    """Branch refs worth reading, mapped to readable labels."""
    tips = {}
    for row in git('for-each-ref', '--format=%(refname) %(objectname)', 'refs/remotes/origin', 'refs/heads').splitlines():
        ref, tip = row.split()
        if not ref.endswith('/HEAD'):
            tips[ref] = tip
    labels = {}
    for ref, tip in tips.items():
        if ref.startswith('refs/remotes/origin/'):
            labels[ref] = ref[len('refs/remotes/origin/'):]
            continue
        name = ref[len('refs/heads/'):]
        remote = 'refs/remotes/origin/' + name
        if remote not in tips:
            labels[ref] = f'{name} (on this computer only, not pushed)'
        elif tips[remote] != tip and git('rev-list', '--count', f'{remote}..{ref}').strip() != '0':
            labels[ref] = f'{name} (this computer has commits not pushed yet)'
    if run('symbolic-ref', '-q', 'HEAD').returncode != 0:
        labels['HEAD'] = "this folder's current commit"
    return labels


def main_ref() -> str | None:
    for ref in ('refs/remotes/origin/main', 'refs/heads/main'):
        if run('rev-parse', '--verify', '--quiet', ref).returncode == 0:
            return ref
    return None


def fields(text: str) -> dict[str, str]:
    found = dict(re.findall(r'^(Status|Branch|Pull request|Updated):[ \t]*(.*)$', text, re.M))
    title = re.search(r'^# (.+)$', text, re.M)
    found['Title'] = title.group(1).strip() if title else ''
    step = re.search(r'^## Next step\s*\n(.*?)(?=^## |\Z)', text, re.M | re.S)
    found['Next step'] = ' '.join(step.group(1).split()) if step else ''
    found['Status'] = found.get('Status', 'active').strip().lower() or 'active'
    return found


def collect() -> dict[str, dict[str, dict]]:
    """Every distinct version of every note: {name: {blob: version}}."""
    notes: dict[str, dict[str, dict]] = {}

    def add(name, blob, when, where, text=None):
        version = notes.setdefault(name, {}).setdefault(blob, {'when': when, 'where': [], 'text': text})
        version['when'] = min(version['when'], when)
        version['where'].append(where)

    for ref in branches():
        for row in git('ls-tree', ref, NOTES + '/').splitlines():
            meta, path = row.split('\t', 1)
            name = path.split('/', 1)[1]
            if meta.split()[1] != 'blob' or not name.endswith('.md') or name.lower() in NOT_NOTES:
                continue
            when = int(git('log', '-1', '--format=%ct', ref, '--', path).strip() or 0)
            add(name[:-3], meta.split()[2], when, ref)

    folder = ROOT / NOTES
    for path in sorted(folder.glob('*.md')) if folder.is_dir() else []:
        if path.name.lower() in NOT_NOTES:
            continue
        rel = f'{NOTES}/{path.name}'
        blob = git('hash-object', rel).strip()
        committed = run('rev-parse', f'HEAD:{rel}')
        if committed.returncode != 0 or committed.stdout.strip() != blob:
            add(path.stem, blob, int(path.stat().st_mtime), WORKTREE, path.read_text())
    return notes


def text_of(blob: str, version: dict) -> str:
    return version['text'] if version['text'] is not None else git('cat-file', 'blob', blob)


def history(ref: str, name: str) -> set[str]:
    """Every version of a note ever committed in a branch's history."""
    out = git('log', '--full-history', '-m', '--no-abbrev', '--raw', '--format=', ref, '--', f'{NOTES}/{name}.md')
    return {line.split()[3] for line in out.splitlines() if line.startswith(':')}


ABSORBED: dict[tuple[str, str], bool] = {}


def absorbed(ref: str, into: str | None) -> bool:
    """True when a branch's work is already inside another branch, including squash merges."""
    if not into or WORKTREE in (ref, into):
        return False
    if (ref, into) not in ABSORBED:
        if run('merge-base', '--is-ancestor', ref, into).returncode == 0:
            result = True
        else:
            base = run('merge-base', into, ref).stdout.strip()
            tree = run('rev-parse', f'{ref}^{{tree}}').stdout.strip()
            if not base or not tree:
                result = False
            elif tree == run('rev-parse', f'{base}^{{tree}}').stdout.strip():
                result = True
            else:
                # A squash merge leaves no shared history, so compare the branch's
                # combined change against the changes already in the other branch.
                probe = git('commit-tree', tree, '-p', base, '-m', 'handoff squash check').strip()
                result = git('cherry', into, probe).startswith('-')
        ABSORBED[(ref, into)] = result
    return ABSORBED[(ref, into)]


def analyse(name: str, versions: dict[str, dict], labels: dict[str, str], main: str | None) -> dict:
    blob, newest = max(versions.items(), key=lambda item: item[1]['when'])
    info = fields(text_of(blob, newest))
    where = newest['where']
    wanted = info.get('Branch', '').strip().removeprefix('origin/')
    committed = [ref for ref in where if ref != WORKTREE]
    unmerged = [ref for ref in committed if not absorbed(ref, main)]
    if WORKTREE in where:
        home = WORKTREE
    elif any(labels.get(ref, ref).split(' ')[0] == wanted and ref not in (main,) for ref in unmerged):
        home = next(ref for ref in unmerged if labels.get(ref, ref).split(' ')[0] == wanted)
    elif unmerged:
        home = max(unmerged, key=lambda ref: int(git('log', '-1', '--format=%ct', ref).strip()))
    elif main in where:
        home = main
    else:
        home = committed[0]
    targets = committed or ['HEAD']
    seen = set().union(*(history(ref, name) for ref in targets)) | {blob}
    for version in versions.values():
        for ref in version['where']:
            if ref not in targets and any(absorbed(ref, target) for target in targets):
                seen |= history(ref, name)
    clashes = [v for other, v in versions.items() if other not in seen]
    return {'blob': blob, 'newest': newest, 'info': info, 'home': home, 'clashes': clashes,
            'merged': home != main and absorbed(home, main)}


def label(ref: str, labels: dict[str, str]) -> str:
    return ref if ref == WORKTREE else labels.get(ref, ref)


def age(when: int) -> str:
    minutes = max(0, int((time.time() - when) / 60))
    if minutes < 60:
        return f'{minutes} minute{"s" * (minutes != 1)} ago'
    hours = minutes // 60
    if hours < 48:
        return f'{hours} hour{"s" * (hours != 1)} ago'
    return f'{hours // 24} days ago'


def where_text(result: dict, labels: dict[str, str], main: str | None) -> str:
    home = result['home']
    if home == WORKTREE:
        return 'this folder, with changes that are not committed yet'
    if home == main:
        return 'main (already on the live branch)'
    state = 'merged into main' if result['merged'] else 'not merged into main yet'
    return f'branch {label(home, labels)} ({state})'


def folder_state() -> str:
    branch = git('branch', '--show-current').strip() or 'no branch (detached)'
    changed = len([line for line in git('status', '--porcelain').splitlines() if line.strip()])
    parts = [f'This folder is on {branch}.']
    if changed:
        parts.append(f'{changed} file{"s" * (changed != 1)} changed but not committed.')
    upstream = run('rev-list', '--count', '@{upstream}..HEAD')
    if upstream.returncode == 0 and upstream.stdout.strip() != '0':
        parts.append(f'{upstream.stdout.strip()} commit(s) not pushed to GitHub.')
    return ' '.join(parts)


def warnings_for(name: str, result: dict, labels: dict[str, str], shallow: bool) -> list[str]:
    if result['info']['Status'] == 'done':
        return []
    notes = []
    saved = result['newest']['when']
    if time.time() - saved < RECENT_MINUTES * 60:
        notes.append(f'{name} was saved {age(saved)}. If you did not make that save, another AI session '
                     'may still be working on it. Ask Matthew before changing anything.')
    for version in result['clashes']:
        places = ', '.join(label(ref, labels) for ref in version['where'])
        notes.append(f'{name} has a different version on: {places} (saved {age(version["when"])}) that the '
                     'newest version does not include. Two sessions may have worked on it at once. Combine both '
                     'versions before continuing (for a branch, merge it into yours) and tell Matthew what you '
                     'combined.' + (' This copy of the repo has partial history, so this may be a false alarm.'
                                    if shallow else ''))
    if time.time() - saved > STALE_DAYS * 86400:
        notes.append(f'{name} was last saved {age(saved)} and is still open. Ask Matthew whether it is done.')
    return notes


def list_notes(show_all: bool, fetched: bool | None) -> None:
    labels, main = branches(), main_ref()
    notes = collect()
    shallow = git('rev-parse', '--is-shallow-repository').strip() == 'true'
    if fetched is None:
        print('Handoff notes (GitHub not checked; run without --no-fetch to check)')
    elif fetched:
        print('Handoff notes (checked GitHub just now)')
    else:
        print('Handoff notes (could not reach GitHub, so this may be out of date)')
    if not notes:
        print('\nNo handoff notes yet. When you start a task, create one:')
        print('  python3 scripts/handoff.py new NAME "Plain title" --by "TOOL"')
    results = {name: analyse(name, versions, labels, main) for name, versions in notes.items()}
    open_items = sorted((n for n, r in results.items() if r['info']['Status'] != 'done'),
                        key=lambda n: -results[n]['newest']['when'])
    done = sorted((n for n, r in results.items() if r['info']['Status'] == 'done'),
                  key=lambda n: -results[n]['newest']['when'])
    if notes:
        print('\nOPEN WORKSTREAMS' if open_items else '\nNo open workstreams.')
    for number, name in enumerate(open_items + (done if show_all else []), 1):
        result, info = results[name], results[name]['info']
        if number == len(open_items) + 1:
            print('\nFINISHED')
        print(f'{number:>2}. {name}  [{info["Status"]}]  {info["Title"]}')
        step = info['Next step']
        if step and info['Status'] != 'done':
            print(f'    Next step: {step if len(step) <= 240 else step[:237].rstrip() + "..."}')
        print(f'    Last saved: {age(result["newest"]["when"])}. Note says: {info.get("Updated", "").strip() or "no date"}')
        print(f'    Newest version: {where_text(result, labels, main)}')
    if done and not show_all:
        print(f'\nFinished workstreams: {len(done)} (add --all to list them)')
    alerts = [w for name in open_items + done for w in warnings_for(name, results[name], labels, shallow)]
    if alerts:
        print('\nWARNINGS')
        for alert in alerts:
            print(f' ! {alert}')
    print('\n' + folder_state())
    if notes:
        print('Full note and how to continue it: python3 scripts/handoff.py show NAME')


def show(name: str) -> None:
    labels, main = branches(), main_ref()
    versions = collect().get(name)
    if not versions:
        sys.exit(f'No handoff note called "{name}". Run python3 scripts/handoff.py to list them.')
    result = analyse(name, versions, labels, main)
    print(text_of(result['blob'], result['newest']).rstrip())
    print('\n---')
    print(f'Newest version: {where_text(result, labels, main)}, saved {age(result["newest"]["when"])}.')
    others = [label(ref, labels) for ref in result['newest']['where'] if ref != result['home']]
    if others:
        print(f'The same version is also on: {", ".join(others)}.')
    home = result['home']
    current = git('branch', '--show-current').strip()
    if home in (WORKTREE, 'HEAD'):
        print('To continue: keep working here and commit the note with your next change.')
    elif home == main or result['merged']:
        print('To continue: start a new branch from the latest main, as you would for new work,')
        print('then update the note\'s Branch line.')
    else:
        branch = label(home, labels).split(' ')[0]
        if branch == current:
            print('To continue: you are already on this branch. Pull first: git pull --ff-only')
        else:
            print('To continue, either switch to it (if you can push to it):')
            print(f'  git switch {branch} && git pull --ff-only')
            print('or, if you must stay on your own branch, bring its work into yours:')
            print(f'  git merge {"origin/" + branch if home.startswith("refs/remotes/") else branch}')
            print('then update the note\'s Branch and Pull request lines.')
    for alert in warnings_for(name, result, labels, git('rev-parse', '--is-shallow-repository').strip() == 'true'):
        print(f' ! {alert}')


def new(name: str, title: str, by: str) -> None:
    if not NAME.fullmatch(name) or name == 'readme':
        sys.exit(f'"{name}" is not a usable name. Use short lowercase words joined by hyphens, like seo-service-pages.')
    existing = collect().get(name)
    if existing:
        labels = branches()
        places = ', '.join(label(ref, labels) for v in existing.values() for ref in v['where'])
        sys.exit(f'A workstream called "{name}" already exists (on {places}). '
                 f'Continue it with: python3 scripts/handoff.py show {name}  or pick a different name.')
    path = ROOT / NOTES / f'{name}.md'
    path.parent.mkdir(exist_ok=True)
    branch = git('branch', '--show-current').strip() or 'none'
    now = datetime.now().astimezone().strftime('%Y-%m-%d %H:%M %Z')
    path.write_text(TEMPLATE.format(title=title.strip(), branch=branch, now=now, by=by.strip()))
    print(f'Created {NOTES}/{name}.md. Fill in Goal and Next step, then commit and push it with your work.')


def cli() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--all', action='store_true', help='include finished workstreams')
    parser.add_argument('--no-fetch', action='store_true', help='skip checking GitHub')
    sub = parser.add_subparsers(dest='command')
    show_cmd = sub.add_parser('show', help='print the newest version of one note')
    show_cmd.add_argument('name')
    new_cmd = sub.add_parser('new', help='start a note for a new workstream')
    new_cmd.add_argument('name')
    new_cmd.add_argument('title')
    new_cmd.add_argument('--by', default='an AI tool', help='which tool is writing, for example "Codex on Mac"')
    args = parser.parse_args()
    fetched = None if args.no_fetch else fetch()
    if args.command == 'show':
        show(args.name)
    elif args.command == 'new':
        new(args.name, args.title, args.by)
    else:
        list_notes(args.all, fetched)


if __name__ == '__main__':
    cli()
