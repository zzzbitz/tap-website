# Shared-theme review — 2026-09-08

This review follows the user's request to unify all authored components with the
homepage, including the formerly cream/navy result cards.

## Implemented

- Consolidated component colors and shape tokens in `app/globals.css`.
- White/cool-gray chart surfaces, charcoal titles, blue PrepBench data and green
  CleanAgent data. Shared segmented controls, selection treatments and buttons.
- Applied the tokens to homepage diagrams, guided demos, tables, modal frames
  and video framing. Preserved original media, values and interactive behavior.
- Added `DESIGN_SYSTEM.md` and corrected chart palette provenance.

## Actual browser checks

Viewed screenshots of the final static export at 1440×960 and 375×812.
The first navigation reused an old document; a full reload confirmed the current
CSS and white chart surfaces before the following checks.

- Desktop: homepage hero, both project diagrams, PrepBench tick/scatter charts,
  CleanAgent matching/latency card, and CleanAgent question/completed states.
- Clicked PrepBench output/model-family switches and DeepSeek selection;
  workflow readout remained 15.7% / $0.01159, prep-code 44.8% / $0.00662.
- Clicked homepage month-name format and CleanAgent DD/MM/YYYY + Apply choice;
  result dates remained 03/01/2026, 04/01/2026 and 01/02/2026.
- Mobile: homepage, both result panels, scatter selection/readout, PrepBench
  completed choice and prepared-table jump, video card, and interface dialog.
  Dialog opened and dismissed with Escape. Video iframe loaded its poster and
  controls; playback was previously verified and was not repeated for recoloring.
- No horizontal document overflow on the three checked mobile routes. Browser
  warning/error log was empty. Restored the viewport after review.

TypeScript, production build, scoped app/component/lib lint and diff checks
passed. These checks validate presentation and existing UI behavior, not model
execution or new paper results. Publication status is checked separately.
