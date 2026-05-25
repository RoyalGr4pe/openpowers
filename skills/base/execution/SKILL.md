---
name: execution
description: Use when executing an approved implementation plan, especially after OpenPowers planning creates or updates docs/openpowers/plans/.
---

# Execution

## Overview

Execute the approved plan exactly. If reality differs from the plan, stop and ask before adapting.

Use this skill after the user approves a plan, not while requirements are still being shaped.

## Preconditions

Before changing files, confirm:

- An approved plan exists, usually under `docs/openpowers/plans/`.
- Any required spec has already been approved.
- No unresolved clarifying questions remain.
- The user has asked to execute, implement, continue, or otherwise proceed from the approved plan.

If any precondition is missing, stop and ask with the OpenCode choice prompt UI.

## Choice Prompt Rule

When execution needs clarification or approval, use OpenCode's choice prompt UI whenever it is available.

Prompts must:

- Ask one question at a time.
- Provide 2-3 concrete options.
- Put the recommended option first and label it `(Recommended)`.
- Allow custom user input through the choice prompt UI.

Fall back to Markdown numbered choices only when the choice prompt tool is unavailable. In Markdown fallback mode, include `Type your own answer` as the final option.

## Execution Loop

1. Read the approved plan before editing files.
2. Check whether the plan is clear and still matches the codebase.
3. If the plan is unclear, stale, or conflicts with actual files, stop and ask with the choice prompt UI.
4. Convert plan tasks into tracked todos.
5. Keep exactly one todo in progress.
6. Execute one task at a time.
7. Make the smallest correct change that satisfies the approved plan.
8. Run that task's verification before marking it complete.
9. Repeat until all plan tasks are complete.
10. Run final verification.
11. Summarize changed files, verification results, blockers, and restart requirements.

## Scope Control

Stay inside the approved plan.

Do not:

- Invent new requirements.
- Add opportunistic refactors.
- Expand scope because the code nearby looks messy.
- Touch unrelated files unless the approved plan requires it.
- Overwrite, revert, or clean up unrelated user changes.

If execution reveals necessary work outside the plan, stop and ask whether to update the plan, defer the work, or proceed with a narrow exception.

## Testing And Verification

Use test-first execution when practical for new behavior, bug fixes, or behavior changes.

- Write or identify a failing test before implementation when the project has a relevant test setup.
- For documentation, configuration, or repositories without test tooling, use the strongest available static verification.
- Never mark a task complete until its verification has passed.
- Never claim completion without fresh final verification evidence.

## Git Rules

Do not commit, amend, push, merge, create a PR, or delete branches unless the user explicitly asks for that git action.

If the user asks for git work, inspect status and verify intended files before proceeding.

## When To Stop And Ask

Stop and ask with the OpenCode choice prompt UI when:

- The approved plan conflicts with actual files.
- The plan omits a necessary decision.
- A verification step fails and there are multiple plausible fixes.
- Implementing the plan requires touching unrelated files.
- The user asks for scope changes mid-execution.
- A dependency or tool needed by the plan is missing.

## Quick Reference

| Situation | Required action |
| --- | --- |
| Approved plan is clear | Execute task-by-task |
| Plan conflicts with files | Stop and ask |
| New scope appears | Stop and ask |
| Verification fails | Diagnose, then ask if multiple fixes are plausible |
| User requests cleanup | Ask whether to update scope |
| User requests git action | Verify status first |

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| "The plan is close enough" | Ask before adapting. |
| "I'll clean this up while here" | Stay inside the approved plan. |
| "This task is done because the code changed" | Run verification first. |
| "I'll commit the result" | Git actions require explicit user request. |
| "I'll fix the failing check my own way" | If multiple fixes are plausible, ask. |
