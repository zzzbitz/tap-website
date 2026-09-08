# TAP research website

A three-page research website for **TAP — Trust AI to Prepare Your Data**, implemented with the existing vinext, React, and shadcn starter.

- `/`: centered vision, an illustrative monthly-sales transformation, and distinct visual introductions to both projects.
- `/prepbench`: three evaluated capabilities, a role-labeled evaluation example, paper findings, interactive results, dataset and citation resources.
- `/cleanagent`: an interactive method walkthrough centered on type-specific APIs, the paper’s workflow, reported results, original video and citation resources.

## Development

Use the existing npm dependencies and lockfile. `npm run dev` starts the local server; reuse an existing server when one is running. `npm run build` creates the production build. The existing `next.config.ts` enables static export. `scripts/prepare-static.mjs` normalizes the export for static hosting.

## Visual system

[`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) defines the shared palette, typography,
shape scale and interaction states for every authored component. Use the tokens
in `app/globals.css`; imported chart geometry adopts this system.

The header's **Appearance** menu offers Light, Dark and System on every route.
System is the default. Explicit choices survive refreshes and page navigation,
and synchronize between tabs; choosing System restores automatic OS tracking.
The theme is applied in the document head before the first paint. Site surfaces,
charts, tables, dialogs and demos share both palettes, while paper images retain
their original colors. Storage restrictions do not prevent switching the current
page. This adds no dependencies and works with the existing static export.

The 2026-09-08 scroll revision adds once-only section entrances using the
timing from Apple Intelligence. It simplifies the homepage copy and project
surfaces, uses more specific detail-page headings, and retains the existing
paper data and interactive tools. `components/tap/page-motion.tsx` enhances
explicit reveal markers; see `DESIGN_SYSTEM.md` for timing, fallback behavior,
and the design references. The existing GitHub Pages hosting setup is retained.

Scroll revision validation: production export (all four routes, including 404),
TypeScript, targeted lint, formatting and diff checks passed. All three content
routes returned HTTP 200; their source and exported HTML include reveal blocks
without hidden state, so the content remains present without JavaScript.
Desktop Chrome screenshots showed the homepage's intermediate fade, completed
table scene and research entries, and research-anchor navigation. Native browser
automation then became unavailable; narrow-screen/light-mode review and complete
detail-page interaction regression were not completed. Device emulation was
verified off and DevTools closed before that interruption. This revision has
not been published.

Homepage figure revision validation (2026-09-08): production export, TypeScript,
targeted lint and formatting checks passed. Browser review covered the research
entries at 1280px and 375px in dark mode, with no page overflow, both figure
dialogs, dismissal and horizontal image scrolling on mobile.

Dark-mode validation (2026-09-08): production export, TypeScript, targeted lint
and diff checks passed. All three local routes returned HTTP 200. Exported HTML
for these routes and 404 includes the shared control and executable head script.
Isolated script checks covered 20 saved/system/blocked-storage combinations and
60 explicit theme transitions. Fifteen text/accent contrast pairs per palette
exceeded 4.5:1 (minimum 4.62:1 light, 6.69:1 dark). These are source, script and
HTTP checks; browser visual/interaction QA and publication were not performed
for this change.

## Content and presentation

The parent workspace’s `SPEC.md` is the product contract. Verified titles, authors, venue labels, and URLs are centralized in `lib/tap-content.ts`. Route files contain the concise explanations. Shared components and responsive semantic diagrams live in `components/tap/`; global presentation lives in `app/globals.css`.

Data diagrams compose the vendored shadcn Table primitives. Overflowing tables expose a labeled keyboard-scrollable region and a visible scroll hint only when needed. Internal navigation uses native links because the current vinext static export produced client-router prefetch and navigation errors during browser QA. Original paper figures use the installed Dialog primitive for enlargement, keyboard focus management, Escape dismissal, and focus restoration. Below-fold images have reserved dimensions, lazy loading, descriptive alternative text, contain sizing, source links, and captions. Small extracts are capped at their intrinsic width in the page; the dialog provides a larger scrollable view and a direct full-size image link.

The homepage keeps one monthly-sales overview and introduces each project through its research contribution. Each introduction wraps around a compact original paper figure (PrepBench on the right, CleanAgent on the left; stacked on narrow screens): PrepBench's evaluation framework (Figure 4) and CleanAgent's workflow (Figure 2), both with enlargement and source links. PrepBench's detail example uses a fixed choice tree: the reader supplies a simulated-user answer, an illustrative agent prepares the table, and a reference check is displayed. CleanAgent's `cleanagent-method.tsx` walkthrough separates input, type identification, tool calls, execution feedback, and output preview. Date-format choices update the preview and illustrative tool call. These are fixed-data illustrations, not live model or Dataprep.Clean executions.

Project entry points live in the homepage research entries, with no separate
resource directory or paired-project cards at the end of detail pages. Paper and
code links stay in each project hero. PrepBench keeps its distinct dataset,
evaluation and contribution documentation together on its detail page. This
lets new work join the research list without adding duplicate navigation blocks.

Author profiles and publication-time affiliations are in `lib/tap-content.ts`. BibTeX entries in `lib/citations.ts` match the downloadable `public/citations/*.bib` files. PrepBench uses its published PVLDB DOI; CleanAgent uses its published workshop metadata. See `RESEARCH_IDENTITY_REVIEW.md` for sources and validation.

## Asset provenance

The parent owns the five unmodified extracts under `public/figures/` and their extraction record, `public/figures/SOURCES.md`:

| Asset                      | Source               |
| -------------------------- | -------------------- |
| `prepbench-example.png`    | PrepBench, Figure 1  |
| `prepbench-evaluation.png` | PrepBench, Figure 4  |
| `prepbench-statistics.png` | PrepBench, Figure 3  |
| `cleanagent-workflow.png`  | CleanAgent, Figure 2 |
| `cleanagent-interface.png` | CleanAgent, Figure 3 |

PrepBench figures link to [its published paper](https://doi.org/10.14778/3828612.3828638); CleanAgent figures link to [its published paper](https://www.vldb.org/2025/Workshops/VLDB-Workshops-2025/DATAI/DATAI25_8.pdf). The PrepBench page retains the Preppin’ Data provenance. The evaluation figure describes the paper’s experimental setup; current public execution instructions remain linked separately. The CleanAgent interface includes an execution error and a later completion message. It must not be presented as first-pass success.

The diagrams in `preparation-example.tsx` and `research-overview.tsx`, and the CleanAgent method walkthrough, are original explanatory compositions. They are separate from paper evidence. No stock artwork, generated AI art, or social preview image is used.

## Review boundary

Earlier iterations used scripted, interactive conversations on both project pages on
2026-09-08, superseding the original static-only example restriction for these
components. The later choice-only revision removes free-form messages entirely.
`lib/guided-conversation.ts` defines each fixed request, its question, and explicit
answer branches with prepared result leaves. `components/tap/guided-conversation.tsx`
composes installed Message, RadioGroup, Button and Table primitives. Numbered
option cards show one question at a time. Selecting does not submit; Apply choice
commits the answer. Change refund rule / Change date format restore the question
and selection while clearing its result; Restart restores the initial state.
The result jump appears only in the stacked layout. Initial conversations expand
naturally without internal scrolling.
The transcripts are labelled scripted demos with fixed data/prepared replies;
they never call models or execute the actual research systems. No artificial
waiting, generated code execution, upload, or external messaging was added.
See `CHOICE_FLOW_VALIDATION.md` for the original choice-only checks and
`CONVERSATION_VALIDATION.md` for the earlier whole-site review.

Project results are native SVG charts adapted from Lieflat Charts (F5, F8, L15).
`lib/paper-results.ts` preserves the paper-table values; `public/charts/SOURCES.md`
records versioned sources, template choices, units and license. PrepBench has
linked code/workflow controls, model groups, and selectable cost/accuracy points
with a computed Pareto frontier. See `PARETO_VALIDATION.md` for frontier checks.
CleanAgent presents cell-level matching rates with latency alongside them.
Charts have exact-value tables, keyboard controls, viewport reveal and
reduced-motion support. See `RESULTS_VALIDATION.md` for the results-chart checks.

Browser QA covers desktop and mobile layouts, all five figure dialogs, keyboard opening, Escape and button dismissal, focus restoration, modal focus containment, table scrolling, main navigation, skip navigation, full-size image access, and 404 recovery. See the parent workspace’s VALIDATION.md for the tested revision, exact coverage, and remaining limits.

## CleanAgent video

The demonstration section embeds the original video linked by the upstream
[CleanAgent README](https://github.com/sfu-db/CleanAgent#demonstration):
[CleanAgent demonstration](https://www.youtube.com/watch?v=fSYXVM6qeqM).
The YouTube privacy-enhanced iframe is lazy-loaded, does not autoplay, retains
native playback/seek/fullscreen controls, and has a descriptive title and a
separate watch-on-YouTube link. A hero jump link leads to this section. The
paper's original interface figure remains below it. Playback requires YouTube
connectivity; the media is not downloaded or rehosted.

Validation (2026-09-08): production export, TypeScript, targeted app/component/lib
lint and diff checks passed. In the local final-static preview, the original
video loaded and played to 33 seconds of its 4:32 duration; pause was confirmed.
At 375px viewport width the player measured 333×200px with no document overflow;
the demo jump link worked and the viewport override was restored. Publication
was verified separately from local playback in the earlier hosting revision.

## Visual interaction review

See `VISUAL_REVIEW.md` for the screenshot-led review of the three pages and
corrections to action labels, duplicate status text, responsive result navigation,
model feedback placement, and conditional figure-scroll hints.

## Independent hosting

GitHub Pages publishes the static `dist/client` artifact using
`.github/workflows/pages.yml`. Configure the repository's Pages source as
GitHub Actions. Each push to `main` builds and deploys the site automatically.
No ChatGPT Sites plugin, Cloudflare bindings or model service is required.

The workflow obtains `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` from
GitHub Pages metadata. For a custom domain, configure it in Pages settings and
re-run the workflow; no component URLs need manual replacement.

To preview a project-path build locally:

```sh
NEXT_PUBLIC_BASE_PATH=/tap-website NEXT_PUBLIC_SITE_URL=https://zzzbitz.github.io/tap-website npm run build
```

Serve the artifact at `/tap-website/`. `sitePath()` prefixes authored links and
media, while `assetPrefix` handles compiled assets. The export normalizer creates
real project-page directories and verifies all required HTML exists; the build
fails if prerendering skips a page. Original paper-table transcription sources
remain in provenance files; visitor-facing paper links use formal publications.
