# Profiles

Profiles let OpenPowers load the smallest useful set of skills for a project type.

Without profiles, every project would load every skill. That increases noise and makes skill responsibilities harder to maintain.

## Composition

Profiles compose skill directories instead of duplicating skills:

```text
base         -> skills/base
nextjs       -> skills/base + skills/nextjs
turborepo    -> skills/base + skills/turborepo
nextjs-turbo -> skills/base + skills/nextjs + skills/turborepo
```

The order matters. General skills load first, then more specific skill groups.

## Adding A Profile

To add a profile:

1. Add a directory under `installs/<profile>/.gitkeep`.
2. Add any new skill group under `skills/<group>/.gitkeep`.
3. Add the profile to the `profiles` map in `opencode-plugin.js`.
4. Update the composition tables in `README.md` and this file.
5. Run the local verification command for the new profile.

## Avoiding Duplication

Put each skill in the broadest correct group:

- Use `skills/base` for skills that apply to most projects.
- Use `skills/nextjs` for skills that require Next.js-specific behavior.
- Use `skills/turborepo` for workspace and task-graph skills.

Do not copy a skill into multiple groups. If two profiles need the same skill, move it into a shared group and compose that group into both profiles.

## Best Practices

- Keep profiles additive.
- Keep skill groups focused on project capabilities, not brand names alone.
- Prefer fewer, well-composed profiles over many overlapping variants.
- Update documentation in the same change that updates profile composition.
