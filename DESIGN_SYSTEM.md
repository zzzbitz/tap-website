# TAP visual system

TAP supports light and dark appearances with generous whitespace and restrained
project accents. Light mode uses white surfaces and charcoal text; dark mode uses
deep slate surfaces, soft white text and brighter blue/green accents. The homepage
sets the visual direction for both project pages and every interactive component.

## Shared tokens

`app/globals.css` is the implementation source of truth. Authored components must
use these semantic tokens rather than introduce separate theme palettes.

| Role                 | Token / value                  | Use                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------- |
| Surface              | `--background` / #ffffff       | Cards, charts, tables and dialogs                    |
| Supporting surface   | `--muted` / #f5f5f7            | Section backgrounds, input tables and control tracks |
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

Tokens use `light-dark()` with the root `color-scheme`, including surfaces, text,
borders, project tints, hover colors and shadows. The table above lists the light
values; the paired dark values live alongside them in `app/globals.css`.
Use `--primary-foreground` for text on solid accent actions. Paper images retain
a white `--paper-surface`; the video retains a dark `--video-surface`.

The header's Appearance menu offers Light, Dark and System. System is the default
and follows OS changes immediately. Explicit choices persist in `tap-theme` in
local storage; System removes the override. A head script restores the preference
before first paint, and the shared menu synchronizes open tabs. CSS follows the
system even without JavaScript; blocked storage still allows switching the current
page. The root `.dark` class also keeps vendored UI dark variants aligned.

## Typography and shape

Keep Geist throughout, including imported chart layouts. Use charcoal headings,
readable gray descriptions and project-colored data. Chart titles and prominent
values use weight 650; captions do not compete with the data. Preserve the
existing responsive heading hierarchy and readable HTML chart labels.

Use the shared radius scale: 18px outer cards, 12px inner panels, 8px controls
and 6px small surfaces. Circular markers and the tiny table-logo cells retain
their semantic geometry. Keep aligned card padding and the existing responsive
spacing grid; borders carry structure, with only soft neutral shadows.

The homepage has an open, paper-like research list with thin dividing rules.
Do not wrap every project or explanatory group in a rounded card. Reserve
surfaces for the worked table example, code, and interactive tools. The hero
keeps its exact headline in neutral text, one research description, and a text
link. Avoid adding another slogan or a numbered goals grid below it. Detail
section headings are left aligned, while the paper identity remains centered.

Each homepage research entry pairs a short introduction with its central paper
figure: PrepBench's evaluation framework and CleanAgent's workflow. Place the
figure as a compact centered preview below the introduction, capped at 680px
for PrepBench and 560px for CleanAgent so both have similar visual height.
Include a caption, source, and enlargement control. Preserve the paper's colors
and aspect ratio. Stack
the introduction on narrow screens; keep figure details accessible in the dialog.

## Copy and line breaks

Use short, concrete headings that state the section’s subject. Prefer familiar
words and explain what the reader can compare or do. Preserve official paper
titles, research scope, and metric definitions. Avoid vague slogans such as
“How far do the agents get?” when the section reports accuracy.

For project introductions, prefer each paper's title, terminology and concise
adaptations of its abstract or method description. Preserve the authors' meaning
and technical scope. Present current projects as part of TAP's ongoing research;
do not frame PrepBench and CleanAgent as a complete pair of research directions.
Explain the homepage example through the user's request, the AI's clarification
and the resulting tables. “Illustrative example” is sufficient; do not emphasize
the rendering as static.

Keep project navigation in each homepage research entry. Adding a project should
not require duplicating its links in a homepage resource directory or every other
project page. Detail pages retain their paper/code actions and any distinct project
documentation, without a second paper/code panel or a paired-project promotion.
Keep section jumps, citation controls and figure source links for their specific
reading tasks.

Headings use balanced wrapping; paragraphs use pretty wrapping. Check actual
desktop and mobile screenshots for isolated final words. Shorten awkward copy
before changing font sizes or forcing line breaks.

## Interaction states

- Primary actions use a solid accent and contrasting text: white in light mode,
  dark ink in dark mode. Hover colors darken in light mode and brighten in dark mode.
- Secondary actions use the theme surface, a visible border and a concise label.
- Segmented controls share a muted track; the selected option uses the main surface with
  accent text and an accent border. Use the same control shape across projects.
- Choice cards use the project tint and accent border for selection. Selecting
  and applying remain separate actions. Explain completed choices in text.
- Keep touch targets at least 44px, visible keyboard focus, polite result
  announcements and reduced-motion support. Motion reinforces a changed value
  or selection and must not conceal information.

## Scroll entrances

`PageMotion` enhances explicit `data-reveal` blocks on all three routes. It uses
the timing inspected in [Apple Intelligence](https://www.apple.com/apple-intelligence/)
on 2026-09-08: a trigger near 85% of viewport height, 30px upward travel over
700ms, opacity over 900ms, and a 150ms stagger for adjacent desktop blocks.
The easing is a CSS approximation of Apple's easeInOutQuad. This reproduces
the entrance behavior without importing Apple's animation framework or assets.

Entrances play once. Keep the initial viewport visible and never animate the
hero out. Static HTML and unsupported browsers remain visible; keyboard focus
and hash navigation reveal their targets immediately. Reduced-motion and print
styles show every block without motion. Mobile blocks have no stagger delay.

This direction also follows [content-first design](https://www.smashingmagazine.com/2015/02/design-last/)
and [NN/G's guidance on visual hierarchy](https://www.nngroup.com/articles/good-visual-design/):
use the real research material to determine layout, use color for meaningful
emphasis, and remove repeated copy and decoration that do not help readers.

## Coverage and evidence boundaries

The system covers homepage diagrams, project cards, guided conversations,
prepared tables, result charts, selectors, buttons, figure dialogs and the
website's video frame/caption. Lieflat contributes chart geometry, not an
independent cream/navy theme. Preserve chart values, scales and source links.

Original paper figures and embedded video content retain their original colors;
they are source material. Their website frames and controls follow TAP's theme.
