---
name: turborepo-package-layout
description: Use when organizing Turborepo apps, packages, shared code, package boundaries, exports, scripts, or readable monorepo file layout.
---

# Turborepo Package Layout

## Overview

Use this skill when changing monorepo structure or moving code between apps and packages. Keep ownership obvious: app-specific code stays in the app, shared code lives in packages only when it is genuinely reused.

## Required Layout

Prefer this structure unless the existing repo has a clear different convention:

```text
apps/
|-- <app-name>/
packages/
|-- <package-name>/
```

Apps belong in `apps/<app-name>`. Shared packages belong in `packages/<package-name>`.

## App Rules

- Keep app-specific routes, pages, styles, config, and feature code inside the app.
- Do not move code into `packages/` unless at least two packages/apps need it or the user approves the shared boundary.
- For Next.js apps, follow `nextjs-app-router` inside the app package.
- Do not make an app import another app's private files.

## Package Rules

- Each package should have one clear responsibility.
- Use `src/` for package source when the package contains code.
- Keep public exports explicit through package entrypoints.
- Do not deep-import another package's internal files.
- Do not create catch-all packages like `packages/utils` unless the user approves the exact responsibility.
- Do not mix unrelated responsibilities in one package.

## Shared Code Rules

- Share code only when there is real reuse or an approved architectural reason.
- Keep UI components, hooks, utilities, types, and services in separate files with clear names.
- Do not create duplicate helpers in multiple packages.
- Prefer extending an existing shared package over creating a parallel one.
- Ask before moving code across package boundaries.

## Scripts And Naming

- Keep script names consistent across packages for the same task type.
- Prefer package-local scripts for package-local work.
- Add root scripts only when they intentionally orchestrate workspace tasks.
- Use clear package names that describe responsibility, not implementation details.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- Creating a new package.
- Moving code from an app into `packages/`.
- Choosing between app-local code and shared package code.
- Adding a package export or changing public package API.
- The existing repo layout conflicts with these rules.

If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Moving one-off app code into `packages/` | Keep it app-local until reuse is real or approved. |
| Deep-importing package internals | Export through package entrypoints. |
| Creating a vague `utils` package | Define a narrow package responsibility first. |
| Mixing unrelated code in one package | Split by responsibility or keep app-local. |
| Adding root scripts for package-local work | Prefer package-local scripts. |
