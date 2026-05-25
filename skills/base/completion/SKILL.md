---
name: completion
description: Use when finalizing work after development-cycle exit criteria are met and before sending the final completion response.
---

# Completion

## Overview

Completion is the final evidence gate. Do not claim work is complete unless verification, review, risks, restart notes, and git action status are known.

Use this skill after `development-cycle` exit criteria are met.

## Completion Gate

Before producing the final response, verify:

- All approved plan tasks are complete.
- Required verification ran and passed.
- Review ran after execution.
- Review has no critical or important findings, unless the user explicitly accepted the risk.
- Residual risks and unverified areas are known.
- Restart, cache refresh, migration, or deployment notes are known.
- Git actions were either explicitly requested and performed, or explicitly skipped.

If verification, review, or exit criteria are missing, route back to `development-cycle` instead of summarizing the work as done.

Do not claim completion without fresh evidence for these items.

## Final Response Format

Keep the final response concise and factual. Include:

- What changed.
- Verification run and result.
- Review result.
- Residual risks or unverified areas.
- Restart, cache refresh, migration, or deployment notes.
- Git action status.

If something could not be verified, say so directly.

## Stop Conditions

Stop and ask with the OpenCode choice prompt UI when:

- Verification is missing or stale.
- Review has unresolved critical or important findings.
- The user must decide whether to accept a residual risk.
- Completion would imply a git action that was not explicitly requested.
- Restart, cache refresh, migration, or deployment requirements are unclear.

Prompts must ask one question at a time, provide 2-3 concrete options, put the recommended option first with `(Recommended)`, and allow custom user input. If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Git Rules

Do not commit, amend, push, merge, create a PR, or delete branches unless the user explicitly asked for that git action.

The completion summary must say whether git actions were performed or skipped.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| "Everything looks done" | Check verification and review evidence first. |
| "Tests passed earlier" | Use fresh verification evidence. |
| "Review found only one important issue" | Important findings block completion unless risk is accepted. |
| "The user knows no git happened" | State git action status explicitly. |
| "Restart notes are obvious" | State restart, cache, migration, or deployment notes directly. |
