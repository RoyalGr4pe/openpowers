---
name: nextjs-data-cache
description: Use when working with Next.js data fetching, caching, revalidation, dynamic rendering, fetch options, route handlers, server actions, or user-specific data safety.
---

# Next.js Data Cache

## Overview

Use this skill when data fetching or cache behavior affects correctness, freshness, performance, or security. Be explicit about caching when the data can become stale, user-specific, permission-specific, or mutation-dependent.

Follow `nextjs-app-router`: request logic belongs in `src/services`, not component files.

## Core Rules

- Put request logic in `src/services`.
- Do not fetch directly from component files.
- Treat authenticated, user-specific, tenant-specific, role-specific, cart, checkout, dashboard, account, and admin data as private by default.
- Do not cache private data unless the cache key is safely scoped and the project already has a proven pattern.
- Be explicit with cache behavior when correctness matters.
- Revalidate or bypass cache after mutations.

## Public Data

For public shared data, choose one clear strategy:

- Cache with a revalidation window when stale data is acceptable.
- Use tags when mutations need targeted revalidation.
- Use no-store when the data must always be fresh.

Examples of public cache candidates:

- Marketing content.
- Public product catalog pages.
- Blog posts.
- Public documentation.
- Public feature flags that tolerate short staleness.

## Private Data

For private or permission-dependent data:

- Prefer `cache: "no-store"` or an existing project-specific private cache pattern.
- Read auth/session state server-side before fetching private data.
- Scope data access by authenticated user, tenant, role, or ownership.
- Never reuse public cache helpers for private data.
- Do not store private fetch results in shared module-level variables.

Examples of private data:

- Account settings.
- Billing, checkout, cart, orders, or payments.
- Admin dashboards.
- User profiles that are not public.
- Permission-filtered lists.

## Mutations And Revalidation

After server actions, route-handler mutations, or service-layer writes:

- Revalidate affected paths or tags.
- Keep revalidation close to the mutation orchestration.
- Do not revalidate broad paths when a narrow tag or path is available.
- Document intentionally stale UI if immediate revalidation is not desired.

## Route Handlers And Server Actions

- Keep `src/app/**/route.ts` thin; delegate request and data logic to `src/services`.
- Validate input before cache decisions.
- Rate-limit expensive reads and all sensitive mutations using `nextjs-security` rules.
- Return safe errors without leaking upstream cache keys, tokens, SQL details, or stack traces.

## Dynamic Rendering

Use dynamic rendering intentionally when a route depends on request-time data such as auth, cookies, headers, location, user permissions, or always-fresh external state.

Do not make an entire route dynamic just to fix one small stale field if a narrower no-store service call or revalidation strategy is enough.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- Data could be public or private and the intended visibility is unclear.
- There is no existing cache/revalidation pattern in the project.
- A mutation affects multiple pages or cache tags.
- The freshness requirement is unclear.
- Caching could expose user-specific or permission-specific data.

If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Caching authenticated data like public data | Treat private data as no-store unless safely scoped. |
| Fetching directly in a component file | Move request logic to `src/services`. |
| Mutating data without revalidation | Revalidate affected paths or tags. |
| Making the whole route dynamic by default | Use the narrowest correct freshness strategy. |
| Guessing freshness requirements | Ask before choosing cache behavior. |
