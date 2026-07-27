# DESIGN.md — Casa Vavva

Updated 2026-07-26.

## Direction

Minimal craft on `#E8E8E8`. The brush wordmark is the only brand object; everything else is light. The Dia aurora rises from the floor on mount and holds the bottom of the frame alone. Age rule in the house red. One CTA.

**A menu, not a landing page.** The mark is centred; the copy and CTA are ragged-left beneath it. That mismatch is the design, not an oversight — a centred head over a left-set block is how a menu, a title page, or a bill of fare is set, and it is the whole reason the page reads as a house rather than a product. The mark is the only centred object on the page; nothing else may be centred, or the head stops reading as a head.

## Layout

- Canvas: `#E8E8E8`
- Column: `max-w-[368px]`, top-anchored (`3.25rem` mobile / `6rem` desktop), `px-5` at **every** width — 328px of measure everywhere
- Mark: centred in the column, `136px` mobile / `152px` desktop — signature scale, never banner scale
- Copy and CTA: ragged-left on the column's left edge

Centring the mark is done geometrically, and that is correct here rather than lazy: the asset is alpha-trimmed and its glyph extents are symmetric — ink spans x=2..1023 of 1026, midpoint 512.5 against a frame centre of 513.0. The ink *mass* is left-heavy (59.9/40.1, centroid 6.68% left of centre) because the V is the tallest and heaviest stroke, but for a word the eye tracks extents, not density; correcting to the centroid would visibly shove the mark right. If the asset is ever re-cut, re-check the extents before trusting `justify-center`.
- Type: Inter · 15px · medium · tracking `-0.015em` · line-height `1.4` · `text-wrap: pretty`
- Motion: staggered blur-rise (`intro-js` / `intro-go`), 0.5s, 0.08s stagger

### Vertical scale

| Gap | Mobile | Desktop |
|-----|--------|---------|
| Mark → copy | `40px` | `44px` |
| Paragraph → paragraph | `24px` | `24px` |
| Copy → CTA | `24px` | `24px` |

Two rules behind those numbers.

Mark → copy is ~0.65× the mark's own height (63px / 70.5px). A masthead needs a gap proportional to its mass, not a fixed step, or it reads as either glued on or adrift.

Copy → CTA is `24px` metric but ~`36px` optical. The CTA is an `inline-flex` with a `2.75rem` tap-target floor, so its 21px line box centres inside a 44px box and donates ~11.5px of invisible padding above the glyphs. Anything set here must be read net of that. At `36px` it measured 47px optical and the CTA had visibly drifted off the copy.

One measure at every width is load-bearing, not tidiness: `md:px-1` used to widen the column from 328px to 360px across the breakpoint, which pulled `21 or under` up onto line one and split the accent phrase. `.caution` is `white-space: nowrap` as well, so the phrase survives any future width.

## Brand objects

| Object | File | Behaviour |
|--------|------|-----------|
| Brush wordmark | `src/assets/vavva-mark.png` | Static. Hand-drawn, keyed to transparency, trimmed. Never animated, never recoloured. Lives in `src/`, not `public/` — a statically imported asset is already emitted to `_next/static` with a content hash, so a copy in `public/` ships the same 42KB again at an uncacheable URL. |
| Aurora | `src/components/dia/DiaGradient.tsx` | SVG bars + CSS blur, rises on mount. `44dvh`, dropping to `26dvh` under 620px tall. Static — it does not cycle, and it is the only object in the bottom zone. |
| Access gate | `src/components/gate/AccessGate.tsx` | The door. One field, no label. Falls back to an Instagram DM link when no endpoint is configured — see README. |

## Copy

```
Casa Vavva is a private members club based in New York City. You must be 21 or
under to enter.

Vavva [vaˈvˌvːa]; evokes a sense of beauty, peace, and abundance according to
ancient Greek philosophy.

request access
```

Rules: no NYU, no term dates, no event listings. The etymology stays because it
implies rather than answers.

**Overridden 2026-07-26, by the owner, deliberately.** This file used to say
"never say what it is, only what it feels like to be near," and specifically
banned "members club" on the grounds that *club* invites a licensing question.
The current copy names the thing outright. The old reasoning is recorded here
rather than deleted so the trade-off stays visible: the page is now explicit
about what the house is, and that is a decision, not a drift.

## Color

| Token | Value | Use |
|-------|--------|-----|
| `--paper` | `#E8E8E8` | page |
| `--ink` | `rgba(0,0,0,0.90)` | primary line |
| `--mute` | `rgba(0,0,0,0.45)` | etymology line, resting CTA |
| `--red` | `#B32622` | sampled from the brush mark — age rule, CTA hover, gate focus rule |

One accent only. No second brand colour (no Instagram purple, no gradient buttons).

## The ambient wordmark, and why it is gone

Removed 2026-07-26. `src/components/blur-glow/` — a WebGL "VAVVA" that sat fixed at the bottom of the frame and cycled five colour worlds — is deleted. Restore with `git show 213a2c9 -- src/components/blur-glow`.

It is worth recording why, because the idea will come back.

The mark was drawn at `bottom: 4dvh`, which put it 204px **below** the aurora crest, buried in the most saturated band. Its palettes all resolved to `#E8E8E8` at their light end — they were calibrated for the paper — so composited over saturated blue every world's ink measured **2.15–3.19:1** and the bloom had no paper to bloom into. It read as a dark stain, not a light.

There were only two honest fixes. Lift it onto bare paper, which meant shrinking the aurora from `44dvh` to `30dvh` because at 1280×720 there were just 34px of clear ground between the CTA and the crest and the mark is 62px tall. Or rework the composite so the mark is additive light rather than a dark mask — real shader work.

The third option won: the page has one wordmark now. That resolves the two-VAVVAs-on-one-screen problem outright, gives the aurora its full `44dvh` back, and costs nothing but an effect almost nobody could see. If it returns, it returns as light, not as ink.

## Anti-patterns

- Full-bleed sky / frosted overlay cards
- Banner-scale logo
- Dense brand essays
- Extra chrome (nav, cards, pills)
- A second accent colour
- A second VAVVA anywhere, at any scale — there is one logo, and the exemption the footer stamp used to run under is withdrawn
- A second centred object — centring is what marks the head; spend it once
