# TAP research website

A three-page research website for **TAP — Trust AI to Prepare Your Data**, implemented with the existing vinext, React, and shadcn starter.

- `/`: centered vision, an illustrative monthly-sales transformation, and distinct visual introductions to both projects.
- `/prepbench`: the task example, experimental setup, and dataset statistics from the paper, with links to evaluation resources.
- `/cleanagent`: an original date-standardization example, the paper’s workflow, and the original system interface.

## Development

Use the existing npm dependencies and lockfile. `npm run dev` starts the local server; reuse an existing server when one is running. `npm run build` creates the production build. The existing `next.config.ts` enables static export. The parent workflow owns final build verification, source registration, and hosting.

## Content and presentation

The parent workspace’s `SPEC.md` is the product contract. Verified titles, authors, venue labels, and URLs are centralized in `lib/tap-content.ts`. Route files contain the concise explanations. Shared components and responsive semantic diagrams live in `components/tap/`; global presentation lives in `app/globals.css`.

Data diagrams compose the vendored shadcn Table primitives. Original paper figures use the installed Dialog primitive for enlargement, keyboard focus management, Escape dismissal, and focus restoration. Below-fold images have reserved dimensions, lazy loading, descriptive alternative text, contain sizing, source links, and captions. Small extracts are capped at their intrinsic width in the page; the dialog provides a larger scrollable view and a direct full-size image link.

The original homepage diagrams explain concepts, not recorded executions. Keep the monthly-sales output consistent with the input year and refund decision. Date standardization must preserve each date’s meaning. PrepBench provides evaluation assets and the reader supplies an agent. The two projects are complementary research contributions.

## Asset provenance

The parent owns the five unmodified extracts under `public/figures/` and their extraction record, `public/figures/SOURCES.md`:

| Asset                      | Source               |
| -------------------------- | -------------------- |
| `prepbench-example.png`    | PrepBench, Figure 1  |
| `prepbench-evaluation.png` | PrepBench, Figure 4  |
| `prepbench-statistics.png` | PrepBench, Figure 3  |
| `cleanagent-workflow.png`  | CleanAgent, Figure 2 |
| `cleanagent-interface.png` | CleanAgent, Figure 3 |

PrepBench figures link to [its paper](https://arxiv.org/abs/2605.08687); CleanAgent figures link to [its paper](https://arxiv.org/abs/2403.08291). The PrepBench page retains the Preppin’ Data provenance. The evaluation figure describes the paper’s experimental setup; current public execution instructions remain linked separately. The CleanAgent interface includes an execution error and a later completion message. It must not be presented as first-pass success.

The semantic diagrams in `preparation-example.tsx` and `research-diagrams.tsx` are original explanatory compositions. They are separate from paper evidence. No stock artwork, generated AI art, or social preview image is used.

## Review boundary

The parent owns production builds, browser/route/link acceptance, and publishing. Implementation includes responsive styles, a skip link, visible focus, and reduced-motion handling; source review and type checking are not browser accessibility or visual QA.
