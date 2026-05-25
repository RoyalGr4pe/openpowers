# OpenPowers

OpenPowers is a small OpenCode plugin framework for organizing reusable skills into composable install profiles.

It is intentionally minimal. The repository provides the plugin architecture, profile layout, contributor documentation, and small base workflow skills for future skill growth.

## Profiles

Profiles select which skill directories OpenCode should load. Set `OPENPOWERS_PROFILE` before starting OpenCode:

```bash
OPENPOWERS_PROFILE=nextjs opencode
```

If no profile is set, OpenPowers uses `base`.

Profile composition is additive:

```text
base         -> skills/base
nextjs       -> skills/base + skills/nextjs
turborepo    -> skills/base + skills/turborepo
nextjs-turbo -> skills/base + skills/nextjs + skills/turborepo
```

The `base` profile includes `planning`, `development-cycle`, `execution`, `debugging`, `review`, `browser-review`, `completion`, and `maintenance`. The high-level lifecycle is `planning -> development-cycle -> completion`; `development-cycle` internally coordinates `execution`, `debugging`, and `review` until verification and review gates are clean, then `completion` produces the final verified summary. Use `browser-review` for approval-gated browser screenshots of changed UI. Use `maintenance` for small repo upkeep that does not need the full lifecycle.

The `nextjs` profile adds the Next.js-specific skills listed below. The `turborepo` profile adds `turborepo-workspace` for workspace boundaries, task scripts, caching, and environment inputs.

Shared skills belong in the earliest applicable group. Use `skills/base` for general workflow skills, `skills/nextjs` for Next.js-specific skills, and `skills/turborepo` for workspace/task-graph skills.

## Using Next.js Skills

Start OpenCode with the Next.js profile:

```bash
OPENPOWERS_PROFILE=nextjs opencode
```

Or export the profile once for the current shell:

```bash
export OPENPOWERS_PROFILE=nextjs
opencode
```

Confirm the Next.js skills are loaded with the same profile variable:

```bash
OPENPOWERS_PROFILE=nextjs opencode debug skill
```

If you exported the profile, this is enough:

```bash
opencode debug skill
```

For a Next.js monorepo that also needs Turborepo guidance, use:

```bash
OPENPOWERS_PROFILE=nextjs-turbo opencode
```

Current Next.js skills:

- `nextjs-app-router`: App Router layout, `src/app` route-file rules, server/client boundaries, `src/components`, `src/styles`, `src/services`, and `src/security` placement.
- `nextjs-api-routes`: App Router `route.ts` structure, HTTP methods, validation, rate limits, auth checks, safe responses, service delegation, and mutation revalidation.
- `nextjs-data-cache`: data fetching, public vs private cache strategy, revalidation, dynamic rendering, mutations, and user-specific data safety.
- `nextjs-performance`: images, fonts, client bundle size, server/client boundaries, Suspense/loading states, dynamic imports, and rendering mode performance.
- `nextjs-security`: server-side input validation, `src/security/input-validation.ts`, rate limiting, SQL/data-access safety, auth checks, secrets, cookies, uploads, and external URL safety.
- `nextjs-ui-variants`: approval-gated page creation or redesign with 2-3 meaningfully different UI directions, user selection, finalization, and optional browser-review screenshots.

To add another Next.js skill:

1. Create `skills/nextjs/<skill-name>/SKILL.md`.
2. Add YAML frontmatter with `name: <skill-name>` and a `description` that starts with `Use when`.
3. Write the skill instructions in that file.
4. Update the Current Next.js skills list above.
5. Run `node --check opencode-plugin.js` and refresh cached skills.

No plugin code change is needed when adding a new `SKILL.md` under `skills/nextjs`; the `nextjs` and `nextjs-turbo` profiles scan that directory recursively.

## How Discovery Works

OpenCode discovers skills by scanning registered skill directories for `SKILL.md` files. OpenPowers registers profile-specific directories through the plugin config hook by appending paths to `config.skills.paths`.

The plugin preserves existing OpenCode configuration and only adds the directories required by the selected profile.

## Install From GitHub

Add OpenPowers to your OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["openpowers@git+https://github.com/RoyalGr4pe/openpowers.git"]
}
```

Restart OpenCode after changing plugin configuration.

## Refresh Cached Skills

If OpenCode is still showing old skills after an OpenPowers update, remove the local cached plugin package and restart OpenCode:

```bash
rm -rf "$HOME/.cache/opencode/packages/openpowers@git+https:/github.com/RoyalGr4pe/openpowers.git"
opencode
```

To confirm the skills were refreshed, run:

```bash
opencode debug skill
```

For profile-specific skills, include the profile variable too:

```bash
OPENPOWERS_PROFILE=nextjs opencode debug skill
```

## Local Development

Clone the repository and reference the plugin file from an OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["/absolute/path/to/openpowers/opencode-plugin.js"]
}
```

Then run OpenCode with a profile:

```bash
OPENPOWERS_PROFILE=nextjs-turbo opencode
```

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
