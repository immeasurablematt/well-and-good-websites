# Remove skills that conflict with Writing Desk

Status: active
Branch: claude/copy-optimization-skills-2xydff
Pull request: none yet
Updated: 2026-09-25 14:09 UTC by Claude cloud

## Goal
Matthew installed his Writing Desk skill pack (writing-desk plus copyedit, copywriting, line-editing, structural-editing, professional-writing, editorial-research, webcopywriting, all from `immeasurablematt/mb-skills`) and wants no pre-existing skill to conflict with it.

## Next step
Matthew merges this pull request. Separately, he removes the `humanizer` skill from his Claude account (claude.ai, Settings, Capabilities, Skills), because a cloud session can only hide account skills locally and they return on the next sync. Nothing else is planned.

## Done so far
- Installed the eight Writing Desk skills in the Claude cloud workspace (`~/.claude/skills`), identical to mb-skills commit c68c3ec. The older general marketing `copywriting` (v2.0.2, coreyhaines31/marketingskills) there was moved to `~/.claude/skills/.trash/`.
- Checked every skill this workspace loads. None of the seven skills Writing Desk retired on 2026-09-07 (see mb-skills `archive/retired-editorial/README.md`) are present. matthew-voice, linkedin-optimizer, seo-content-brief-generator, strategy, and SEO skills stay on purpose: Matthew's own profiles pair them with Writing Desk.
- Removed this repository's `.agents/skills/copywriting` (the old general marketing copy, same name as Writing Desk's copywriting specialist, which Codex would load when this repository is open) and its entry in `skills-lock.json`.
- Hid the `humanizer` account skill in the cloud workspace (moved to `~/.claude/skills/.trash/`); it duplicates line-editing's humanizing pass and mb-skills `soundshuman`.

## Waiting on Matthew
- Nothing right now.

## Notes for the next tool
- Matthew's choice (2026-09-25): remove humanizer; keep `cro` and `angles` even though they overlap (cro competes for "improve this page" requests; angles overlaps copywriting in Codex).
- Writing Desk is authored in `immeasurablematt/mb-skills` and installed on the Mac by its `scripts/skills.py`; do not add copies of those skills to this repository.
