---
name: development-cycle
description: Use when carrying out an approved plan that needs iterative implementation, verification, debugging, review, and fixes before completion.
---

# Development Cycle

## Overview

Do not stop after the first implementation pass. Execute, verify, debug, review, fix, and repeat until completion criteria are met.

This skill coordinates `execution`, `debugging`, and `review`; it does not replace them.

The loop is `execution -> verification -> debugging/fix -> review -> verification -> repeat`.

## Preconditions

Use this skill after:

- A spec is approved when required.
- A plan is approved.
- The user asks to implement, execute, continue, or proceed.

If no approved plan exists, return to `planning` before implementation.

## Choice Prompt Rule

When the cycle must stop for a user decision, use OpenCode's choice prompt UI whenever it is available.

Prompts must:

- Ask one question at a time.
- Provide 2-3 concrete options.
- Put the recommended option first and label it `(Recommended)`.
- Allow custom user input through the choice prompt UI.

Fall back to Markdown numbered choices only when the choice prompt tool is unavailable. In Markdown fallback mode, include `Type your own answer` as the final option.

## Cycle

For each approved plan task:

1. Use `execution` to implement one task at a time.
2. Run relevant verification after each meaningful change.
3. If verification fails, use `debugging` to identify the root cause before changing code.
4. Fix the smallest confirmed cause.
5. Re-run verification after each fix.
6. Use `review` after verification passes.
7. Turn review findings into todos.
8. Fix critical and important review findings unless the user explicitly accepts the risk.
9. Re-run verification after fixing review findings.
10. Re-run `review` after important fixes.
11. Repeat until all exit criteria are met.

## Debugging Rules

When tests, builds, static checks, or manual verification fail:

- Read the failure fully.
- Reproduce the failure consistently when possible.
- Identify the root cause before applying a fix.
- Change one cause at a time.
- Do not stack speculative fixes.
- If there are multiple plausible fixes, ask with the OpenCode choice prompt UI.
- If three fix attempts fail, stop and ask whether to revisit the plan or architecture.

## Exit Criteria

The cycle may complete only when:

- All approved plan tasks are complete.
- Required verification passes.
- Review has no critical or important findings, unless the user explicitly accepted the risk.
- Code quality gates from planning, execution, and review are satisfied.
- No unresolved scope questions remain.
- Residual risks and unverified areas are documented.

## Stop Conditions

Stop and ask with the OpenCode choice prompt UI when:

- The plan conflicts with the codebase.
- The implementation requires new scope.
- A verification failure has multiple plausible fixes.
- Three fix attempts fail.
- A review finding conflicts with the approved plan.
- The user asks for unrelated work mid-cycle.

## Completion Handoff

After exit criteria are met, use `completion` for the final response. If the `completion` skill is unavailable, produce a concise completion summary with:

- Plan tasks completed.
- Verification run and results.
- Review result.
- Residual risks.
- Restart or cache refresh notes.
- Explicit note that no git actions were performed unless requested.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| "Tests failed, but I know the fix" | Debug the root cause first. |
| "Review found issues, but the main task works" | Fix critical and important findings before completion. |
| "One verification pass is enough" | Re-run verification after fixes. |
| "Three fixes failed, try one more" | Stop and ask whether to revisit the plan or architecture. |
| "The cycle is done because code changed" | Completion requires passing verification and clean review. |
