# Research identity update — 2026-09-08

## Content and attribution

- Homepage retains one overview example. Its introduction states the user’s
  intended shift from prescribing steps to describing the desired data. Clarify,
  inspect and evaluate remain research goals. Project cards introduce distinct
  contributions, rather than repeat the detail-page interactions.
- PrepBench: three capabilities, task/simulator/agent/comparator roles, key
  bottlenecks before rankings, and explicit generated-code-to-workflow semantics.
  The refund example remains a fixed illustrative case; its reference check is
  not presented as a benchmark or model execution.
- CleanAgent: type-specific, unified APIs reduce custom code; the walkthrough
  separates type identification, tool calls, execution feedback and output.
  The original video and published experimental caveats remain.
- PrepBench affiliation and citation fields checked against Crossref:
  https://api.crossref.org/works/10.14778/3828612.3828638
  Formal paper: https://doi.org/10.14778/3828612.3828638
  Three capabilities and findings verified in the paper’s §§2.2 and 5.3–5.6:
  https://arxiv.org/html/2605.08687v1
  Visitor-facing paper and citation links use the published DOI.
- CleanAgent methods, three authors, SFU affiliation and workshop reference
  checked in the published paper:
  https://www.vldb.org/2025/Workshops/VLDB-Workshops-2025/DATAI/DATAI25_8.pdf
- Jingzhe Xu and Rui Wang Scholar IDs supplied by the user: RFNP0boAAAAJ and
  VNxw8OUAAAAJ. Rui Wang’s earlier GitHub preference was superseded.
- Other author homepages verified: https://qidanrui.github.io/,
  https://www.miaozhengjie.com/, https://dbgroup.cs.tsinghua.edu.cn/jnwang/,
  https://dbgroup.cs.tsinghua.edu.cn/ligl/.
  Affiliations label the paper, not the authors’ current employment.

## Validation

- Production-build screenshots inspected: desktop homepage introduction and
  project overview; PrepBench evaluation roles and findings; desktop and 375 px
  CleanAgent method; mobile citation, dollar chart labels and model readout.
- PrepBench: applied both refund choices; expected totals update to 120/200;
  keyboard submission works; reference-check text updates. The scripted boundary
  remains visible. Switched code/workflow output and inspected its explanation.
- CleanAgent: selected all five steps, used keyboard Enter, checked three output
  formats and verified the chosen format appears in the example tool call.
- CleanAgent BibTeX copy was confirmed against browser clipboard content after
  the asynchronous operation completed. The visible “Copied.” state was checked.
  Both downloadable entries are compared with their source strings separately.
- All displayed costs use USD: source millidollar values are divided by 1,000
  for tick labels, accessible labels, exact readouts and tables. Original paper
  data and Pareto membership are unchanged. Checked GUI cost 0.26410 in the table.
- Mobile method page has document width equal to the 375 px viewport.
- TypeScript, scoped lint and static build passed. No dependencies added.
- This does not assert a new performance audit or real-agent execution. Existing
  full interaction and figure-dialog reviews remain historical evidence.
