# Plain-language copy and wrapping review — 2026-09-08

- Replaced vague section headings with direct descriptions and questions.
  PrepBench results now reads “How accurate are the agents?”; CleanAgent
  results reads “How well does CleanAgent work?”.
- Simplified project introductions, example instructions, homepage project
  headings and the cost–accuracy chart explanation. Official paper titles,
  authors, venues, links, metric definitions and source values are unchanged.
- Shared headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.
- Inspected local production screenshots of PrepBench results at desktop and
  375 px, homepage at 375 px, and CleanAgent results at 375 px. The latter was
  shortened again after the first screenshot showed three one-word lines.
- Read actual heading word positions for all three pages at 375 px, and for
  homepage and PrepBench at 768 px. Multi-line section/chart titles have no
  isolated final word at these inspected widths. Mobile CleanAgent has no
  horizontal page overflow. Original project names remain single-line headings.
- TypeScript, scoped lint and static production build passed. This is a copy
  and layout review; it does not replace the earlier full interaction review.
