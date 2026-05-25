---
name: turborepo-dependencies
description: Use when adding, moving, reviewing, or deduplicating dependencies in Turborepo apps and packages, including root vs package scope, dependency type, peer dependencies, and version consistency.
---

# Turborepo Dependencies

## Overview

Use this skill when dependencies change in a Turborepo workspace. Put dependencies where they are used, keep root dependencies minimal, and avoid leaking app-specific or server-only dependencies into shared packages.

## Placement Rules

- Add a dependency to the app or package that imports it.
- Do not add runtime app dependencies to the root `package.json` unless the root actually runs that code.
- Use root `devDependencies` for workspace-wide tools only, such as formatters, linters, test runners, TypeScript, or Turborepo itself.
- Keep Next.js-specific dependencies in the Next.js app package unless a shared package intentionally targets Next.js.
- Keep server-only dependencies out of client/shared UI packages.

## Dependency Types

- Use `dependencies` for packages needed at runtime by that app or package.
- Use `devDependencies` for build, test, lint, typecheck, codegen, and local-only tooling.
- Use `peerDependencies` when a shared package expects the consuming app to provide the framework or runtime dependency.
- Do not use `peerDependencies` as a default; use them only when the package is meant to be consumed with an external host dependency.

## Version Consistency

- Check existing workspace versions before adding a dependency.
- Prefer one version across the workspace unless there is a concrete compatibility reason.
- Do not add duplicate libraries that solve the same job without user approval.
- Avoid adding a new package if the workspace already has an equivalent dependency or utility.

## Shared Package Safety

- Keep shared packages framework-light unless they are explicitly framework-specific.
- Do not import app-only config, environment variables, or framework runtime APIs into generic shared packages.
- Avoid dependencies that force all consumers to ship unnecessary client code.
- If a shared package needs a heavy dependency, ask whether the package should stay shared or move back into the app.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- It is unclear which app or package owns the dependency.
- Moving a dependency between root, app, and package scope.
- Choosing between `dependencies`, `devDependencies`, and `peerDependencies` is unclear.
- Adding a dependency that duplicates an existing library or utility.
- A dependency could leak server-only code into client packages.

If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Adding app deps to root | Add deps to the package that imports them. |
| Making every framework dep a peer dep | Use peer deps only for host-provided dependencies. |
| Adding duplicate libraries | Reuse the existing workspace dependency when appropriate. |
| Putting server-only deps in UI packages | Keep server-only deps in server/app packages. |
| Guessing dependency ownership | Ask which package owns the code. |
