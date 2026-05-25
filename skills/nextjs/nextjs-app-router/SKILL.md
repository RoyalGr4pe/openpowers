---
name: nextjs-app-router
description: Use when working in Next.js App Router projects, especially src/app routing, server/client boundaries, file layout, services, styles, hooks, utilities, and data fetching.
---

# Next.js App Router

## Overview

Use this skill for Next.js App Router work. Keep route files thin, keep client behavior in components, and keep requests out of components.

## Required File Layout

Use this structure unless the existing project clearly uses a different convention and the user approves changing it:

```text
src/
|-- app/
|-- components/
|-- hooks/
|-- lib/
|-- services/
|-- styles/
`-- utils/
```

## Directory Rules

`src/app` is for App Router entry files only:

- `page.tsx`
- `layout.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- `route.ts`
- route groups and route segments

Do not place reusable components, hooks, utilities, service clients, or CSS modules in `src/app`.

`page.tsx` files must not use `"use client"`. Pages should be server components that compose client components from `src/components` when interactivity is needed.

`error.tsx` may use `"use client"` when Next.js requires it, but keep it route-only and move reusable UI to `src/components`.

`src/components` is for UI components. A component file must contain exactly one component. Do not define two or more components in one component file.

`src/styles` is for all CSS styles, including global CSS, shared CSS, and CSS modules. Do not add style files under `src/app` or `src/components`.

`src/services` is for requests and integration boundaries:

- Internal API route calls.
- External URL/API calls.
- SDK clients for remote services.
- Data access functions that perform network requests.

Component files must not make direct requests to internal APIs or external URLs. Route files, server actions, and components should call service functions instead.

`src/hooks` is for React hooks only. Hooks must not be created until the user confirms why a hook is needed.

`src/lib` is for app-level library setup, adapters, and shared configuration. Ask the user what should go in `src/lib` before adding files there.

`src/utils` is for small pure helpers with no React, Next.js, request, or service dependency. Ask the user what should go in `src/utils` before adding files there.

Before adding files to `src/lib`, `src/services`, `src/utils`, or `src/hooks`, ask what the intended responsibility is and confirm the directory choice.

## Server And Client Boundaries

- Prefer server components by default.
- Add `"use client"` only for browser state, effects, event handlers, browser APIs, or client-only libraries.
- Keep `"use client"` files leaf-level when possible.
- Do not import server-only code into client components.
- Keep secrets and non-public environment variables server-only.
- Only expose browser environment variables with `NEXT_PUBLIC_`.

## Data Fetching And Caching

- Put request logic in `src/services`.
- Use server-side fetching by default.
- Be explicit about cache behavior when it matters: `revalidate`, `cache: "no-store"`, tags, or dynamic rendering.
- Keep route handlers in `src/app/**/route.ts` thin; delegate request logic to `src/services`.
- Keep server actions focused on mutation orchestration; delegate external requests to `src/services`.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- Creating or choosing between `src/lib`, `src/services`, `src/utils`, or `src/hooks`.
- A page appears to need `"use client"` instead of a child client component.
- Existing project layout conflicts with these rules.
- A component seems to need direct request logic.
- The change would introduce a new global style convention.

If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Putting reusable components in `src/app` | Move them to `src/components`. |
| Adding `"use client"` to `page.tsx` | Keep the page server-side and use a child client component. |
| Defining multiple components in one file | Split into one component per file. |
| Fetching from a component file | Move request logic to `src/services`. |
| Adding CSS beside components | Put styles under `src/styles`. |
