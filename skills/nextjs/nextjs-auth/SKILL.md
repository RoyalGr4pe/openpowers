---
name: nextjs-auth
description: Use when implementing or reviewing Next.js authentication, authorization, session handling, protected routes, ownership checks, role permissions, auth cookies, or private user data access.
---

# Next.js Auth

## Overview

Use this skill for authentication and authorization in Next.js. Authentication proves who the user is. Authorization decides what that user can access. Ownership checks prove the specific resource belongs to or is allowed for that user.

## Core Rules

- Use the project's existing auth library and patterns when present.
- Do not invent a new auth system without user approval.
- Never trust client-provided user IDs, roles, permissions, prices, tenant IDs, or ownership flags.
- Check authorization server-side for every private resource access.
- Treat private auth-dependent data as no-store unless the project has a safe scoped cache pattern.
- Keep secrets, tokens, and session internals server-only.

## Where Checks Belong

- Use middleware only for broad route gating and redirects.
- Use route handlers for API authentication, authorization, safe errors, and status codes.
- Use server actions for mutation authentication, authorization, validation, and revalidation.
- Use services for resource-level ownership checks and scoped data access.
- Do not put auth enforcement only in client components.

## Pages And Redirects

- For protected pages, verify auth server-side before rendering private content.
- Redirect unauthenticated page users to the correct sign-in flow when that is the project pattern.
- Return safe `401` or `403` responses from APIs instead of page redirects unless the API contract says otherwise.
- Do not render private fallback content while auth is unknown.

## Sessions And Cookies

- Use `httpOnly`, `secure`, and appropriate `sameSite` settings for session cookies.
- Scope cookie paths as narrowly as practical.
- Do not store sensitive session data in client-readable cookies.
- Do not log tokens, session IDs, cookies, passwords, or full auth headers.

## Roles, Permissions, And Ownership

- Check roles and permissions on the server near the protected action or data access.
- Check ownership against trusted server-side identity, not request body claims.
- Scope database queries by authenticated user, tenant, or permission where possible.
- Avoid broad admin bypasses unless the product explicitly requires them.

## Interactions With Other Skills

- Use `nextjs-security` for input validation, rate limiting, cookies, and safe errors.
- Use `nextjs-api-routes` for API response shape and route handler structure.
- Use `nextjs-data-cache` for private data caching and revalidation.
- Use `nextjs-app-router` for server/client boundaries and file placement.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- The project has no existing auth library or pattern.
- The required roles, permissions, ownership rules, or tenant boundaries are unclear.
- Choosing between middleware, route-handler, server-action, or service-level enforcement affects behavior.
- Auth behavior differs for page users and API clients.
- A shortcut would expose private data or weaken authorization.

If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Checking only that a user is logged in | Also check authorization and ownership. |
| Trusting `userId` from the request body | Use trusted server-side identity. |
| Protecting only the client UI | Enforce auth server-side. |
| Caching private auth data like public data | Use no-store or a proven scoped cache pattern. |
| Redirecting API clients to sign-in HTML | Return safe `401` or `403` responses. |
