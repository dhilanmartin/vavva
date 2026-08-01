# DESIGN.md — Casa Vavva

Updated 2026-07-31.

## Direction

Minimal craft on `#E8E8E8`. The brush wordmark is the only brand object; everything else is light. The Dia aurora rises from the floor on mount and holds the bottom of the frame alone. The city in the house red. One CTA.

**A menu, not a landing page.** The mark is centred; the copy and CTA are ragged-left beneath it. That mismatch is the design, not an oversight — a centred head over a left-set block is how a menu, a title page, or a bill of fare is set, and it is the whole reason the page reads as a house rather than a product. The mark is the only centred object on the page; nothing else may be centred, or the head stops reading as a head.

## Layout

- Canvas: `#E8E8E8`
- Column: `max-w-[248px]` / `md:max-w-[432px]`, `px-4` / `md:px-5` — **216px of measure on a phone, 392px on desktop**. Two measures, on purpose (see below). The phone column never goes fluid, so everything from 320px up renders the identical block
- Top-anchored: `3.25rem` mobile / `6rem` desktop, stepping to `9rem` above 1000px of viewport *height* — the aurora owns the bottom 44dvh, so on a tall frame the block was riding high over a dead stripe of paper
- Mark: centred in the column, `136px` mobile / `152px` desktop — signature scale, never banner scale
- Copy and CTA: ragged-left on the column's left edge

Centring the mark is done geometrically, and that is correct here rather than lazy: the asset is alpha-trimmed and its glyph extents are symmetric — ink spans x=2..1023 of 1026, midpoint 512.5 against a frame centre of 513.0. The ink *mass* is left-heavy (59.9/40.1, centroid 6.68% left of centre) because the V is the tallest and heaviest stroke, but for a word the eye tracks extents, not density; correcting to the centroid would visibly shove the mark right. If the asset is ever re-cut, re-check the extents before trusting `justify-center`.
- Type: Inter · medium · tracking `-0.015em` · `text-wrap: pretty` — statement `15px / 1.4`, gloss `13px / 1.5`
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

### Two measures, and why the old rule went

This file used to require one measure at every width. That rule is gone, knowingly, and it is the only place the page sets a different measure per breakpoint.

| | Measure | Statement | Gloss |
|---|---|---|---|
| Phone | `216px` | 2 lines, 169 / 214 — **89%** inked | 4 lines — 72% |
| Desktop (`md`) | `392px` | **1 line**, 386 — **98%** | 2 lines, 326 / 305 — 80% |

The statement is 386px set on a single line, so 392 is the width at which the whole sentence resolves at once — the strongest setting this copy can make. It is unreachable on a phone: 375px of viewport clears 343, so mobile would fall back to the same 169 / 214 pair inside a column half again too wide for it. Two measures beats one compromise that is second-best at both ends.

What the old rule protected against was real and has happened here: a widening column pulls an accent phrase up onto the previous line and splits it in half. That is why the phrase it guarded was `white-space: nowrap`. `.place` deliberately is not, because it now sits at the **end** of the sentence — at 216 it lands whole on line two, at 392 whole on the single line, verified at both. Nothing else in the copy can straddle a break. Re-check this if the copy ever puts words after the city.

### The gloss

The etymology is `13px / 1.5` against the statement's `15px / 1.4`, in `--mute`.

Shrinking it costs fill and that is the correct trade. Four lines is the floor at the phone measure regardless of size — greedy wrapping gives 209 / 186 / 163 / 70, so three lines is not reachable — which means smaller type only narrows the same four lines: 84% at 15px, 72% at 13. A gloss sitting visibly narrower than the statement reads as subordinate, which is the whole point; it is not the same defect as a short headline stranded in a wide column.

Colour is unchanged. `--mute` contrasts 4.55:1 on the paper, and WCAG asks the same 4.5:1 of 13px as of 15px, so the size drop costs nothing. Do not darken it to compensate for how much lighter small type looks — that flattens the tier back into the statement.

## Brand objects

| Object | File | Behaviour |
|--------|------|-----------|
| Brush wordmark | `src/assets/vavva-mark.png` | Static. Hand-drawn, keyed to transparency, trimmed. Never animated, never recoloured. Lives in `src/`, not `public/` — a statically imported asset is already emitted to `_next/static` with a content hash, so a copy in `public/` ships the same 42KB again at an uncacheable URL. |
| Aurora | `src/components/dia/DiaGradient.tsx` | SVG bars + CSS blur, rises on mount. `44dvh`, dropping to `26dvh` under 620px tall. Static — it does not cycle, and it is the only object in the bottom zone. |
| Access gate | `src/components/gate/AccessGate.tsx` | The door. One field, no label. Falls back to a plain Instagram profile link when no endpoint is configured — see README. One outbound URL only: no `ig.me/m` deep link, on either the resting or the send-failure path. |

## Copy

```
Casa Vavva is a creative studio based in New York City.

Vavva [vaˈvˌvːa]; evokes a sense of beauty, peace, and abundance according to
ancient Greek philosophy.

request access
```

Rules: no NYU, no term dates, no event listings. The etymology stays because it
implies rather than answers.

**The city name is the only red in the copy** (`.place`), and it is deliberately
*not* a link. Three reasons, in order of weight: a Wikipedia article about New
York is a leak off a one-page site; `.bio-link` resolved its hover to `#000`, so
a red link would have *darkened* on hover; and `.social-link` already answers in
red, so red would have meant "link" and "hover" at once. `.bio-link` had no
remaining users after this and was deleted.

**Revised 2026-07-31, by the owner.** A creative studio, not a private members
club. The club line claimed members and an address that did not exist yet; a
studio is true the moment it makes something. Two consequences that are easy to
miss:

- **"You must be 21 or under to enter" is gone.** It was the door rule of a club
  without a door. Nothing inherited its meaning — only its colour.
- **The measure moves to meet the sentence, every time the sentence changes.**
  See the comment in `src/app/page.tsx`. This copy went through three settings
  in one day — 336 for the club line, 308 for a two-city version, 216 for what
  shipped — and each move was a measurement, not a preference. Re-measure before
  editing this copy; the number in the comment is the output of that, not an
  input to it.

Los Angeles appeared in the copy briefly on 2026-07-31 and was removed the same
day, by the owner. The city is New York.

**Superseded 2026-07-26 note, kept for the trade-off.** This file once said
"never say what it is, only what it feels like to be near," and banned "members
club" on the grounds that *club* invites a licensing question. That ban was
overridden, and the licensing question has now gone away on its own — a studio
raises none. The history stays so the reasoning is visible rather than lost.

## Color

| Token | Value | Use |
|-------|--------|-----|
| `--paper` | `#E8E8E8` | page |
| `--ink` | `rgba(0,0,0,0.90)` | primary line |
| `--mute` | `rgba(0,0,0,0.45)` | etymology line, resting CTA |
| `--red` | `#B32622` | sampled from the brush mark — the city, CTA hover, gate focus rule |

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
