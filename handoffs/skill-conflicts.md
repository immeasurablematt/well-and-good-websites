# Remove skills that conflict with Writing Desk

Status: active
Branch: claude/copy-optimization-skills-2xydff
Pull request: #62 (draft)
Updated: 2026-09-25 17:10 UTC by Claude cloud

## Goal
Matthew installed his Writing Desk skill pack (writing-desk plus copyedit, copywriting, line-editing, structural-editing, professional-writing, editorial-research, webcopywriting, all from `immeasurablematt/mb-skills`) and wants no pre-existing skill to conflict with it.

## Next step
Matthew chose to fix the root cause (three parts). (1) Account: he uploads the eight Writing Desk upload files (built and validated with mb-skills `skills/book-compiler/scripts/validate_claude_skill.py`, evals rule skipped, `provenance` field left out because the account has never accepted it) at claude.ai, Settings, Customize, Skills, and deletes `humanizer` there. After that, the cloud copies in `~/.claude/skills/` become duplicates of the account versions and should be removed from cloud workspaces. (2) This repository: no skills live here any more; merge pull request #62. (3) mb-skills: draft pull request immeasurablematt/mb-skills#28 (branch `claude/skill-clash-check`, all 10 test suites pass) tracks `angles` as Matthew's skill and `cro` as a vendor skill from coreyhaines31/marketingskills (Personal Codex profile), and adds a clash check to `scripts/skills.py status`. Next: Matthew reviews and merges mb-skills #28, then publishes it on his Mac as usual (promote and sync); on the Mac, delete `~/.agents/skills/cro` first if it is a plain folder, or vendor sync stops there. Then run `python3 scripts/skills.py status` in mb-skills: it now reports skill clashes across harness roots, synced account skills, and project repositories.

## Done so far
- Installed the eight Writing Desk skills in the Claude cloud workspace (`~/.claude/skills`), identical to mb-skills commit c68c3ec. The older general marketing `copywriting` (v2.0.2, coreyhaines31/marketingskills) there was moved to `~/.claude/skills/.trash/`.
- Checked every skill this workspace loads. None of the seven skills Writing Desk retired on 2026-09-07 (see mb-skills `archive/retired-editorial/README.md`) are present. matthew-voice, linkedin-optimizer, seo-content-brief-generator, strategy, and SEO skills stay on purpose: Matthew's own profiles pair them with Writing Desk.
- Removed this repository's `.agents/skills/copywriting` (the old general marketing copy, same name as Writing Desk's copywriting specialist, which Codex would load when this repository is open) and its entry in `skills-lock.json`.
- Hid the `humanizer` account skill in the cloud workspace (moved to `~/.claude/skills/.trash/`); it duplicates line-editing's humanizing pass and mb-skills `soundshuman`.
- Root-cause fix, part 2: removed the rest of this repository's skills (`.agents/skills/cro`, `.agents/skills/angles`) and `skills-lock.json` (the `npx skills` lock that could reinstall them). `.agents/product-marketing.md` stays: it is context, not a skill. They move to mb-skills so the library manages them.
- humanizer came back into this cloud session on the next account sync, confirming account skills can only be removed on claude.ai.
- mb-skills #28 adds `angles` (owned, Personal Codex), `cro` (vendor from coreyhaines31/marketingskills pinned at 5b2c000, Codex only), `overlaps.json` (declared overlaps, seeded with humanizer and copy-editing), and `scripts/clash_check.py` wired into `skills.py status` (machine-map key `project_skill_roots`, default `~/dev`; `--project-root` overrides). Reviewed: tests re-run and pass; no new em-dashes.
- Its smoke run found one more conflict in the cloud workspace, `~/.agents/skills/copywriting` (the old marketing copy, installed 2026-09-23 with the others); moved to `~/.claude/skills/.trash/`. It also found seven account skills older than the library (book-compiler, linkedin-optimizer, matthew-voice, mb-content-strategy, product-messaging-matrix, seo-content-brief-generator, wysiwyg-copy-studio); validated upload files for those were sent to Matthew with the Writing Desk ones.

## Waiting on Matthew
- On claude.ai (Settings, Customize, Skills): upload the eight Writing Desk files and the seven refreshed skills, and delete humanizer. Then tell a Claude session so it can remove the duplicate cloud copies in `~/.claude/skills/`.
- Merge pull request #62 here, and review and merge mb-skills #28.

## Notes for the next tool
- Matthew's choices (2026-09-25): remove humanizer; keep `cro` and `angles` but manage them in mb-skills instead of this repository; put Writing Desk on his claude.ai account; add a clash check to mb-skills.
- The claude.ai account skills panel is Settings, Customize, Skills (not Capabilities); see mb-skills `docs/desktop-worklist.md`.
- Writing Desk is authored in `immeasurablematt/mb-skills` and installed on the Mac by its `scripts/skills.py`; do not add copies of those skills to this repository.
