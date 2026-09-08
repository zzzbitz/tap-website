# TAP research website

A three-page research publication for **TAP — Trust AI to Prepare Your Data**:

- `/`: shared vision, an explicitly illustrative preparation example, research, and resources.
- `/prepbench`: benchmark overview, verified paper information, and evaluation resources.
- `/cleanagent`: standardization framework, verified paper information, and implementation resources.

## Local development

Use the starter's existing npm dependencies and lockfile. Run `npm run dev` to start vinext locally, or use the already running development server. `npm run build` runs the production build. `next.config.ts` enables `output: 'export'`, supported by the installed vinext version. Build output and hosting integration are verified by the parent workflow.

## Content and design

The parent workspace's `SPEC.md` is the product contract. Public project facts, paper titles, authors, venues, and resource URLs are centralized in `lib/tap-content.ts`; page-specific explanations are in the three route files. Update these only against the primary sources registered in the spec.

Shared presentation lives in `components/tap/`; the global white, ink, cobalt, and restrained green theme is in `app/globals.css`. Data tables compose the vendored `components/ui/table.tsx` primitives without modifying them. The typography uses the starter's Geist fonts and a local serif fallback for the editorial headline. There are no generated images, remote art, or social preview images.

The preparation example is static and aspirational. Keep its rows, clarification, decision, and output internally consistent. PrepBench and CleanAgent are complementary projects, not an integrated processing service. Avoid adding unverified performance claims, affiliations, team membership, or contact information.

Every action is a native link. The layouts stack on small screens, tables retain their semantics, the page has a skip link and visible keyboard focus, and reduced-motion preferences are respected. Canonical and Open Graph metadata use the configured TAP origin; no `og:image` is provided.

## Review boundary

Implementation does not publish or change hosting configuration. The parent owns source registration, the production build, browser and accessibility checks, and deployment; record completed checks in the parent's validation record. Source-level responsive styling is not a claim of completed visual QA.
