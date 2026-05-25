---
name: turborepo-workspace
description: Use when working in Turborepo workspaces, especially package boundaries, task scripts, cache behavior, pipeline dependencies, environment inputs, or Next.js monorepo coordination.
---

# Turborepo Workspace

## Overview

Use this skill for Turborepo workspace changes. Keep package boundaries clear, make task dependencies explicit, and avoid cache behavior that hides stale outputs.

## Workspace Rules

- Identify the affected package or app before editing.
- Keep app-specific code inside the app package.
- Put shared code in an existing shared package only when more than one package needs it.
- Do not create a new package unless the user approves the package name and responsibility.
- Do not add cross-package imports that bypass package exports or workspace conventions.

## Task Scripts

- Prefer existing package scripts over adding new root-only scripts.
- Keep script names consistent across packages when they perform the same kind of task.
- When adding a task, verify whether it belongs in the package `package.json`, the root `package.json`, or `turbo.json`.
- Do not make unrelated packages run for a narrow app change.

## Cache And Inputs

- Make cache inputs explicit when outputs depend on environment variables, config files, generated files, or external schemas.
- Add environment variables to the appropriate Turborepo inputs only when they affect task output.
- Do not disable cache globally to fix one stale task.
- Prefer narrow cache fixes: task inputs, outputs, dependencies, or affected package scripts.

## Next.js Monorepos

When combined with `nextjs-turbo`:

- Keep Next.js App Router rules from `nextjs-app-router`.
- Keep API, service, security, and cache rules in the app package unless shared packages genuinely need them.
- Avoid importing server-only Next.js code into shared client packages.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- The affected package or app is unclear.
- A new package, shared package, or root-level script is needed.
- Cache behavior depends on unknown environment variables or generated files.
- A dependency should move between app, package, or root scope.
- A task graph change could affect unrelated packages.

If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Adding root scripts for one app | Prefer package-local scripts. |
| Sharing code too early | Use a shared package only when multiple packages need it. |
| Disabling cache broadly | Fix task inputs, outputs, or dependencies narrowly. |
| Guessing package ownership | Ask which package owns the work. |
| Importing through private paths | Use package exports and workspace conventions. |
