# OpenPowers

OpenPowers is a small OpenCode V2 plugin framework for organizing reusable skills into composable install profiles.

It is intentionally minimal. The repository provides the plugin architecture, profile layout, contributor documentation, and small base workflow skills for future skill growth.

## Profiles

Profiles select which skill directories OpenCode should load. Set a profile in the plugin options:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    {
      "package": "github:RoyalGr4pe/openpowers",
      "options": { "profile": "nextjs" }
    }
  ]
}
```

If no profile is set, OpenPowers uses `base`. `OPENPOWERS_PROFILE` remains available as a fallback for foreground or explicitly configured service environments.

Profile composition is additive:

```text
base         -> skills/base
nextjs       -> skills/base + skills/nextjs
turborepo    -> skills/base + skills/turborepo
nextjs-turbo -> skills/base + skills/nextjs + skills/turborepo
```

The `base` profile includes `planning`, `development-cycle`, `execution`, `debugging`, `review`, `browser-review`, `completion`, and `maintenance`. The high-level lifecycle is `planning -> development-cycle -> completion`; `development-cycle` internally coordinates `execution`, `debugging`, and `review` until verification and review gates are clean, then `completion` produces the final verified summary. Use `browser-review` for approval-gated browser screenshots of changed UI. Use `maintenance` for small repo upkeep that does not need the full lifecycle.

The `nextjs` profile adds the Next.js-specific skills listed below. The `turborepo` profile adds the Turborepo-specific skills listed below.

Shared skills belong in the earliest applicable group. Use `skills/base` for general workflow skills, `skills/nextjs` for Next.js-specific skills, and `skills/turborepo` for workspace/task-graph skills.

## Using Next.js Skills

Configure the plugin with the Next.js profile:

```json
{
  "plugins": [
    {
      "package": "github:RoyalGr4pe/openpowers",
      "options": { "profile": "nextjs" }
    }
  ]
}
```

Confirm the Next.js skills are loaded:

```bash
opencode api get "/api/skill?location[directory]=$PWD"
```

For a Next.js monorepo that also needs Turborepo guidance, set the option to:

```json
{ "profile": "nextjs-turbo" }
```

Current Next.js skills:

- `nextjs-app-router`: App Router layout, `src/app` route-file rules, server/client boundaries, `src/components`, `src/styles`, `src/services`, and `src/security` placement.
- `nextjs-api-routes`: App Router `route.ts` structure, HTTP methods, validation, rate limits, auth checks, safe responses, service delegation, and mutation revalidation.
- `nextjs-auth`: authentication, authorization, ownership checks, protected routes, sessions, cookies, roles, permissions, and private data access.
- `nextjs-data-cache`: data fetching, public vs private cache strategy, revalidation, dynamic rendering, mutations, and user-specific data safety.
- `nextjs-performance`: images, fonts, client bundle size, server/client boundaries, Suspense/loading states, dynamic imports, and rendering mode performance.
- `nextjs-security`: server-side input validation, `src/security/input-validation.ts`, rate limiting, SQL/data-access safety, auth checks, secrets, cookies, uploads, and external URL safety.
- `nextjs-ui-variants`: approval-gated page creation or redesign with 2-3 meaningfully different UI directions, user selection, finalization, and optional browser-review screenshots.

To add another Next.js skill:

1. Create `skills/nextjs/<skill-name>/SKILL.md`.
2. Add YAML frontmatter with `name: <skill-name>` and a `description` that starts with `Use when`.
3. Write the skill instructions in that file.
4. Update the Current Next.js skills list above.
5. Run `npm test` and update the installed plugin.

No plugin code change is needed when adding a new `SKILL.md` under `skills/nextjs`; the `nextjs` and `nextjs-turbo` profiles scan that directory recursively.

## Using Turborepo Skills

Set the plugin's `profile` option to `turborepo`:

```json
{ "profile": "turborepo" }
```

Current Turborepo skills:

- `turborepo-dependencies`: root vs package dependency placement, dependency type, peer dependencies, version consistency, and client/server dependency safety.
- `turborepo-workspace`: workspace boundaries, package scripts, cache behavior, task inputs, and environment variables.
- `turborepo-package-layout`: `apps/` and `packages/` layout, package ownership, shared-code boundaries, exports, scripts, and readable monorepo structure.

## How Discovery Works

OpenPowers scans the selected profile directories for `SKILL.md` files and registers them through OpenCode V2's skill transform API.

The plugin preserves existing OpenCode skills and only adds the skills required by the selected profile.

## Install From GitHub

Add OpenPowers to your OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["github:RoyalGr4pe/openpowers"]
}
```

Restart OpenCode after changing plugin configuration.

## Refresh Cached Skills

Ask OpenCode to update the Git plugin, then restart the service:

```bash
opencode plugin update github:RoyalGr4pe/openpowers
opencode service restart
```

To confirm the skills were refreshed, run:

```bash
opencode api get "/api/skill?location[directory]=$PWD"
```

The response reflects the profile configured for that project.

## Local Development

Clone the repository, run `npm install`, and reference the plugin directory from an OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    {
      "package": "/absolute/path/to/openpowers",
      "options": { "profile": "nextjs-turbo" }
    }
  ]
}
```

Omit the options object to test the base profile.

## Creating Skills

Create each skill in its own directory:

```text
skills/base/example-skill/SKILL.md
```

Every skill must include YAML frontmatter with `name` and `description`. Descriptions should explain when to use the skill, not merely what it contains.

Read `docs/writing-skills.md` before adding real skills.

## Repository Structure

```text
openpowers/
|-- README.md
|-- package.json
|-- opencode-plugin.js
|-- installs/
|-- skills/
|-- docs/
`-- .opencode/
```

`installs/` names supported profiles. `skills/` contains composable skill groups. `docs/` explains installation, profile design, and future skill authoring.
