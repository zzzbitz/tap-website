# Choice-only conversations — 2026-09-08

Supersedes v6's suggested/typed messages in CONVERSATION_VALIDATION.md.

## Behavior

Both examples start with a fixed request and a single agent question. Numbered
radio cards contain a short answer and explanation. The first option is selected;
only Continue commits it. Each option leads to a scripted result leaf. There is
no free-text field or text parser. Back restores the question and last selection,
clearing the previous answer/result; Restart restores the initial conversation.

PrepBench has two branches: exclude refunds (January 120) or include refunds
(January 200); February stays 150. CleanAgent has three format branches: ISO,
day-first, and named month. All preserve the original dates. These are still
clearly labeled fixed-data illustrations, with no model calls or system execution.

## Checks

- Production static build, TypeScript, targeted `oxlint app components/tap lib`,
  and `git diff --check` passed. Existing vendored lint issues remain outside scope.
- Browser exercise covered both refund outputs, all nine date strings across
  the three formats, selection without submission, Continue, Back, and Restart.
  Returning preserves the radio selection but clears descendant conversation
  messages and preview. Restart resets the selection to the first option.
- Keyboard ArrowUp changed the refund choice; Enter on Continue submitted it.
  Continue and Back move focus to the new step heading. The result jump focuses
  the corresponding prepared table. Native radio descriptions and labels are set;
  the primitive's extra native inputs are aria-hidden and outside the tab order.
- Both pages have zero free-text fields within the demo. Static source no longer
  imports Textarea or contains the prior text parser.
- Responsive inspection: both pages at 320 and 1280px; CleanAgent also at 375px.
  No document horizontal overflow was observed. Mobile choice cards were at least
  94px tall; Continue, Back and Restart retain 44px minimum targets.
  Desktop and mobile screenshots were inspected. Browser viewport was restored.
- After final copy/theme edits, the static server was restarted and fresh page
  navigation confirmed the final export, correct result behavior, and matching
  blue/green selected radio colors. Browser warning/error log was empty.

## Scope

This is targeted validation of the choice-flow revision. Previous whole-site,
figure, link and chart checks are recorded in CONVERSATION_VALIDATION.md and
RESULTS_VALIDATION.md; they were not all repeated for this revision. Reduced
motion remains covered by the existing global override. No screen-reader or
multi-browser certification is claimed. Sites deployment status verifies
publication separately from local browser acceptance.
