# Writing Skills

OpenPowers skills are Markdown files named `SKILL.md` inside a directory named after the skill.

```text
skills/base/example-skill/SKILL.md
```

## Frontmatter

Every skill needs YAML frontmatter:

```markdown
---
name: example-skill
description: Use when validating that OpenPowers skill discovery is wired correctly in a new installation.
---
```

Rules:

- `name` is lowercase, hyphen-separated, and matches the directory name.
- `description` starts with `Use when...`.
- `description` explains when to use the skill, not just what the skill does.
- Keep frontmatter concise so OpenCode can scan it efficiently.

## Naming

Use names that describe the action or situation clearly:

```text
writing-tests
reviewing-react-components
debugging-turborepo-caching
```

Avoid vague names:

```text
best-practices
tips
misc
```

## Good Descriptions

Good descriptions help OpenCode decide when to load a skill.

Good:

```yaml
description: Use when reviewing React components for state, effects, rendering behavior, or accessibility issues.
```

Weak:

```yaml
description: Explains React component review best practices.
```

The good description names the triggering situation. The weak description only describes the document.

## Skill Body

Keep the body focused:

- Start with the core principle.
- Explain when to use the skill.
- Provide the minimum workflow or reference needed.
- Include examples only when they clarify behavior.
- Move large references or reusable scripts into supporting files.

## Composability

Skills should have one clear responsibility. Avoid monolithic skills that cover unrelated workflows.

If a skill grows too broad, split it into smaller skills and place each one in the broadest correct skill group.

## Avoid Duplicate Responsibilities

Before adding a skill, check existing skill groups for overlapping responsibilities.

If a new skill partially overlaps an existing one, prefer narrowing the scope of both skills instead of creating competing guidance.
