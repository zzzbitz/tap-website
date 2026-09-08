# Paper results and chart credits

These charts redraw aggregate values from versioned paper tables. They are not
new experiments, live model rankings, or reconstructed per-cell observations.

## Data

- PrepBench: https://arxiv.org/html/2605.08687v1#S5.T6, Table 6,
  end-to-end Prep-Code and GUI Workflow columns, all ten models. Accuracy is in
  percent. Costs are average USD × 10^-3 per task, including all model calls and
  retries on the corresponding execution path. The dollar readout divides these
  costs by 1,000. Grouping follows the paper, and both groups remain accessible.
- CleanAgent: https://arxiv.org/html/2403.08291v4#S4.T1, Table 1, all three systems.
  Matching rate is the reported cell-level rate in percent, latency in seconds.
  Flights has four evaluated datetime columns. All methods use
  gpt-4o-2024-08-06; reference values are GPT-4o generated. Hardware and
  temperature settings are from §4 and Appendix B. The metric equation in the
  paper has an ambiguous normalization; we reproduce the reported rates, not
  a recomputation from that equation.
- Data module: `lib/paper-results.ts`. No values estimated from figure pixels.
  Existing workflow, example, interface and distribution figures retain their
  original paper images because they convey different evidence.

## Template provenance

Lieflat Charts by **躺在废墟里**:
https://github.com/larashero3-dotcom/lieflat-charts

Reference revision: `eace082a317b696c5570c25826a53a7fa113e984`.
License: [PolyForm Noncommercial 1.0.0](/licenses/lieflat-charts.txt).
This noncommercial research website adapts the following original card markup
and matching SVG render blocks into React. No upstream runtime is executed.

| Result                      | System / ID                       | Gallery                       | Original card                               | Adaptation                                                                                                                                                                                                                     |
| --------------------------- | --------------------------------- | ----------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PrepBench accuracy          | Lupi Basics / F5 Tick Rows        | templates/basics-gallery.html | Six teams, shipped and counted              | Horizontal unit ticks, fine row baseline, every-fifth bead, exact row-end value and staggered reveal. Five rows per paper-defined model group; output selector; scale fixed at 0–100.                                          |
| PrepBench cost and accuracy | Lupi Basics / F8 Plumb Scatter    | templates/basics-gallery.html | Price against satisfaction, twelve products | Point positions and vertical plumb lines, barcode floor and selected-point emphasis. Numeric axes, responsive geometry, numbered model key, keyboard/touch selection and exact-value readout.                                  |
| CleanAgent matching rate    | Lupi Editorial / L15 Ballot Tally | templates/lupi-gallery.html   | What they fear, tick by tick                | Independent 100-tick rows with long inked and short quiet ticks; aggregate percentage-point units explicitly labelled. Original independent-percentage encoding, without respondent language. Latency is separately tabulated. |

Geometry uses the original deterministic noise function. Unit ticks denote one
percentage point; a fractional last tick has proportional height and an exact
endpoint marker. Ticks never claim to be individual observations. Scatter axes
start at zero; accuracy is 0–60%, cost is 0–150 or 0–300 millidollars depending on
the output setting. Both axis units are visible.

The template palette is replaced by TAP's shared design tokens in
`app/globals.css`: white and cool-gray surfaces, charcoal text, blue PrepBench
data and green CleanAgent data. See `DESIGN_SYSTEM.md` for the site-wide contract.
Models are identified by labels/numbers, not ten categorical colors. TAP's
existing Geist typography is retained. All chart
labels stay as HTML or use measured SVG dimensions to avoid tiny mobile text.
Viewport-triggered reveal follows `MONO.obsReveal`, with observer cleanup;
explicit Replay is keyboard operable, animations have no accumulating timers,
and the site's reduced-motion override applies. Source values remain available
as native tables, including without JavaScript.

## Selection audit

The catalog's Editorial L1–L15 and Basics F1–F13 were reviewed before choosing
templates. There are no time series, record-level distributions, compositional
totals, networks, hierarchy, funnel counts or bipolar scales in these result
tables; the corresponding templates do not fit.

- PrepBench ranking candidates: L2 Dot Cascade would crowd long model names;
  L15 is a small independent-percentage panel (six categories maximum), whereas
  this table contains ten models; F1 Rung Bars would crowd ten long category
  labels. F5 was selected with the paper's two existing five-model groups and
  an explicit group selector. The full ten-model numeric table is available.
- PrepBench cost candidates: L4 Arc Matrix assumes two categorical axes, not two
  continuous metrics; L7 Brand Spectrum is a bipolar scale; F12 Dumbbell Queue
  expects paired values with the same unit. F8 directly preserves each model's
  cost/accuracy pair, with ten points within its twenty-point capacity.
- CleanAgent candidates: L14 Hundred Field incorrectly implies a shared 100%
  whole; F1 Rung Bars fits but puts long system labels under narrow columns;
  L15 fits three independent rates with full-width labels and follows the
  Editorial-first preference. No individual data samples are invented.

Three complementary charts are used for this focused website update, not a
full-paper report. No fallback, Glance or map templates were needed.
