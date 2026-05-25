---
name: maintenance
description: Use when handling small repo upkeep, documentation updates, version checks, cache refresh notes, or lightweight consistency fixes that do not need a full planning cycle.
---

# Maintenance

## Overview

Maintenance is for small, low-risk upkeep. Keep it fast: inspect only what matters, make the smallest safe change, verify briefly, and summarize plainly.

Use this skill for:

- Documentation touch-ups.
- Skill list or lifecycle consistency updates.
- Version or metadata checks.
- Cache refresh or restart instructions.
- Small cleanup that stays within the requested scope.

Do not use this skill for feature work, broad refactors, unclear requirements, or changes with risky behavior impact. Use `planning` or `development-cycle` instead.

## Process

1. Confirm the request is small and scoped.
2. Inspect the directly relevant files only.
3. Make the smallest correct change.
4. Run a lightweight relevant check.
5. Report what changed, what passed, and any skipped work.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- The request expands beyond small upkeep.
- A version bump, release, commit, push, or PR is implied but not explicit.
- Multiple valid cleanup directions exist.
- The change would touch unrelated files.

If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| "Small means no verification" | Run a quick relevant check. |
| "Clean nearby files too" | Stay inside the requested scope. |
| "This needs a full plan" | Use a short maintenance pass when risk is low. |
| "I'll bump or commit automatically" | Git and release actions require explicit request. |
