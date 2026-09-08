# Guided conversations and whole-site review — 2026-09-08

> Historical review of v6. The typed-input behavior below was replaced by the
> choice-only flow documented in `CHOICE_FLOW_VALIDATION.md`.

## Delivered behavior

- PrepBench: request monthly sales, clarify the refund rule, inspect the output,
  and revise the rule. Excluding refunds gives January 120; including them gives
  January 200. February remains 150. “Why ask?” explains the ambiguity.
- CleanAgent: request date standardization, choose ISO, day-first or month names,
  then change the choice. All three dates retain their calendar meanings.
- Suggested messages and supported typed phrases use finite scripted responses.
  Unsupported or conflicting instructions leave the current preview unchanged.
  The fixed-dataset, illustrative scope is stated next to both conversations.
- Clear restart, disabled empty submit, Enter/Shift+Enter behavior, IME composition
  guard, live transcript, focusable history scrolling and a result jump link.
  Transcript scrolling affects its own container only. CSS animates new messages
  and results without timers; the existing reduced-motion override applies.
- Detail-page jump links lead directly to conversation and results sections.

## Verification

- Final `npm run build`, `npx tsc --noEmit`, targeted `npx oxlint app components/tap lib`
  and `git diff --check` passed. The previously recorded vendored-component lint
  issues were not changed; repository-wide lint is not claimed clean.
- Pure transition smoke checks covered clarification, all five output choices,
  changed requests, unknown/conflicting text, negative instructions and Chinese
  aliases. No request outside the supported phrases silently changes the output.
- Browser tests used the final static export with Wrangler assets on localhost:4174.
  The PrepBench conversation was exercised with clicks, keyboard Enter and typed
  English/Chinese commands. Both correct monthly totals were observed. Restart
  restored the greeting and awaiting-choice state, clearing the draft/output.
- CleanAgent: the browser displayed all nine expected formatted dates across the
  three choices. “Do not use ISO” returned the unsupported-input guidance and
  preserved the month-name preview. The result link reached the prepared table.
- Responsive checks: homepage at 320, 375, 768 and 1440px; PrepBench at 320, 768
  and 1280px; CleanAgent at 320, 375 and 1280px. No document horizontal overflow
  was observed. New action buttons were at least 44px tall and input text 16px.
  Desktop and mobile screenshots were inspected. Viewport overrides were reset.
- All five paper-image dialogs opened through keyboard/click controls. Escape
  and Close dismissal were exercised; after closing transitions completed,
  focus returned to the correct originating figure button.
- PrepBench charts: output and model-group controls, keyboard model selection,
  exact-value disclosure, workflow rows and DeepSeek's 15.7% / $0.01159 readout
  passed. CleanAgent's results disclosure preserved all matching rates/latencies.
- Homepage: refund/mistake controls retained the explicit 80 mismatch; all three
  date formats produced correct values. Native cross-project navigation,
  Vision/Research anchors, detail jump links, Back to top, skip-to-content focus
  and 404 recovery were exercised. Console warning/error log was empty.
- Static HTML audit covered all four exported routes, 39 local links/anchors,
  one h1 and nonempty description per route, and every image's local asset,
  alternative text and dimensions. All checks passed.
- External resources: all four arXiv destinations returned HTTP 200. Direct local
  GitHub requests timed out; the five GitHub pages were subsequently verified via
  the web tool, and CleanAgent's Demonstration heading was confirmed. These
  network timeouts were not treated as evidence of broken website links.

## Limits

This is bounded in-app-browser QA, not multi-browser, screen-reader or 200% text
zoom certification. Reduced-motion and IME handling were verified in source;
the user's OS/accessibility preferences were not changed. No live model or
benchmark execution was performed. Paper figures/results remain distinct from
the original guided examples. Publication success is checked through Sites;
authenticated live-page loading is separate from local static acceptance.
