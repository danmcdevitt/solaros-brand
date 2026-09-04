# Solaros design decisions

The ruling log. Canon holds values; this file holds why they are those values and
what was rejected. A value that cannot be traced to a line here does not belong
in canon.

Read the census that these rulings were made against in
`work/drift-inventory.md` and `work/surfaces-and-work-types.md`.

---

## 2026-09-03 · The sixteen rulings

Made against a measured census of fourteen surfaces. Every contrast figure below
was computed, not transcribed.

### A · Colour

#### A1 · The accent on ink — `#9078FF`

Text, links, focus rings, key numerals and hairline rules on the ink ground.

Brand violet `#6C3EE5` measures **3.26:1** on ink and cannot carry text there, so
the role needs a lifted value. `#9078FF` holds hue at 288.0deg and near-full
chroma, raising OKLCh lightness from 0.523 to 0.660. It measures **5.95:1**.

It is also 15.2 CIE Lab dE from Tailwind violet-500 and 15.4 from violet-400,
which matters: the obvious alternative `#8660FF` is dE 3.7 from violet-500 — the
same colour under a different name, which is the thing this role exists to avoid.

**Rejected.** `#855FE9` (4.53:1), brand violet lightened 17% toward white — an
independent solution to the same problem, computed five weeks earlier, in use by
every generated diagram and graphic. `#7C8BFF` indigo (6.59:1), the accent before
31 August and still the most widely used value in the estate, but a different hue
from the brand mark.

> Note. `#9E77ED`, which the platform ships for its dark ground, measures 5.95:1
> on ink and 3.07:1 on paper — identical to `#9078FF` on both. Two teams solved
> the same problem to the same numbers and arrived at different hexes. See A5.

#### A2 · The accent on paper — `#6C3EE5`

Brand violet unmodified. It measures **5.61:1** on paper, so one colour serves
text, rings and fills on this ground, and `--accent` and `--accent-solid` are the
same value. Hover and press step *down* in lightness, away from the ground — the
opposite direction to ink, running under the same rule.

**Rejected.** `#4F46E5` indigo deepened (5.81:1). Marginally higher contrast, but
it puts a non-brand hue on the accent for no measured gain.

#### A3 · Indigo — artwork only

Indigo is **not** an interface colour. It seeds `ramp-indigo` and appears in
illustration. It has no interface role of any kind — not an accent, not a link,
not a series colour, not available for emphasis.

The literal stays in `[literal]` for the ramp. Nothing in `[ground.*]` may be
`#7C8BFF`, and `build/check.py` enforces that.

**What this costs, stated plainly.** The vault has carried *focal is violet,
links are indigo* since 2026-08-10. It existed because a focal node and an
external-call arrow were otherwise the same colour, and it worked because those
were two colours. Violet is now the accent on both grounds and indigo is gone, so
the distinction has to be rebuilt out of weight, dash or arrowhead rather than
hue. **See OPEN-1.**

**Rejected.** Keeping indigo as a narrow, named link role scoped to diagram
output — which would have preserved the distinction unchanged and left eleven
surfaces alone, at the cost of a second hue surviving in the system.

> **Recorded because it matters for anyone reading this later.** A3 was first
> answered as "link role only" and canon was built on that answer. It was
> re-ruled to artwork-only on the same day, and the link role was removed. The
> earlier reading is not a mistake in the record; it is a decision that was
> changed.

#### A4 · The second voice in artwork — cyan

`#4BCDE7` on ink (10.54:1), `#137B90` on paper (4.55:1). The dark value measures
1.74:1 on paper, which is why the role needs a pair.

Cyan sits 74.4deg from violet in OKLCh at half its chroma — far enough to read as
its own colour, quiet enough that violet stays the louder of the two.

**Rejected.** Teal `#5FD2C2`, in use across the decks, the vault series palette,
the marketing site and partners. It sits 30.5deg from cyan, and at 1px and 16%
opacity the pair reads as one colour — the defect this role exists to prevent.

> **This ruling has an unresolved consequence. See OPEN-1 below.**

#### A5 · The platform's two violets — retired

`#7F56D9` (`rgb(127 86 217)`) and `#9E77ED` (`rgb(158 119 237)`) are withdrawn.
Specify, the Build Engine and the workspace bind to canon instead.

Both came from a shadcn default rather than from a Solaros decision. The workspace
spike had already made this change by hand and recorded the reason: *"a copy is
not a shared system — it is drift with a head start, which is exactly how the two
different violets happened."*

Written in `rgb()` notation, which is why a hex search across the estate missed
them for as long as it did.

#### A6 · The illustration stroke — follows the accent

`stroke = "hot"` resolves to the accent role for the ground in use: `#9078FF` on
ink, `#6C3EE5` on paper. This is what `hot` already meant; the ruling removes a
second decision rather than adding one.

It also settles a contradiction internal to dm-visual, where `[standard]` carried
a comment saying the stroke resolves to `#7C8BFF` while `[ground.ink]` set `hot`
to `#855FE9`.

The five approved illustrations are transparent masks with colour applied at the
finish step, so this recolours them without regenerating anything. Note for the
record that they were signed off wearing the older stroke.

### B · Type

#### B1 · Display face — Inter by default, Zalando opt-in per surface

Headings are Inter. Zalando Sans Expanded is available and a surface turns it on
deliberately; on the web that is the `data-display="expanded"` attribute, which
also stops the layout requesting the face from the font host unless a page asks
for it.

Composed graphics keep **once per page** as a surface rule rather than a brand
rule. One element, the largest one — a second use makes it a body face, and the
expanded width that gives a headline presence turns into noise at any size a
reader has to work through.

**History.** The face was approved 2026-08-11 as once-per-page, set on every
heading 2026-08-28, and reverted the next day: the widths hold up in a specimen
and do not hold up at heading sizes on a web page.

#### B2 · Michroma — removed

Not a Solaros face. One deck template loaded it from Google Fonts; it appears in
no token set, no brand file and no vault document. The deck moves to the three
recorded faces.

#### B3 · One type scale, extended upward

Fixed-canvas surfaces do not get a second ladder. Canvas steps are added above
72px in the same scale.

See B3b for the step values and for what "one scale" turned out to mean.

#### B3b · The canvas ladder is guided, not governed — 2026-09-03

Steps: **14, 19, 22, 24, 27, 30, 34, 42, 54, 72, 90, 120, 160**

A piece starts on a step and **may depart from it**. A departure is a design
decision, not a violation, and nothing lints it.

The distinction is what a scale is *for* on each surface. On the web a scale is a
constraint: dozens of components across hundreds of pages, nobody can see them
all at once, so the only thing preventing drift is that an unlisted size cannot
be used. On a fixed 1920x1080 canvas one person composes one frame and can see
the whole of it, and a 2px nudge for balance is the work rather than drift.

**Derived, not chosen.** 257 font-size uses were measured across the deck
templates and the video frames — 32 distinct sizes in the decks, 19 in the video,
with no scale declared on either surface and every size written inline on the
element. Against this ladder: **149 uses sit unchanged, 74 move by 5% or less,
34 move further.** Twenty-three of those 34 are one-off display sizes on single
slides, which is precisely the case this ruling permits.

A use-weighted k-means fit was tested and rejected. It scored worse (3.96%
against 2.99% mean shift) because it spends steps chasing single-use outliers at
132, 150 and 200 while the type mass sits between 19 and 34.

**"One scale extended upward" does not hold literally, and this is the record of
why.** Web x1.5 was the obvious reading and was tested first: it moves 31% of
measured uses. Two reasons it fails. The canvas working range, 19 to 34, falls
inside a gap the web scale skips entirely — the web ladder jumps 20 to 30. And
14px deck chrome does not scale with the canvas at all, because a footer is
already at a legibility floor and a floor does not multiply.

What is true instead: canon publishes **one ladder**. The web enforces nine of
its steps through lint; the canvas is guided by all thirteen. They share 14, 30
and 72 and diverge elsewhere for the reasons above.

### C · Depth and space

#### C1 · Shadows are canon

The five-layer raised-surface ladder becomes a brand device, available on every
surface. The written prohibition is retired.

The prohibition had already lost to reality. The deck kit and the vault both
state the system avoids shadows entirely; the census found shadows in use on
eight surfaces — 87 occurrences in the workspace spike, 11 in Specify, 8 in the
Astro rebuild, 6 in the deck templates, 5 on the marketing site, 3 in the video
frames. Withdrawing them would have been the largest single change available,
not the conservative option it looked like.

Two documents now state a rule that is no longer true and must be corrected when
their surfaces are chained back: `solaros-intro-deck/colors_and_type.css`
(`--shadow-none`, and the comment above it) and
`the brand knowledge base`.

> This does **not** touch dm-visual's `[refused] shadows = "no cast shadow, no
> ground plane, no drop shadow"`. That is a rule about what an illustration may
> depict, not about interface elevation. It stands unchanged.

#### C2 · No spacing scale in canon

Canon governs colour, type and atmosphere. Spacing stays a per-surface decision.

The eight-step scale in the Claude Design import is the only one in the estate
and binds nothing; it is left where it is rather than promoted.

### D · Atmosphere

The recipe itself was never in question: two layers, bottom first — dust, then
grain. No vignette, no wash, no field. That absence is a recorded decision.

#### D1 · Grain opacity — per ground, the Astro calibration

`0.62` on ink, `0.12` on paper and the light theme, `0.17` on violet.

One opacity is not one effect. Soft-light does most of its work at mid luminance
and almost none near white, so a light ground takes multiply instead, and a
chromatic ground — violet sits right in the middle of soft-light's working range
— takes far less than a dark one.

Supersedes dm-visual's single `0.45`, raised on 2026-09-02 for a paper feel
across every section.

#### D2 · Dust density — derived, with a stated override

The count derives from area: about 260 per 1080x1350. A surface may pin its own
count **with the reason on record**.

One override stands today, and its reason is already written: the hero carries
520 where the formula gives about 180, because at that density the particles are
the point, and the same field under a page of body copy would be busy.

The formula is canon precisely so that no caller silently picks its own number,
which dm-visual notes is how two implementations diverged before.

### E · Scope

#### E1 · The syntax palette is canon

Six roles on both grounds. Every surface that shows code or structured text uses
them — Specify, the Build Engine, the decks and the video included.

The rule travels with the values: syntax must **not** be the brand accent. The
accent means *this is the one thing this figure is about* and is spent once per
graphic; syntax means *this is what kind of word this is* and repeats. Sharing a
colour would destroy the first meaning.

#### E2 · Artwork roles — both vocabularies kept, with a published mapping

> **The framing that produced this ruling was wrong, and the correction makes it
> easier rather than harder.** The two sets were put forward as doing
> "overlapping jobs". Measured, they do not overlap at all.
>
> The Astro `--art-*` values are all near-ink: `#16161B`, `#0E0E12`, `#11111F`,
> `#23232A`, `#3A3A40`. They sit just above the ground and read as texture.
> dm-visual's `line`, `mid` and `hot` are `#F5F5F5`, `#A1A1A6` and the accent —
> full-strength marks drawn *on* the ground.
>
> They are two registers of one system, not two names for one thing: sub-ground
> texture, and above-ground marks. Canon publishes both because both are needed,
> and the mapping table records that they are complements rather than
> equivalents. Nothing has to be renamed.

#### E3 · One status and series set in canon

Status (`warn`, `good`) and the series palette are unified into one published set
with per-ground values.

> **This ruling has an unresolved consequence. See OPEN-1 below.**

---

## 2026-09-03 · Industrial accents

A second batch, from the *Solaros Industrial Accents* exploration and the
441-line research report at `the website repo/docs/reference/industrial-design-language.md`.
Both were read in full before these were written.

### F1 · The ink greys, revised

| Role | Was | Now | On ink |
|---|---|---|---|
| `text` | `#F5F5F5` | `#F6F6F4` | 18.15 → 18.29 |
| `text_dim` | `#A1A1A6` | `#B4B2BF` | 7.69 → 9.48 |
| `text_muted` | `#6E6E73` | `#7C7A89` | 3.90 → **4.71** |
| `rule` | `#2A2A2E` | `rgba(255,255,255,.10)` | 1.38 → 1.24 |

The greys move from 286deg to 293deg in OKLCh and roughly double in chroma, so
they lean toward the violet rather than sitting neutral against it.

**`text_muted` is the one that had to move, and this is the third time the same
defect has been found.** Every mono label — eyebrow, part ID, readout, dimension
text — runs at 10 to 12px on this role, and `#6E6E73` measures 3.90:1, under the
text floor. The vault recorded exactly this on 2026-08-10, derived `soft`
`#78787D` for it, and wrote "do not propagate back into production without a
separate decision." Nobody made that decision, so the defect stayed. The
industrial-accents page then arrived at `#7C7A89` independently, three weeks
later, for the same reason. Three efforts converging on one number is evidence
the number is right and canon was wrong.

`text` becoming `#F6F6F4` is not a visual change — 18.15 against 18.29 is
invisible — it is a structural one. It is the `paper` literal, so the estate now
has one white instead of two that differ by one step in one channel.

`rule` as alpha rather than a hex is a small loss of contrast and a real gain in
correctness: one declaration composites correctly on any ground, which is the
argument canon already makes for fades over ramp steps.

> Recorded because the provenance was wrong and someone will check it. The
> industrial-accents page states its tokens were "copied from
> the website token package on the site branch so this page and the site cannot
> disagree." Three of these four values are in neither that package nor anywhere
> in the astro repo. They were new work presented as a copy.

### F2 · Mono at 700

`JetBrains Mono` gains a bold weight, for a numeral or identifier used as an
**object** — a section number on the page the way a number is on a hangar door,
a part ID stamped on a part. Never for running mono text.

### F3 · Drafting — one ink, three weights

A technical drawing is not coloured, it is weighted. Every structural line is
the same ink and separates by width, opacity and dash:

| Weight | Width | Opacity | Dash |
|---|---|---|---|
| visible | 1.1 | 1.00 | — |
| thin | 0.6 | 0.55 | — |
| hidden | 0.7 | 0.45 | `5 3` |
| centre | 0.6 | 0.40 | `14 3 2 3` |

This is the argument the violet ground already makes for type — emphasis by
weight rather than by a second colour — applied to line. The dash arrays are the
drafting conventions, readable by anyone who has seen an engineering drawing.

The violet ground takes white as its ink at lower alphas, because white on
violet reads stronger than the accent on ink, so the same visual weight needs
less. It carries no hidden weight: nothing on that ground is quiet enough to
hold a dashed edge as well.

**Annotation is the deliberate exception.** A dimension line and its text are
`text_dim`, never the accent. A dimension measures the subject; it is not the
subject, and giving it the accent spends the accent on a ruler. `check.py`
enforces this.

**The lit case extends the one-light rule into 3D.** Key light white at 1.10
from above and to the right, fill **the accent** at 0.35 from below and behind,
ambient 0.22, surface metalness 0.78 and roughness 0.46. The fill being the
accent is what makes a rendered part read as Solaros rather than as a generic
grey render, so it is checked rather than left to memory.

**Explode and assemble** is the motion primitive: assembled it is one thing,
exploded it shows its parts, each with a leader to what it is. 900ms on the
standard ease. Reduced motion settles with **no travel** rather than snapping —
the parts simply arrive where they belong.

---

## Derived-open

Items that follow from the rulings above and cannot be settled without a further
decision. None is a reopening of a ruled question.

OPEN-2, the canvas type steps, was closed on 2026-09-03 — see B3b.

### OPEN-3 · `text_muted` on paper is still under the text floor

F1 revised the ink greys and lifted `text_muted` to 4.71:1 because mono labels
run on it at 10 to 12px. The paper ground has exactly the same defect and F1 did
not reach it, because F1 ruled on ink values only.

`#8A8A90` measures **3.17:1** on paper — the same figure the vault recorded on
2026-08-10 when it first found this on both grounds.

Two candidates, both with real provenance:

| Value | On paper | Hue | Chroma | Where it comes from |
|---|---|---|---|---|
| `#707075` | 4.55:1 | 286deg | 0.008 | the vault's derived `soft`, light variant, 2026-08-10 |
| `#716F81` | 4.52:1 | 291deg | 0.028 | derived by F1's own recipe, so it matches the revised greys |

The trade is plain. `#707075` has been sitting in the vault for three weeks and
was approved for diagram output, but it is neutral — it predates the decision to
warm the greys toward the violet, so paper and ink would no longer match in
character. `#716F81` matches the revised system and was derived here, so it has
no approval behind it.

Not chosen, because choosing means picking a value and neither is derivable from
what has been ruled.

### OPEN-1 · The artwork palette has three holes

A3, A4 and E3 together vacate more of the artwork palette than any one of them
did alone. None of the three is in question; what follows from them is.

**1 · `series-1` is vacated.** A3 scoped indigo out of every interface role, and
the vault's `series-1` was indigo on both grounds.

**2 · `series-2` is contested.** A4 gave the second voice to cyan and recorded
teal as unusable beside it — 30.5deg apart, and at 1px and 16% opacity the pair
reads as one colour. The vault's `series-2` is that teal.

| Role | Light | Dark | Status after the rulings |
|---|---|---|---|
| series-1 | `#4F46E5` | `#7C8BFF` | **vacated** — indigo is artwork-only (A3) |
| series-2 | `#5FD2C2` | `#5FD2C2` | **contested** — teal beside cyan is the defect A4 names |
| series-3 | `#74E08C` | `#74E08C` | green, unaffected |
| series-4 | `#F0B95E` | `#F0B95E` | amber, unaffected |
| series-5 | `#F582B7` | `#F582B7` | pink, unaffected |

The obvious repair — cyan takes series-1, teal takes series-2 — puts the two
colours 30.5deg apart directly beside each other, which is precisely the pairing
A4 ruled against.

**3 · A diagram has no way to mark an external call.** This follows from A3 and
is the newest of the three. The old answer was a second hue. Candidate answers
that are not a hue: line weight, a dashed stroke, an open rather than filled
arrowhead, or a change of node shape. Any of them is a design decision rather
than a token, which is why it is stated here rather than solved.

None of the three is derivable from what has been ruled. Each needs a decision.

---

## Not in question

Recorded so nothing here is reopened by accident.

- **Six of the seven base literals** — ink, paper, violet, indigo, amber and
  green agree in every file that carries them.
- **The six ten-step ramps** — identical in dm-visual and the Astro package. 500
  is always the brand value.
- **Radius stops at 2px** — stated identically on four surfaces.
- **State change holds hue** — hover and press move lightness only. Arrived at
  independently in `tokens.css` and `solaros-theme.css`, which is the strongest
  evidence a rule is real.
- **Atmosphere is dust then grain** — and nothing else.
- **Everything else dm-visual carries** — layer kinds, the illustration prompt
  template, the two-tier hand, the concentric-rings motif, aspect and coverage
  standards, capability and refusal gating. Carried into canon intact.
- **No gradients inside components**, and no photography — every ground is flat
  or drawn.
- **Three grounds** — ink, paper and violet, each with a full role set.
