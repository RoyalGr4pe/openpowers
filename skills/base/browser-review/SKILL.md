---
name: browser-review
description: Use when visually reviewing changed or created UI in a browser after explicit user approval, including opening a link, finding relevant page content, saving a screenshot, and reviewing the image.
---

# Browser Review

## Overview

Browser review is an approval-gated visual check. Do not open a browser, visit a link, or take screenshots until the user approves it.

Use this skill when UI was changed or created and a browser-based visual review is useful.

## Approval Gate

Before opening the browser, ask with the OpenCode choice prompt UI:

1. `Approve browser review (Recommended)`
2. `Skip browser review`
3. `Provide a different URL or target`

Allow custom user input. If the choice prompt tool is unavailable, use Markdown numbered choices plus `Type your own answer` as the final option.

If the user does not approve, do not open the browser and do not claim visual review was completed.

## Process

1. Identify the changed or created UI and the relevant URL.
2. If the URL or target content is unclear, ask before opening the browser.
3. After approval, open the browser to the URL.
4. Find the relevant changed or created content on the page.
5. Create `docs/opencode/review/` if it does not exist.
6. Save a screenshot named with the date and subject:

```text
docs/opencode/review/YYYY-MM-DD-<what-it-is>.png
```

Use a short lowercase slug for `<what-it-is>`, such as `homepage-hero`, `settings-form`, or `checkout-error-state`. Do not overwrite existing screenshots; add a short suffix when needed.

7. Review the screenshot image for layout, spacing, clipping, overflow, readability, broken states, visual regressions, and obvious responsive issues.
8. Report findings with the screenshot path.

## Browser Rules

- Prefer reviewing the exact route or component changed.
- Scroll, search, or navigate only as needed to find the relevant content.
- Keep browser actions scoped to the approved URL and target.
- Do not enter credentials, submit destructive forms, or trigger purchases without separate explicit approval.
- If browser or screenshot tooling is unavailable, stop and say visual review could not be performed.

## Output

Keep the response concise:

- Approval status.
- URL reviewed.
- Screenshot path.
- Visual findings, or `No visual findings.`
- Any unverified areas.

## Stop And Ask

Ask before continuing when:

- The URL is missing or ambiguous.
- The relevant content cannot be found.
- The page requires login, credentials, paid actions, or destructive actions.
- Multiple changed UI areas need separate screenshots.
- Browser tooling or screenshot storage behavior is unclear.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Opening a browser without approval | Ask with the Approval UI first. |
| Reviewing the wrong page area | Find the changed or created content first. |
| Saving screenshots in random locations | Use `docs/opencode/review/`. |
| Claiming visual review without a screenshot | Save and review the image first. |
