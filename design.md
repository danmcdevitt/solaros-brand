---
name: solaros-design
description: "Design, build or substantially improve any Solaros-authored visual artefact — a web page, a product screen, a slide deck, an explainer video frame, a composed graphic or a technical diagram. Carries the token vocabulary, the composition rules, the industrial accent language and the failure patterns to avoid. Use whenever the output will carry the Solaros name."
---

# Design like Solaros

Act as a designer, information architect and design engineer working on a
Solaros-authored artefact. Shape the argument and the artefact together. Do not
restyle a data dump, and do not assemble generic components.

Solaros makes an event-driven embedded operating system and the engineering
platform around it — Specify, Verify, Construct. The audience is embedded
engineers, engineering managers and CTOs. They read drawings, datasheets and
instruments for a living, and they can tell the difference between a thing that
was built and a thing that was decorated.

That is the whole design brief: **make artefacts that look built.**

---

## Priority order

When these compete, protect them in this order.

1. **Supplied facts.** Identifiers, counts, hashes, measurements, units,
   qualifiers. Never invent one, never round one for looks.
2. **Canon.** Every colour, size, weight and motion value comes from
   `canon/tokens.toml`. If canon does not decide it, see rule 4 below.
3. **The reader's job.** What they came to understand or decide, and the evidence
   that earns the answer.
4. **The surface's own mechanics.** A slide has no hover. A video cannot be
   scanned. See `canon/surfaces.toml`.
5. **Composition specific to this material.** Not the layout the artefact
   category would suggest.

If proceeding would change a commercial claim, a measurement, a customer's
identity, a date or a call to action, ask. Otherwise omit the unknown, label it
honestly, and carry on.

---

## Use the vocabulary. Do not invent values.

Every name below is real and comes from canon. Write these, not literals.

**Colour.** `--sol-bg` `--sol-bg-elevated` `--sol-text` `--sol-text-dim`
`--sol-text-muted` `--sol-rule` · `--sol-accent` (text, links, focus, key
numerals) `--sol-accent-solid` (fills, labelled with `--sol-on-accent`)
`--sol-accent-hov` `--sol-accent-prs` · `--sol-alt` (the second voice in artwork)
· `--sol-warn` `--sol-good` `--sol-error`, and `--sol-warn-text` /
`--sol-good-text` when the state has to be **said in words**.

**Grounds.** Three, and they are classes not themes, because a ground belongs to
a section and not to a document: default is ink, then `.sol-paper` and
`.sol-violet`. On violet there is no accent colour — **the accent is white, and
emphasis comes from weight.** Nothing on that ground is brighter than white.

**Type.** `--sol-font-sans` (Inter) and `--sol-font-mono` (JetBrains Mono). Web
steps `--sol-text-xs` … `--sol-text-7xl`. Canvas roles `--sol-t-chrome`,
`-label`, `-mono`, `-body`, `-body-lg`, `-lead`, `-lead-lg`, `-sub`, `-display`,
`-headline`, `-headline-lg`, `-statement`, `-statement-lg`.

**Drafting.** `--sol-draft-ink` and four weights — `visible`, `thin`, `hidden`,
`centre` — each with a width and an opacity, and dashes on the last two. The ink
is a **role**, so the same drawing is correct on every ground.

**Depth.** `--sol-shadow-panel`, `--sol-shadow-raised`. One light, from above,
committed to across the whole surface.

**Form.** `--sol-radius-sharp` is 2px and radius stops there. `--sol-rule-weight`
is 1px.

**Space and layout.** `--sol-gap-tight` (8px), `--sol-gap` (16px) and
`--sol-gap-group` (32px) are the only gaps, and `.sol-flow-tight`, `.sol-flow`
and `.sol-flow-group` are the classes that consume them &mdash; the flow owns the
gap and **a child never adds its own margin**. `--sol-columns` (12) and
`--sol-gutter` (24px) are the grid, written as `.sol-grid` with `.sol-span-4`,
`.sol-span-6`, `.sol-span-7`, `.sol-span-8` and `.sol-span-12`. The safe margin
and the baseline unit are **open** &mdash; OPEN-4 and OPEN-5 in
`canon/DECISIONS.md` &mdash; so neither carries a value and neither may be
guessed.

**Icons.** There is no bespoke Solaros icon set and none is coming — see G2 in
`canon/DECISIONS.md`. Lucide is the ruled source; Streamline is the reserve for
communications assets where Lucide lacks a glyph. Where the icon sits inside a
drawing, the stroke follows the drafting `visible` weight; everywhere else it
keeps Lucide's default 2px. Sizes are 16 / 20 / 24 px on web and 24 / 32 px on
canvas — derived, not measured. Colour is `--sol-text`, and `--sol-accent` only
when the icon *is* the accent of the composition.

### The classes

Write these instead of inventing structure. Each is a decision already made —
what a spec plate is, how a tick scale is built, what a registration mark looks
like. Naming the primitive is what takes the decision away from you.

**On every surface** (31)

`sol-atmosphere` · `sol-bracket` · `sol-code` · `sol-eyebrow` · `sol-flow` · `sol-flow-group`
`sol-flow-tight` · `sol-grid` · `sol-mono` · `sol-numeric` · `sol-panel` · `sol-paper`
`sol-readout` · `sol-readout-key` · `sol-rule-line` · `sol-section` · `sol-span-12` · `sol-span-4`
`sol-span-6` · `sol-span-7` · `sol-span-8` · `sol-syn-comment` · `sol-syn-const` · `sol-syn-fn`
`sol-syn-keyword` · `sol-syn-string` · `sol-syn-type` · `sol-t-` · `sol-table` · `sol-table-wrap`
`sol-violet`

**Web only** (42) — a fixed canvas has no hover, focus or active,
no reflowing measure, and its own type ladder.

`sol-barcode` · `sol-body` · `sol-button` · `sol-button-ghost` · `sol-caption` · `sol-dots`
`sol-dots-coarse` · `sol-dots-fade` · `sol-draft-centre` · `sol-draft-dim` · `sol-draft-dim-text` · `sol-draft-engrave`
`sol-draft-hidden` · `sol-draft-thin` · `sol-draft-visible` · `sol-edge-label` · `sol-field` · `sol-h2`
`sol-h3` · `sol-hazard` · `sol-hazard-label` · `sol-id` · `sol-id-hash` · `sol-leader`
`sol-leader-dot` · `sol-leader-text` · `sol-lede` · `sol-link` · `sol-numeral` · `sol-numeral-accent`
`sol-plate` · `sol-plate-key` · `sol-reading` · `sol-reg` · `sol-reg-heavy` · `sol-scale`
`sol-scale-mark` · `sol-scale-value` · `sol-shell` · `sol-shell-measure` · `sol-tear` · `sol-title`

**Canvas only** (15) — the guided type ladder, named by role.

`sol-canvas` · `sol-mono-object` · `sol-t-body` · `sol-t-body-lg` · `sol-t-chrome` · `sol-t-display`
`sol-t-headline` · `sol-t-headline-lg` · `sol-t-label` · `sol-t-lead` · `sol-t-lead-lg` · `sol-t-mono`
`sol-t-statement` · `sol-t-statement-lg` · `sol-t-sub`

**The names above are the whole API.** Do not invent a `--sol-*` name, do not
alias one, and do not read the stylesheet looking for internal selectors to reuse.
If a class or token is not listed here, it does not exist for you. Use semantic
HTML and a page-owned name of your own instead — never a `sol-` one you guessed.

If you need a value that does not exist: **stop and say so.** Do not invent it,
and do not reach for the nearest literal. An invented value is how this system
ended up with five different violets.

---

## The five accent rules

The industrial accents — part numbers, spec plates, tick scales, registration
marks, construction lines, hazard bands, tear lines, coordinate readouts — are
what make a Solaros artefact look instrumented rather than styled. They are also
the easiest thing here to overuse into noise.

1. **It means something.** A part number is on a part. A tick scale measures a
   thing that is on the page. If the accent points at nothing it is a sticker.
2. **One per screen.** One reads as intent, three read as a theme. The unit of
   "one" differs per surface: a **viewport** on the web, a **slide** in a deck, a
   **shot** in a video.
3. **One colour stays one colour.** Violet is the only accent. Amber appears
   once in a whole artefact, as a warning, never as decoration.
4. **Mono is the voice.** Every label, ID and readout is JetBrains Mono,
   uppercase, tracked. The sans face never plays instrument.
5. **No fake data.** Every identifier, hash and count is real or is plainly a
   placeholder. A barcode is a pattern, never a code pretending to scan.

`canon/surfaces.toml` says what each of the thirteen accents becomes on each
surface, and how it is overused there. Read your surface's column before using
one.

---

## Composition

**Open with the argument, not a masthead.** If the reader saw only the first
screen, they should remember the central relationship or decision — not the
title.

**Name the obvious layout, then reject it unless the material earns it.** A
capability page need not look like every capability page.

**Choose geometry before components.** Magnitude to position or length on a
common scale. Change over time to horizontal order. Threshold to distance from a
boundary. Process or dependency to connection and sequence. Use a table for
precise lookup, prose for one conclusion, and a chart only where a relationship
gets faster to understand visually.

**Hierarchy comes from typography and space before surfaces and colour.** The
page is one continuous ground. Earn a panel or a rule only where it marks a real
boundary that spacing cannot express. Do not wrap every section in a card.

**Squint test.** At a glance the dominant claim should be obvious and the reading
path stable. If every block has equal weight, redesign before building.

---

## Colour discipline

The accent is spent, not applied. One dominant accent per view; everything else
carries by weight, position and space.

The second voice (`--sol-alt`, cyan) exists for artwork that genuinely draws two
things. It sits 74.4° from the accent so the pair holds apart at 1px and low
opacity. **Never put teal beside it** — 30.5° apart, they read as one colour,
which is the defect the role exists to prevent.

Status colours are for status. `--sol-warn` and `--sol-good` are **graphical**
roles — a dot, a badge, a bar. On paper neither carries as text; use
`--sol-warn-text` and `--sol-good-text` when the state is words.

Syntax colouring is deliberately **not** the accent. The accent means *this
figure is about this* and is spent once. Syntax means *this is what kind of word
this is* and repeats. Sharing a colour destroys the first meaning.

---

## Motion

Motion is reserved for diagrams, state changes and video. It is never decoration.

| token | value | used for |
|---|---|---|
| `dur_fast` | 150ms | state changes and reveals |
| `dur_slow` | 600ms | layout and opacity |
| `drafting.motion.duration` | 900ms | explode and assemble |
| `ease_out` | `cubic-bezier(0.16, 1, 0.3, 1)` | the one curve |

**Explode and assemble** is the motion primitive. Assembled, the object is one
thing; exploded, it shows its parts, each with a leader to what it is. It runs at
900ms on the one curve, and it is the only place a 900ms move is correct.

**A state change moves lightness and holds hue.** Lightness moves away from the
ground, so the same control reads as changed on ink, on paper and on violet. A
control changes state, not colour.

**Reduced motion settles with no travel.** The parts arrive where they belong
rather than snapping into place, and the resting geometry is the same geometry
either way.

**Connected diagrams** move as approved on 2026-09-04. Traces use the shared slow
duration, staggered by the shared fast duration, with the shared ease-out.
Reduced motion settles immediately, which is the same no-travel rule applied to
plates.

**Video is the one surface where motion carries the argument.** Motion must carry
meaning — a part that moves for atmosphere is the video equivalent of a sticker.
Construction lines drawing in, then the object appearing on them, is the
strongest transition available anywhere in this system. Read the video surface
rules before animating a frame.

---

## Copy

Two registers, and they are not interchangeable.

**On artefacts** — interfaces, decks, diagrams, labels. Precise,
engineering-literate, no marketing adjectives. "We" for the business. British
English. Title Case on display headings. The eyebrow is `///`, three slashes.
Sentence-case headings that state the specific claim, not the document genre.

**In marketing content** — posts, articles, lead magnets, where the CEO is the voice. Validation → pattern → implication. Open by validating what the industry
accepts as inevitable, introduce a historical parallel, show what was missed,
connect it to the reader's world, close on an implication. **Never pitch a
solution.** Never "embedded is broken, here's how we fix it".

Both registers: define an unfamiliar term in plain words at first use, then use
the exact term consistently. Simplify language, never the claim: keep every
qualifier, unit, period and condition that changes meaning.

Punctuation. In produced copy, connect thoughts with a spaced hyphen rather than
an em dash - it reads closer to speech. This applies to copy, not to internal
documentation, which is prose and not a brand surface.

---

## Named failures

Recognise these and do not produce them. Each one has actually happened here.

**Values**
- Writing a literal instead of binding to canon. This is how five different
  violets happened, in `rgb()` and hex, none of them wrong-looking.
- Reaching for the ink literal on a paper ground because it is "the brand black".
- Adding a colour "temporarily".
- Filling in an open question so your work is not blocked.

**Colour**
- Two hues under 45° apart used as a pair in artwork.
- A hover state that changes hue instead of lightness.
- Texture bright enough to read as a drawn line — it must stay under 3:1.
- A status colour set as body text on paper.
- Spending the accent twice in one view, or on a ruler.

**Type**
- A 64-character hash set at chrome size on a slide. It fits and cannot be read.
- Rotated body copy. Rotation is for orientation, never content.
- Tiny grey text used to make density fit. Rewrite before shrinking.

**Accents**
- A section number that counts nothing.
- A `live` readout on a surface where nothing runs.
- An invented ID, or a barcode implying it scans.
- A dot grid at web pitch in a video — it will alias and crawl.
- A 1px registration cross in a video — the encoder discards it.

**Borrowed prohibitions** — the trap this section could become

Other design systems publish restraint lists, and several of their prohibitions
are Solaros devices. Vercel's public guidance rejects "all-caps or tracked
eyebrows, kickers, overlines" and "decorative numbered section labels". Solaros
uses a `///` eyebrow, uppercase tracked mono labels, and numerals as objects, and
all three are load-bearing here. Do not import another system's list. The list
below is Solaros's own, and every entry on it happened here.

**Generic-design tells**
- Gradients inside components, glows, blobs, glass, fake depth.
- A 10px corner radius. Radius stops at 2px.
- Emoji as section markers.
- Everything centred.
- Cards around everything, and nested panels.
- Numbered markers on content that is not a sequence.

---

## Accessibility

Solaros targets WCAG 2.2 AA.

Colour is the part a machine can hold. Text clears 4.5:1 against its own ground
and a graphical mark clears 3:1, and `build/check.py` measures every canon value
on every ground on every run. A value that drops under a floor fails the build
rather than shipping.

Two exceptions are declared, both on the paper ground, both open as of
2026-09-13.

- **OPEN-3** — `text_muted` measures 3.17:1 on paper, under the text floor. The
  value is carried with a marker rather than quietly corrected, and the check
  fails if the declaration is removed without the value being fixed.
- **Mono labels at 10-12px** on paper run on that same value, so they are illegal
  on that ground until OPEN-3 is ruled. Until OPEN-3 is closed, the value stays
  declared as an exception.

The rest of AA is not machine-checkable here. Work through this list by hand —
checked by hand, not by build.

1. Every control is reachable by keyboard, in the order the page reads.
2. Focus is visible, drawn as a ring in the accent.
3. Text resizes to 200% without loss of content or function.
4. Reduced motion is honoured on every element that moves.
5. No information is carried by colour alone.

---

## Per surface

Read `canon/surfaces.toml` for the full picture. In brief:

**Website and docs.** Live DOM. Hover, focus and scroll exist. The web type
ladder is **governed** — lint refuses a size that is not on it. An accent that
only appears on hover is invisible to a third of visitors: it may enrich, never
carry.

**Platform — Specify, Build Engine, workspace.** Same mechanics, different job:
scanned and operated, not read. Surface the summary before the detail. Encode
state in form as well as colour. What is interactive must look interactive.
Bind to canon through a separate theme file that survives `shadcn add`.

**Presentation.** Fixed 1920×1080, exported to PDF, PPTX and PNG. **No hover** —
every state is the resting state, and anything that would have been a hover
becomes the resting state or a second slide. Nothing below **19px** carries
meaning; the 14px chrome step is unreadable from the back of a room. Structural
lines export at 1.5px minimum. Do not let elevation carry meaning: the shadow
ladder flattens in export. A whole slide can be a spec plate, and often should be.

**Video.** 1920×1080 frames captured to MP4. **Time is the constraint the other
surfaces do not have.** If it cannot be read in the time it is up, it is not on
the screen. Truncate a hash to eight characters; never scroll one. Motion on this
surface follows the Motion section above.
*The compression rules in `surfaces.toml` are engineering reasoning and have not
been measured against a real encode. Test before relying on them.*

**Composed graphics and diagrams.** Not DOM. `dm-visual` holds the illustration
language — the two-tier hand, the concentric-rings motif, the aspect and coverage
standards — and canon does not override it. An illustration is **an object that
names**; a diagram is **geometry that argues**. They are different jobs.

---

## Inspect before you deliver

Render the result where tooling allows. Check the first screen, the whole
artefact, and both grounds. Then review in this order, and fix the biggest
systemic fault before the small ones:

1. **First read.** Is it recognisably Solaros? If someone saw only the first
   screen, would they remember the central relationship rather than the title?
2. **Facts.** Is every identifier, count and unit real? Did simplification
   preserve every qualifier?
3. **Composition.** One dominant object? Does each section answer a new question?
   Is any empty space accidental rather than deliberate?
4. **Type.** Consistent roles, peers at equal weight, aligned baselines, readable
   prose. On canvas, is anything meaningful below 19px?
5. **Accent.** Exactly one per unit — viewport, slide or shot. Does it point at
   something real?
6. **Restraint.** Can any surface, border, label, colour or section be removed
   without losing meaning? If yes, remove it.
7. **Grounds.** Do ink, paper and violet each hold up, if the piece uses more
   than one?

Keep this internal. Deliver the artefact, not a score, a process diary or a
self-critique.

## Never

- Change a canon value without recording a ruling.
- Copy a canon literal into a component instead of binding to it.
- Invent an identifier, a count, a hash or a measurement.
- Use amber twice in one artefact.
- Put a gradient inside a component.
- Show a state as colour alone.
- Edit a consumer repo because canon changed. Consumers are bound to canon one
  at a time, deliberately, deliberately, and never as a side effect of another change.


## Connected diagrams

Decision F4 extends the Industrial Accents family to ownership diagrams.
Load `solaros-connected-diagrams.css` alongside the delivery for your surface.
The module `solaros-connected-diagrams.mjs` exports `renderFeatureTree` and
`connectDiagramMotion`. The renderer produces complete SVG markup at build time;
pass a unique `id` per SVG and choose `desktop` or `mobile` layout. The selected open-assembly recipe uses a
tilted feature plate and front-facing definition plates so secondary labels
remain level. Feature status stems follow the lower edge with equal offsets.
The attention marker has a reserved desktop gutter and a dedicated mobile
row gap; it never competes with status text. Desktop changes to the mobile
composition before its labels become too small. Wrap the two
layouts in `.sol-tree-desktop` and `.sol-tree-mobile` inside `.sol-connected`.
The container selects its composition by available width.

The first figure is the oven-feature example. Its content comes from the supplied
reference, not a live product state. Structure uses text ink; selection uses
accent; one attached warning uses warn. Existing drafting line weights and web
type steps carry the hierarchy. The selected feature's three indicators stay
attached to it. MoSCoW belongs to the feature; EARS belongs to each requirement
branch. The containing rail represents the feature set.

`connectDiagramMotion(root, {auto: true})` plays on first intersection. Its
controller exposes `play()`, `finish()` and `destroy()`. A specimen can use
`auto: false` and a replay button. Plates settle along their depth axes and their labels reveal in character
steps, using whole-glyph opacity so the complete text and layout remain present. Green
dots use the existing good role only beside APPROVED labels. Attention appears
after the last connection and label. The entire left assembly completes first;
the right side stays hidden until that boundary, then its connections and
plates enter. Feature IDs arrive whole with their plates, and left-side names
type in reading order across both lines during the plate entrance. All labels
finish with their plate, including right-side details; no character is partially clipped. Destroy cancels motion,
disconnects the observer and removes the media listener. The final geometry never changes. There is no scroll-linked movement or loop.

The public CSS API for this recipe consists of `.sol-connected`,
`.sol-tree-desktop`, `.sol-tree-mobile` and renderer-owned `.sol-tree-*` classes.
Hosts should not recreate the internals. Keep labels readable at the rendered
size; recompose vertically before shrinking the desktop drawing into tiny text.
