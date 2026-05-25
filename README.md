# OpenPowers

OpenPowers is a small OpenCode plugin framework for organizing reusable skills into composable install profiles.

It is intentionally minimal. The repository provides the plugin architecture, profile layout, contributor documentation, and a small base planning skill for future skill growth.

## Profiles

Profiles select which skill directories OpenCode should load. Set `OPENPOWERS_PROFILE` before starting OpenCode:

```bash
OPENPOWERS_PROFILE=nextjs opencode
```

If no profile is set, OpenPowers uses `base`.

Profile composition is additive:

```text
base         -> skills/base
react        -> skills/base + skills/react
nextjs       -> skills/base + skills/react + skills/nextjs
turborepo    -> skills/base + skills/turborepo
nextjs-turbo -> skills/base + skills/react + skills/nextjs + skills/turborepo
```

The `base` profile includes the `planning` skill, which asks structured clarifying questions whenever user intent is unclear and only writes formal specs and plans for work with 3+ meaningful steps.

Shared skills belong in the earliest applicable group. For example, a skill useful to both React and Next.js projects should live under `skills/react`, not be duplicated in `skills/nextjs`.

## How Discovery Works

OpenCode discovers skills by scanning registered skill directories for `SKILL.md` files. OpenPowers registers profile-specific directories through the plugin config hook by appending paths to `cfg.skills.paths`.

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

## Local Development

Clone the repository and reference the plugin file from an OpenCode config:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["https://github.com/RoyalGr4pe/openpowers/opencode-plugin.js"]
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
