---
name: review
description: Use when reviewing completed implementation work after execution and before final completion.
---

# Review

## Overview

Review is a defect-finding gate before completion, not a summary.

Use this skill after execution and before claiming the work is complete.

## Inputs

Review against the available evidence:

- Approved spec, if one exists.
- Approved plan.
- Changed files.
- Verification output.
- User decisions made during planning or execution.

If any required context is missing and affects the review, ask with the OpenCode choice prompt UI before continuing.

## Review Process

1. Compare the implementation against the approved plan.
2. Check whether every planned task is complete.
3. Check for scope creep or unrelated changes.
4. Inspect changed files for defects, regressions, unclear logic, and maintainability risks.
5. Verify that required tests or static checks were run.
6. Apply the Code Quality Review Checklist.
7. Report findings first, ordered by severity.
8. If there are no findings, say so explicitly and list residual risks or unverified areas.

## Code Quality Review Checklist

Before marking the task complete, verify:

- [ ] No duplicate functions were introduced.
- [ ] No duplicate components were introduced.
- [ ] No existing utility, hook, service, or type was reimplemented.
- [ ] No file now contains multiple unrelated responsibilities.
- [ ] No unnecessary abstraction, factory, or helper layer was added.
- [ ] No parallel system was created beside an existing one.
- [ ] No dead code, unused imports, or unused files remain.
- [ ] Naming matches the surrounding codebase.
- [ ] Folder placement matches existing conventions.
- [ ] Tests or verification were added or updated where appropriate.
- [ ] The implementation stays within the requested scope.

## Findings Format

Findings come first. Order by severity:

1. `Critical`: broken behavior, data loss, security risk, or impossible-to-complete requirements.
2. `Important`: likely bug, plan violation, missing verification, duplicate system, or maintainability problem that should be fixed before completion.
3. `Minor`: clarity, naming, organization, or low-risk cleanup.

Each finding should include:

- Severity.
- File and line reference when possible.
- The concrete problem.
- Why it matters.
- The smallest corrective action.

If there are no findings, state `No findings.` before any summary.

## Decision Gate

After review, use OpenCode's choice prompt UI only when findings or residual risks require a user decision:

1. Fix review findings (Recommended)
2. Accept residual risks and continue
3. Request another review pass

Allow custom user input through the choice prompt UI. If the tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

Critical and important findings must be fixed before completion unless the user explicitly accepts the risk.

If there are no findings and no residual risks requiring user choice, do not prompt; continue to `completion`.

## Git Rules

Do not commit, amend, push, merge, create a PR, or delete branches unless the user explicitly asks for that git action.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| "The work looks done" | Check against the approved plan and changed files. |
| "I'll summarize first" | Findings come first. |
| "No tests were requested" | Verify that appropriate tests or static checks were run. |
| "This duplicate is harmless" | Report duplicate or parallel implementations. |
| "I'll fix scope creep quietly" | Ask before changing approved scope. |
