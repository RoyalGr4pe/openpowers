# Installation

OpenPowers is an OpenCode V2 plugin that registers profile-specific skills at startup.

## GitHub Install

Add the plugin to `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["github:RoyalGr4pe/openpowers"]
}
```

Restart OpenCode after changing plugin configuration.

## Local Install

Run `npm install`, then use an absolute path while developing locally:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": ["/absolute/path/to/openpowers"]
}
```

## Select A Profile

Use plugin options to select a profile for the project:

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

Available profiles:

```text
base
nextjs
turborepo
nextjs-turbo
```

Omit `profile` to use `base`. `OPENPOWERS_PROFILE` remains available as a fallback for foreground or explicitly configured service environments.

## Verify Locally

Install dependencies and run these commands from the repository root:

```bash
npm install
npm test
opencode plugin list
opencode api get "/api/skill?location[directory]=$PWD"
```

The plugin list should include `openpowers`. The skill response should include the eight base skills by default or the skills selected in the plugin options.
