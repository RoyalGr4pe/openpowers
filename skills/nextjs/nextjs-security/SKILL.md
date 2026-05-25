---
name: nextjs-security
description: Use when building or reviewing Next.js request handling, authentication, authorization, input validation, rate limiting, SQL/data access, cookies, uploads, or external URL access.
---

# Next.js Security

## Overview

Use this skill for security-sensitive Next.js work. Validate on the server, limit inputs, protect mutations and expensive requests, and never trust client-provided authority.

## Input Validation

Shared input validation belongs in:

```text
src/security/input-validation.ts
```

Use this file for shared input limits, trimming, normalization, and validation helpers. Do not put security validation in `src/utils`.

Rules:

- Validate all route handler, server action, form, search param, and service inputs before use.
- Limit input length before expensive parsing, database queries, or external requests.
- Trim and normalize user-controlled strings where appropriate.
- Schema-validate expected shapes and reject unknown or invalid fields.
- Treat client-side validation as UX only; server-side validation is required.
- Do not rely on sanitization for SQL injection prevention.

## Request Protection

- Rate-limit mutation endpoints, auth endpoints, public forms, and expensive reads.
- Require authentication before accessing user-specific data.
- Check authorization and ownership server-side; never trust client-provided user IDs, roles, prices, permissions, or ownership.
- Keep route handlers and server actions thin; delegate request logic to `src/services` and validation to `src/security/input-validation.ts`.
- Return safe client errors without stack traces, secrets, SQL details, or upstream tokens.

## Data Access

- Use parameterized queries, prepared statements, or ORM-safe APIs.
- Never build SQL by concatenating user input.
- Validate IDs before database access.
- Scope queries by the authenticated user or tenant when data is private.
- Do not expose internal database errors to clients.

## Secrets And Environment

- Keep secrets server-only.
- Never import secret-bearing modules into client components.
- Only expose browser-safe environment variables with `NEXT_PUBLIC_`.
- Do not log tokens, cookies, passwords, API keys, session IDs, or full auth headers.

## Cookies And Sessions

- Use `httpOnly`, `secure`, and appropriate `sameSite` settings for session cookies.
- Scope cookie paths as narrowly as practical.
- Do not store sensitive session data directly in client-readable cookies.

## External URLs And Uploads

- Validate outbound URLs before fetching to reduce SSRF risk.
- Prefer allowlists for external hosts when possible.
- Treat uploads as unsafe: enforce size limits, check MIME type, check extension, and avoid trusting filenames.

## Stop And Ask

Ask with the OpenCode choice prompt UI when:

- The project has no existing auth, rate-limit, validation, or database pattern.
- Choosing a new security library or package.
- Security requirements conflict with product behavior.
- A shortcut would weaken validation, authorization, or rate limiting.

If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Trusting client-side validation | Validate again on the server. |
| Putting validation in `src/utils` | Use `src/security/input-validation.ts`. |
| Sanitizing SQL strings | Use parameterized queries or ORM-safe APIs. |
| Checking auth but not ownership | Check authorization for the specific resource. |
| Logging full request data | Remove secrets and tokens before logging. |
