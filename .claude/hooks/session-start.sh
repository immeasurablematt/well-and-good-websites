#!/bin/bash
set -euo pipefail

# Install the marketing skill pack (copywriting + cro) globally so it is
# available in every project, branch, and worktree of this Claude Code session.
#
# This runs only in Claude Code on the web, where the home directory is
# ephemeral and global skills would otherwise be lost on each fresh container.
# Locally, install once with:
#   npx skills add coreyhaines31/marketingskills --skill cro copywriting --global --copy -y
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Idempotent: re-running just refreshes the global install.
# --copy keeps the files self-contained; -y skips prompts.
# A non-zero exit from unrelated agent targets (e.g. PromptScript) is tolerated;
# we verify the Claude Code install explicitly below.
npx --yes skills add coreyhaines31/marketingskills \
  --skill cro copywriting --global --copy -y || true

# Verify the skills landed where Claude Code reads global skills.
for skill in copywriting cro; do
  if [ ! -f "$HOME/.claude/skills/$skill/SKILL.md" ]; then
    echo "session-start hook: failed to install global skill '$skill'" >&2
    exit 1
  fi
done

echo "session-start hook: global skills ready (copywriting, cro)"
