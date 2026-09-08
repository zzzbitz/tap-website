# TAP visual system

TAP is a light research website: white surfaces, cool-gray supporting regions,
charcoal text, generous whitespace and restrained project accents. The homepage
sets the visual direction for both project pages and every interactive component.

## Shared tokens

`app/globals.css` is the implementation source of truth. Authored components must
use these semantic tokens rather than introduce separate theme palettes.

| Role                 | Token / value                  | Use                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------- |
| Surface              | `--background` / #ffffff       | Cards, charts, tables and dialogs                    |
| Supporting surface   | `--muted` / #f5f7fa            | Section backgrounds, input tables and control tracks |
| Primary text         | `--foreground` / #1c2128       | Headings and body text                               |
| Supporting text      | `--muted-foreground` / #596573 | Descriptions, axes and captions                      |
| Brand / PrepBench    | `--primary` / #245be2          | Main links, actions and PrepBench data               |
| CleanAgent / success | `--green` / #24705b            | CleanAgent data and successful results               |
| Mismatch             | `--warning` / #8a4b15          | Deliberately incorrect output only                   |
| Default border       | `--border` / #dde3eb           | Card and table structure                             |

Blue and green each have a shared tint, border and hover token. Components use
`--component-accent`, `--component-tint`, `--component-border` and
`--component-hover`; the CleanAgent tone remaps these to green. Site navigation
retains the blue brand accent. Success is also stated in text, never color alone.

## Typography and shape

Keep Geist throughout, including imported chart layouts. Use charcoal headings,
readable gray descriptions and project-colored data. Chart titles and prominent
values use weight 650; captions do not compete with the data. Preserve the
existing responsive heading hierarchy and readable HTML chart labels.

Use the shared radius scale: 24px outer cards, 16px inner panels, 10px controls
and 6px small surfaces. Circular markers and the tiny table-logo cells retain
their semantic geometry. Keep aligned card padding and the existing responsive
spacing grid; borders carry structure, with only soft neutral shadows.

## Copy and line breaks

Use short, concrete headings that state the section’s subject. Prefer familiar
words and explain what the reader can compare or do. Preserve official paper
titles, research scope, and metric definitions. Avoid vague slogans such as
“How far do the agents get?” when the section reports accuracy.

Headings use balanced wrapping; paragraphs use pretty wrapping. Check actual
desktop and mobile screenshots for isolated final words. Shorten awkward copy
before changing font sizes or forcing line breaks.

## Interaction states

- Primary actions use a solid accent and white text, with a darker hover state.
- Secondary actions use a white surface, a visible border and a concise label.
- Segmented controls share a cool-gray track; the selected option is white with
  accent text and an accent border. Use the same control shape across projects.
- Choice cards use the project tint and accent border for selection. Selecting
  and applying remain separate actions. Explain completed choices in text.
- Keep touch targets at least 44px, visible keyboard focus, polite result
  announcements and reduced-motion support. Motion reinforces a changed value
  or selection and must not conceal information.

## Coverage and evidence boundaries

The system covers homepage diagrams, project cards, guided conversations,
prepared tables, result charts, selectors, buttons, figure dialogs and the
website's video frame/caption. Lieflat contributes chart geometry, not an
independent cream/navy theme. Preserve chart values, scales and source links.

Original paper figures and embedded video content retain their original colors;
they are source material. Their website frames and controls follow TAP's theme.
