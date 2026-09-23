# Switching between AI tools

You can stop in one AI tool and carry on in another: Claude (app or claude.ai), Claude Code desktop, Codex, or Hermes. Each piece of work keeps a short note in this folder. The tools write and read these notes themselves. You never need to open or edit them.

## The three things to say

| When | Say |
|---|---|
| You open any AI tool on this project | **continue** |
| You are about to switch tools (if you get the chance) | **handoff** |
| A piece of work is finished | **this is done** |

Ran out of tokens before you could say "handoff"? That's fine. The tools save the note as they go, so the next tool picks up from the last save.

## Opening each tool

- **Claude app or claude.ai:** start a new session on the `well-and-good-websites` repository. Any branch is fine. Say "continue".
- **Claude Code desktop:** open your `well-and-good-websites` folder. Say "continue".
- **Codex on your Mac:** open the same folder. Say "continue".
- **Hermes:** start it in the project folder. Say "continue".

The tool tells you what it is picking up and what it will do next. If more than one piece of work is open, it asks which one. Answer in your own words.

## Other things you can say

- "What am I working on?" lists everything that is open.
- "Continue the pricing work" picks a specific one.
- "New task: ..." starts a new piece of work with its own note.

## Publishing to your website

Nothing reaches your website until you merge a pull request on GitHub, same as before. The tool tells you which pull request is ready. If it says a newer pull request includes an older one, merge the newer one. You can ask the tool to close the old one.

## If a tool warns you

- **Another session may still be working on this.** If you have that other chat open, close it, then tell the tool to go ahead.
- **Two versions clashed.** Let the tool combine them. It asks you only if it needs a decision.
- **GitHub says a pull request has conflicts.** In any tool, say "fix the conflicts on pull request #N" (use the real number).

## One rule for you

This repository is public, so anyone can read these notes on GitHub. Don't ask a tool to save passwords or private client details here.

## For AI tools

The rules are in `CLAUDE.md` (Codex and Hermes read the same file as `AGENTS.md`). The helper is `scripts/handoff.py`.
