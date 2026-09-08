# Visual interaction review — 2026-09-08

The user's screenshot exposed a redundant “View result ↓” action beside an
already visible output table. This review used actual in-app-browser screenshots
and interactions on the production static export, rather than source checks alone.

## Corrections

- The result jump is hidden in the two-column conversation. In the stacked layout,
  “Jump to prepared table ↓” describes the actual scroll action. This follows the
  same 850px breakpoint as the layout, with no JavaScript viewport guessing.
- Completion uses one “Choice applied” label plus the selected answer. Removed
  the redundant saved/complete/ready status cluster and repeated checkmark line.
- Apply choice describes the submit action; Change refund rule / Change date format
  describe exactly what can be changed. The first conversation expands naturally;
  scrolling history is retained only after an answer has been added.
- Homepage mistake actions now say Show incorrect output / Show correct output,
  with matching button semantics. The research anchor points downward.
- Chart replay says Replay animation. The mobile model readout follows the model
  list so a new selection has adjacent visible numeric feedback; desktop retains
  the readout under the plot.
- Enlarged paper figures show a direction-specific scroll hint only when the image
  exceeds the viewport. A fitting figure has neither a hint nor a scroll tab stop.

## Visual and interaction evidence

- Screenshot review covered homepage hero, both interactive examples, PrepBench
  conversation and charts, CleanAgent conversation/results/video, and all five
  enlarged paper figures. Both 1440px desktop and 375px mobile layouts were used.
  A full-page capture had stitching artifacts; viewport screenshots were used for
  conclusions, and DOM counts confirmed that the apparent duplicates were not
  duplicate page content.
- Reproduced the reported completion state before editing. Afterward the desktop
  action row contained Change refund rule and no visible result link. The mobile
  jump focused `prepbench-demo-output` and showed January 200 / February 150.
- At 850px the conversation is stacked and the jump is visible; at 851px it has
  two columns and the jump is hidden. Neither width had document overflow.
- Choice submission, changing the refund rule via keyboard Enter, date selection,
  and homepage correct/incorrect output switching were exercised. The initial
  mobile transcript measured 272px content height and 272px client height, with
  no internal clipping.
- Selected DeepSeek in the mobile model list: the immediately following readout
  showed 44.8% and $0.00662 for prep code. Desktop screenshot confirmed the same
  values beneath the scatter plot. Workflow/model-family switching and the
  exact-value disclosure were also exercised.
- All five paper dialogs opened and closed. The final overflow-hint implementation
  was checked on a vertically overflowing desktop workflow, a horizontally
  overflowing mobile interface, and a fully fitting statistics figure. ArrowRight
  moved the mobile image scroll position to 40px; the fitting figure had no hint.
- Video player and mobile controls were visually present. Playback itself was
  verified in the preceding video revision; it was not replayed in this review.
- No document horizontal overflow in the measured home/project views; final browser
  warning/error log was empty. Temporary viewport overrides were reset.
- Final production build, TypeScript, targeted app/component/lib lint and diff
  checks passed. Existing unrelated vendored lint issues remain outside scope.

## Boundary

This is a bounded desktop/mobile review in the in-app browser, not exhaustive
browser, screen-reader, or device certification. External resources and all
research values were retained; this revision did not re-audit paper evidence.
Publication is verified through Sites separately from local visual acceptance.
