---
name: nextjs-performance
description: Use when improving or reviewing Next.js performance, including images, fonts, client bundle size, server/client boundaries, Suspense, dynamic imports, rendering mode, or route load behavior.
---

# Next.js Performance

## Overview

Use this skill when a Next.js change can affect load time, bundle size, rendering mode, or user-perceived performance. Prefer server components, small client islands, explicit caching, and optimized assets.

## Client Bundle Rules

- Keep `"use client"` files leaf-level when possible.
- Do not add `"use client"` to `page.tsx`.
- Avoid importing heavy libraries, server-only modules, SDK clients, or service code into client components.
- Move request logic to `src/services` and keep it server-side unless browser execution is required.
- Use dynamic import only for genuinely heavy or optional client-only UI.
- Do not add memoization by default; follow existing project patterns and React Compiler guidance.

## Images

- Use `next/image` for local or trusted remote images when practical.
- Provide stable sizing to avoid layout shift.
- Use `priority` only for the likely LCP image.
- Avoid oversized source images for small display areas.
- Add meaningful alt text for informative images and empty alt text for decorative images.

## Fonts And Styles

- Prefer `next/font` when adding web fonts.
- Avoid font loading that causes layout shift.
- Keep all CSS under `src/styles` per `nextjs-app-router`.
- Avoid large global CSS changes for local component needs.

## Rendering And Caching

- Avoid accidental dynamic rendering from unnecessary cookies, headers, or request-time APIs.
- Use `nextjs-data-cache` when fetch caching, revalidation, or private data freshness matters.
- Do not make an entire route dynamic when a narrower no-store fetch or revalidation strategy is enough.
- Keep expensive data work out of client components.

## Loading States

- Use route-level `loading.tsx` for meaningful route load states.
- Use Suspense around slow or secondary sections when it improves perceived speed.
- Avoid spinners for tiny delays where skeletons, static content, or no loading state is better.
- Keep error and loading UI consistent with the page layout.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- A performance fix would change UX, layout, or product behavior.
- A new image host, font, library, or dynamic import strategy is needed.
- Rendering mode could affect data freshness or privacy.
- Bundle analysis tooling is missing and the performance problem is not obvious.
- The change trades performance against accessibility or design requirements.

If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Adding `"use client"` high in the tree | Keep client components leaf-level. |
| Marking every image `priority` | Use `priority` only for likely LCP. |
| Importing heavy libraries into client components | Move work server-side or dynamically import optional UI. |
| Making routes dynamic unnecessarily | Use the narrowest correct rendering/cache strategy. |
| Adding fonts without layout stability | Use `next/font` and stable metrics where possible. |
