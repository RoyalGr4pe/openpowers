---
name: debugging
description: Use when diagnosing failing tests, builds, static checks, runtime errors, pasted stack traces, or bug reports before applying fixes.
---

# Debugging

## Overview

Debugging is for finding the confirmed cause before changing code. Keep the effort proportional: small errors get short diagnosis, targeted fixes, and quick verification.

Use this skill when:

- A command, test, build, lint, or typecheck fails.
- The user pastes an error, stack trace, or bug report.
- A manual verification step fails.
- A previous fix attempt did not solve the problem.

## Process

1. Read the full error before editing.
2. Identify the failing command, file, line, input, or user action.
3. Reproduce the failure when practical.
4. Inspect the smallest relevant code path.
5. State the likely root cause once evidence supports it.
6. Apply the smallest fix for that cause.
7. Re-run the failing check or the closest available verification.

For obvious local mistakes, do not over-plan. Fix directly, verify, and summarize briefly.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- There are multiple plausible root causes with different fixes.
- The fix requires new product behavior or scope.
- Reproduction needs credentials, services, or user-only context.
- Three focused fix attempts fail.

Prompts must ask one question at a time, provide 2-3 concrete options, put the recommended option first with `(Recommended)`, and allow custom user input. If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Output

Keep the response concise:

- Root cause.
- Fix applied or recommended.
- Verification result.
- Any remaining risk or next action.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| "I know the fix" | Read the full error first. |
| "Try several changes" | Change one confirmed cause at a time. |
| "This needs a full plan" | Keep small failures lightweight. |
| "It probably works now" | Re-run the failing check when possible. |
