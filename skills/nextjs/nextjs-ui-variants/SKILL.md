---
name: nextjs-ui-variants
description: Use when creating or redesigning a Next.js page with multiple approval-gated UI directions for the user to choose from before finalizing one version.
---

# Next.js UI Variants

## Overview

Use this skill when the user wants multiple UI versions for a page or major page section. The workflow is approval-gated: ask before creating variants, then ask again before finalizing the selected direction.

Follow `nextjs-app-router` file layout rules while creating variants.

## Approval Gate

Before creating UI variants, ask with the OpenCode choice prompt UI:

1. `Create 3 UI variants (Recommended)`
2. `Create 2 UI variants`
3. `Skip variants and build one direction`

Allow custom user input. If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

Do not create multiple versions until the user approves variant generation.

## Required Inputs

Before building, identify:

- Page route or target section.
- Primary user goal.
- Required content and calls to action.
- Existing design system or style constraints.
- Whether variants should be screenshot-reviewed with `browser-review`.

Collect all missing required inputs before building. Ask one structured question at a time and do not infer missing route, content, goal, style, or browser-review decisions.

## Variant Rules

- Create 2-3 meaningfully different directions, not small color swaps.
- Each variant should differ in layout, hierarchy, interaction model, visual tone, or content emphasis.
- Keep variants realistic for production, responsive, and accessible.
- Avoid generic AI-looking layouts when a stronger visual direction is appropriate.
- Do not create more variants than approved.
- Do not hide product or security decisions inside visual variants.

## Next.js File Rules

- Keep `src/app/**/page.tsx` as a server component and do not add `"use client"` to page files.
- Put reusable UI in `src/components`.
- Use exactly one component per component file.
- Put all CSS in `src/styles`.
- Put request logic in `src/services`, never in component files.
- Ask before adding files under `src/lib`, `src/services`, `src/security`, `src/utils`, or `src/hooks`.

For temporary variants, prefer separate component files with clear names, such as:

```text
src/components/<page-name>/<PageName>VariantA.tsx
src/components/<page-name>/<PageName>VariantB.tsx
src/components/<page-name>/<PageName>VariantC.tsx
```

## Presenting Choices

After creating variants, present a concise choice prompt:

1. `Use Variant A (Recommended when strongest)`
2. `Use Variant B`
3. `Use Variant C`

Allow custom user input. Include a short description of each variant and any screenshot paths if `browser-review` was approved and completed.

Do not finalize a variant until the user selects or approves one.

## Finalization

After the user chooses a direction:

- Apply the selected variant as the canonical page UI.
- Remove unselected temporary variants unless the user asks to keep them.
- Run the relevant build, lint, typecheck, or strongest available static check.
- Offer `browser-review` for the final selected UI if it has not already been reviewed.

## Stop And Ask

Ask before continuing when:

- The route, content, or goal is unclear.
- The user asks for more variants than is practical.
- A variant requires new data, services, auth, payments, or risky behavior.
- The existing design system conflicts with the requested visual direction.
- Finalizing a variant would delete work the user may want to keep.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Creating variants without approval | Ask with the Approval UI first. |
| Making three minor color variations | Make genuinely different UI directions. |
| Adding `"use client"` to `page.tsx` | Move interactivity to child components. |
| Leaving unused variants behind | Remove them after final approval unless asked to keep them. |
| Skipping final verification | Run the strongest relevant check. |
