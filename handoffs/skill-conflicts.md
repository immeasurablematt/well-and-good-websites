# Remove skills that conflict with Writing Desk

Status: active
Branch: claude/copy-optimization-skills-2xydff
Pull request: #62 (draft)
Updated: 2026-09-25 16:35 UTC by Claude cloud

## Goal
Matthew installed his Writing Desk skill pack (writing-desk plus copyedit, copywriting, line-editing, structural-editing, professional-writing, editorial-research, webcopywriting, all from `immeasurablematt/mb-skills`) and wants no pre-existing skill to conflict with it.

## Next step
Matthew chose to fix the root cause (three parts). (1) Account: he uploads the eight Writing Desk upload files (built and validated with mb-skills `skills/book-compiler/scripts/validate_claude_skill.py`, evals rule skipped, `provenance` field left out because the account has never accepted it) at claude.ai, Settings, Customize, Skills, and deletes `humanizer` there. After that, the cloud copies in `~/.claude/skills/` become duplicates of the account versions and should be removed from cloud workspaces. (2) This repository: no skills live here any more; merge pull request #62. (3) mb-skills: a draft pull request (branch `claude/skill-clash-check`) tracks `angles` as Matthew's skill and `cro` as a vendor skill from coreyhaines31/marketingskills (Personal Codex profile), and adds a clash check to `scripts/skills.py status`. Next: finish and review that pull request.

## Done so far
- Installed the eight Writing Desk skills in the Claude cloud workspace (`~/.claude/skills`), identical to mb-skills commit c68c3ec. The older general marketing `copywriting` (v2.0.2, coreyhaines31/marketingskills) there was moved to `~/.claude/skills/.trash/`.
- Checked every skill this workspace loads. None of the seven skills Writing Desk retired on 2026-09-07 (see mb-skills `archive/retired-editorial/README.md`) are present. matthew-voice, linkedin-optimizer, seo-content-brief-generator, strategy, and SEO skills stay on purpose: Matthew's own profiles pair them with Writing Desk.
- Removed this repository's `.agents/skills/copywriting` (the old general marketing copy, same name as Writing Desk's copywriting specialist, which Codex would load when this repository is open) and its entry in `skills-lock.json`.
- Hid the `humanizer` account skill in the cloud workspace (moved to `~/.claude/skills/.trash/`); it duplicates line-editing's humanizing pass and mb-skills `soundshuman`.
- Root-cause fix, part 2: removed the rest of this repository's skills (`.agents/skills/cro`, `.agents/skills/angles`) and `skills-lock.json` (the `npx skills` lock that could reinstall them). `.agents/product-marketing.md` stays: it is context, not a skill. They move to mb-skills so the library manages them.
- humanizer came back into this cloud session on the next account sync, confirming account skills can only be removed on claude.ai.

## Waiting on Matthew
- Upload the eight Writing Desk files to his claude.ai account and delete humanizer there (Settings, Customize, Skills).
- Merge pull request #62 here and review the mb-skills pull request.

## Notes for the next tool
- Matthew's choices (2026-09-25): remove humanizer; keep `cro` and `angles` but manage them in mb-skills instead of this repository; put Writing Desk on his claude.ai account; add a clash check to mb-skills.
- The claude.ai account skills panel is Settings, Customize, Skills (not Capabilities); see mb-skills `docs/desktop-worklist.md`.
- Writing Desk is authored in `immeasurablematt/mb-skills` and installed on the Mac by its `scripts/skills.py`; do not add copies of those skills to this repository.
