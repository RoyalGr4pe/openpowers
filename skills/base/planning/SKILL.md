---
name: planning
description: Use when planning work, shaping requirements, preparing implementation, or when any user request is unclear and a user decision would otherwise be inferred.
---

# Planning

## Overview

Ask instead of infer. If something is unclear, stop and ask the user a structured clarifying question before deciding for them.

Use formal spec and plan files only for tasks with 3+ meaningful steps. Small tasks can proceed after any needed clarification.

## When To Use

Use this skill when:

- The user asks for planning, design, architecture, requirements, implementation preparation, or a plan.
- A request is ambiguous and needs a user decision about scope, behavior, naming, file location, trade-offs, or success criteria.
- A task appears to require 3+ meaningful steps, multiple files, multiple phases, or coordination between components.

Do not use the spec-and-plan workflow for small, clear, mechanical changes. Still ask a clarifying question if any part of the small task is unclear.

## Core Rules

1. Always ask a clarifying question when something is unclear.
2. Never silently infer a user decision.
3. Ask one clarifying question at a time.
4. Provide 2-3 concrete choices.
5. Put the recommended choice first and label it `(Recommended)`.
6. Use OpenCode's choice prompt UI whenever it is available.
7. Allow custom user input through the choice prompt UI.
8. Fall back to Markdown numbered choices only when the choice prompt tool is unavailable.

Question format:

```text
Do you want:

1. Keep this focused on the current feature (Recommended)
2. Include adjacent cleanup in the same plan
3. Split the cleanup into a follow-up task
4. Type your own answer
```

With the OpenCode choice prompt UI, enable custom answers instead of adding a manual `Type your own answer` option. In Markdown fallback mode, include `Type your own answer` as the final option.

## Approval UI

Use the same OpenCode choice prompt UI for spec and plan approval gates whenever it is available.

Approval prompts should offer:

1. `Approve as written (Recommended)`
2. `Request changes`

Enable custom user input so the user can type requested changes without manually typing `approve`.

If the choice prompt tool is unavailable, use a short Markdown approval menu with the same options plus `Type requested changes` as the final option.

## Size Gate

Before writing files, decide whether the task has 3+ meaningful steps.

Use the spec-and-plan workflow when the work likely includes:

- Multiple files or modules.
- Multiple implementation phases.
- Non-trivial design choices.
- New behavior plus tests and documentation.
- Coordination between components.
- Meaningful risk of misunderstanding user intent.

Skip spec and plan files for small tasks with fewer than 3 meaningful steps. For small unclear tasks, ask the needed clarifying question, wait for the answer, then proceed normally.

## Big Task Workflow

For tasks with 3+ meaningful steps:

1. Ask clarifying questions until the important unknowns are resolved.
2. Write a spec to `docs/openpowers/specs/YYYY-MM-DD-<topic>.md`.
3. Summarize the spec briefly in chat and ask for approval using the Approval UI.
4. Wait for approval before writing a plan.
5. Write a plan to `docs/openpowers/plans/YYYY-MM-DD-<topic>.md`.
6. Summarize the plan briefly in chat and ask for approval using the Approval UI.
7. Wait for approval before implementation.

The spec should cover goal, scope, requirements, decisions, open questions, and success criteria.

The plan should cover implementation steps, likely files, verification, risks, and dependencies.

## Quick Reference

| Situation | Required action |
| --- | --- |
| Small and clear | Proceed without spec or plan |
| Small but unclear | Ask one structured clarifying question |
| Big and clear | Write spec, summarize, ask approval |
| Big and unclear | Ask structured clarifying questions first |
| User says not to ask | Ask anyway if a user decision is unclear |

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| "I can infer this from context" | Ask if it changes scope, behavior, naming, files, trade-offs, or success criteria. |
| "It is small, so I can guess" | Small tasks skip spec/plan, not clarification. |
| "The user said move fast" | Speed does not permit silent assumptions. |
| "I should write a plan first" | For 3+ step work, write and approve the spec first. |
| "One message with many questions is efficient" | Ask one question at a time. |

## Red Flags

Stop and ask when you think:

- "I'll assume..."
- "Probably they want..."
- "This is obvious enough."
- "I can decide this for them."
- "The user told me not to ask questions."

All of these mean a user decision may be unclear. Ask a structured clarifying question.
