# Cost–accuracy Pareto update — 2026-09-08

- Values and axis limits remain the Table 6 values in `lib/paper-results.ts`.
- Strict dominance assertions passed: Prep-Code frontier indices (zero-based)
  `[9, 8, 2, 0]`; GUI Workflow `[9, 8, 2, 5, 0]`.
- Equal observations remain nondominated; same-cost lower accuracy and
  same-accuracy higher cost are dominated. Empty input returns an empty list.
- Local production-build screenshots inspected at the desktop viewport and
  375 × 812: frontier, subtle fill, selected guides, legend, two-column mobile
  model list and readout are visible. Mobile document width equals viewport width.
- Clicked DeepSeek on the frontier, GPT-4o off it, switched to GUI Workflow
  (five frontier models), and selected Kimi. Mobile point and list selection
  also verified; metric values and frontier status update with the selection.
- TypeScript, scoped lint and static production build passed.
- Replay controls remain removed. Full source values remain in the native table.
