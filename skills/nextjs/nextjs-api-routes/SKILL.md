---
name: nextjs-api-routes
description: Use when creating or reviewing Next.js App Router route handlers, API endpoints, HTTP methods, request validation, response shapes, rate limits, safe errors, or service delegation.
---

# Next.js API Routes

## Overview

Use this skill for App Router route handlers in `src/app/**/route.ts`. Keep route handlers thin: validate, authenticate, authorize, call services, and return safe responses.

## File And Responsibility Rules

- Route handlers live in `src/app/**/route.ts`.
- Business logic and external/internal requests belong in `src/services`.
- Shared input validation belongs in `src/security/input-validation.ts`.
- Do not put reusable components, hooks, CSS, or utilities in route folders.
- Do not duplicate endpoint logic across multiple route handlers.

## Handler Structure

Each route handler should follow this order when relevant:

1. Parse request method inputs.
2. Validate body, params, and search params.
3. Apply rate limits for public, mutation, auth, or expensive endpoints.
4. Authenticate the user if required.
5. Authorize access to the specific resource.
6. Call a service function for data access or external requests.
7. Return a safe, typed response shape.

Use named exports for supported methods, such as `GET`, `POST`, `PATCH`, and `DELETE`. Do not silently accept unsupported methods.

## Validation And Security

- Validate all user-controlled input before use.
- Limit body and field sizes before expensive parsing or service calls.
- Never trust client-provided user IDs, roles, ownership, prices, permissions, or tenant IDs.
- Use parameterized queries or ORM-safe APIs in the service/data layer.
- Do not expose stack traces, SQL errors, tokens, upstream secrets, or internal service details.
- Use `nextjs-security` for auth, authorization, input validation, rate limiting, cookies, uploads, and external URL risks.

## Responses

- Return consistent JSON response shapes for success and errors.
- Use appropriate HTTP status codes.
- Keep client-facing error messages short and safe.
- Log enough server-side context to debug without logging secrets.
- Avoid returning raw upstream responses directly to clients.

## Caching

- Treat route handlers that return private data as no-store unless a safe project pattern exists.
- Use `nextjs-data-cache` when cache behavior, revalidation, user-specific data, or mutations are involved.
- Revalidate affected paths or tags after mutations when the endpoint changes cached data.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- The endpoint's auth or authorization requirements are unclear.
- The expected request or response shape is unclear.
- There is no existing validation, rate-limit, service, or error-response pattern.
- The endpoint mutates data but required revalidation is unclear.
- The route could expose private or permission-dependent data.

If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Putting business logic in `route.ts` | Delegate to `src/services`. |
| Trusting client-provided ownership | Check authorization server-side. |
| Returning raw errors | Return safe errors and log sanitized details. |
| Skipping rate limits on public mutations | Rate-limit sensitive or expensive endpoints. |
| Forgetting mutation revalidation | Revalidate affected paths or tags. |
