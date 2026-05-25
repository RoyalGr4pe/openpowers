# Installation

OpenPowers is installed as an OpenCode plugin and registers skill directories at startup.

## GitHub Install

Add the plugin to `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["openpowers@git+https://github.com/RoyalGr4pe/openpowers.git"]
}
```

Restart OpenCode after changing plugin configuration.

## Local Install

Use an absolute path while developing locally:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["/absolute/path/to/openpowers/opencode-plugin.js"]
}
```

## Select A Profile

Set `OPENPOWERS_PROFILE` before starting OpenCode:

```bash
OPENPOWERS_PROFILE=nextjs opencode
```

Available profiles:

```text
base
nextjs
turborepo
nextjs-turbo
```

Unset `OPENPOWERS_PROFILE` to use `base`.

## Verify Locally

Run these commands from the repository root:

```bash
node --check opencode-plugin.js
OPENPOWERS_PROFILE=nextjs node --input-type=module -e "const { default: plugin } = await import('./opencode-plugin.js'); const hooks = await plugin({}); const config = {}; hooks.config(config); console.log(config.skills.paths.map((path) => path.split('/skills/').at(-1)).join(','))"
```

Expected output for the second command:

```text
base,nextjs
```
