# Pick up work across Claude, Codex, and Hermes

Status: active
Branch: claude/copy-optimization-skills-2xydff
Pull request: none yet
Updated: 2026-09-23 00:56 UTC by Claude cloud

## Goal
Let Matthew stop in one AI tool (Claude cloud, Claude desktop, Codex on Mac, Hermes) and continue the same work in another without losing context, and without being able to break anything by accident.

## Next step
Test the setup from a different tool. In Codex on the Mac or in Hermes, open this repo and say "continue". That tool should run `python3 scripts/handoff.py`, find this note, and tell Matthew what it found. If it does, the test passed: tell Matthew, and when he says "this is done", set `Status: done`, commit, and push.

## Done so far
- Added `scripts/handoff.py`: finds the newest version of every note across GitHub branches and this folder, and warns about clashing versions, very recent saves, stale work, and uncommitted changes. Handles squash merges.
- Tested it against 29 simulated multi-tool situations (handoffs, parallel clashes, unsaved edits, squash and merge-commit merges, duplicate names) on Python 3.9 and 3.11.
- Added the session rules to `CLAUDE.md`. `AGENTS.md` links to it, so Codex and Hermes read the same rules.
- Added `handoffs/README.md`, the plain-English guide for Matthew, and a pointer in the root `README.md`.
- Claude Code now runs the handoff check automatically when a session starts (`.claude/settings.json`).

## Waiting on Matthew
- Merge the pull request for this branch. It changes no website pages.

## Notes for the next tool
- `AGENTS.md` is a symlink to `CLAUDE.md`. Edit `CLAUDE.md` only.
- Codex and Hermes do not run the check automatically; they follow the rule at the top of `CLAUDE.md` / `AGENTS.md`.
- The squash-merge check creates a throwaway commit object that is never on a branch. That is expected.
- Scope is this repo only for now. Matthew may later want the same setup in other repos or as a shared skill in mb-skills.
