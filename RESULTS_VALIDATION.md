# Paper results chart validation — 2026-09-08

Scope: three Lieflat-template charts on the two project detail pages.
Validation used the final static export served by Wrangler on localhost:4174.
No benchmark experiments were executed.

- Independently parsed the versioned paper HTML tables and compared them with
  `lib/paper-results.ts`: all 40 PrepBench values and all 6 CleanAgent values
  match. Source links point to the exact paper version/table. Dollar readouts
  divide the paper's millidollar costs by 1,000.
- `npm run build`: successful static export of the three routes and 404.
- `npx tsc --noEmit`: passed.
- `npx oxlint app components/tap lib/paper-results.ts`: passed.
- Repository-wide `npm run lint` still reports existing issues in vendored
  `components/ui` and `hooks/use-mobile.ts` (accessibility, React compiler and
  template-expression rules). Those files were not changed. Full-repository
  lint is not claimed clean.
- Browser: Prep-Code/GUI Workflow switch updates rankings, chart title,
  scatter axes, all ten points, selected-model readout and the expanded data
  table. Proprietary/Open-weight groups expose all five models each; the title
  updates to the selected group's best value (49.7%/30.1% for open-weight).
- Keyboard Enter tested on both model-list buttons and SVG points. Observed
  DeepSeek code: 44.8%, $0.00662; workflow: 15.7%, $0.01159.
  GPT-5.1-Codex workflow: 34.6%, $0.26410. Click selection also tested.
- Viewport reveal and explicit Replay work. The existing global reduced-motion
  CSS disables all chart animation; this was checked in source, not by changing
  the user's system motion preference. CSS animations have no pending timers.
- CleanAgent expanded table contains 22.0/21.5/42.5 percent and
  19.76/636.62/29.57 seconds. Disclosure keyboard activation works. Text
  distinguishes the highest matching rate from the lowest latency and notes
  the GPT-generated reference values and experimental scope.
- Responsive QA at 320, 375 and 1280 pixels: no document horizontal overflow.
  Scatter uses measured SVG width with explicit font sizes. Native result tables
  provide labelled horizontal scroll regions on narrow screens. Desktop ranking
  labels align left of unit ticks; mobile labels sit above them. Model selection
  remains available through a separate button list where scatter points overlap.
- The output selector stays at the top while reading the PrepBench results,
  retaining the selected model when switching output. Temporary viewport
  overrides were reset after QA.
- Browser console error/warning log was empty during static-route checks.

Original method, example, interface and dataset-distribution images remain
original-source figures. Their previous full-site QA is documented in the parent
workspace; this update does not claim to re-run every previous figure-dialog test.

Live publication is verified through the Sites deployment status. Local static
browser QA does not imply an independently verified authenticated live-site load.
