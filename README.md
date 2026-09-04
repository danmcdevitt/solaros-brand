# Solaros design system

The public face of the Solaros design system. Everything here is **generated** —
edit nothing in this repo; it is overwritten on every publish.

| File | What it is |
|---|---|
| [`design.md`](design.md) | How to design with the system. Composition, the accent rules, the copy registers, the failure patterns |
| [`solaros-web.css`](solaros-web.css) | Tokens for live DOM — sites and apps |
| [`solaros-canvas.css`](solaros-canvas.css) | Tokens for fixed 1920x1080 surfaces — decks and video frames |
| [`solaros-tokens.json`](solaros-tokens.json) | The same values as data, for generators that are not DOM |
| [`solaros-tokens.toml`](solaros-tokens.toml) | The same, for consumers that already parse TOML |
| [`solaros-figures.js`](solaros-figures.js) | Three parametric technical drawings &mdash; rings, dispatcher, state machine |
| [`DECISIONS.md`](DECISIONS.md) | Why each value is what it is, and what was rejected |
| [reference](https://danmcdevitt.github.io/solaros-brand/) | The browsable reference |

## Using it

Every emitted name carries a `sol-` prefix so a file drops into any host without
colliding. **Bind, do not copy:**

```css
@import url("https://danmcdevitt.github.io/solaros-brand/solaros-web.css");
:root { --accent: var(--sol-accent); --bg: var(--sol-bg); }
```

Each file's header carries the canon commit and the SHA-256 of the source it was
built from, so a consumer can always answer which version it is built against.

## Two open questions

Values are absent rather than guessed. See `DECISIONS.md`.

- **OPEN-1** — three holes in the artwork palette.
- **OPEN-3** — `text_muted` on the paper ground is still under the text floor.

---

Generated 2026-09-04 from the private canon repo. Not accepting pull requests —
changes are made to canon and republished.
