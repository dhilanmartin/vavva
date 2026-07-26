# DESIGN.md — Casa Vavva

Updated 2026-07-26.

## Direction

Minimal craft on `#E8E8E8`. The brush wordmark is the only fixed brand object; everything else is light. The Dia aurora rises from the floor on mount, and the ambient WebGL “VAVVA” sits inside that light as a signature at the bottom of the frame. Age rule in the house red. One CTA.

## Layout

- Canvas: `#E8E8E8`
- Column: `max-w-[368px]`, top-anchored (`3.25rem` mobile / `5.875rem` desktop), `px-5` mobile / `px-1` desktop
- Mark: centred, `136px` mobile / `152px` desktop — signature scale, never banner scale
- Copy and CTA: ragged-left on the column's left edge
- Type: Inter · 15px · medium · tracking `-0.015em` · line-height `1.4` · `text-wrap: pretty`
- Motion: staggered blur-rise (`intro-js` / `intro-go`), 0.5s, 0.08s stagger

## Brand objects

| Object | File | Behaviour |
|--------|------|-----------|
| Brush wordmark | `public/brand/vavva-mark.png` | Static. Hand-drawn, keyed to transparency, trimmed. Never animated, never recoloured. |
| Ambient wordmark | `src/components/blur-glow/` | WebGL. Bottom-fixed and centred, inside the aurora, at trademark scale (`280 × ~70`). Cycles five colour worlds: 3.77s held + 1.3s crossfade = **5.07s per world, 25.4s per loop**. **Rank it below the brush mark by scaling the whole stage, never the word alone** — the bloom's energy is tied to the word/canvas ratio, so a small word in a large canvas bleeds out to an invisible ghost. |
| Aurora | `src/components/dia/DiaGradient.tsx` | SVG bars + CSS blur, rises on mount. `44dvh`, dropping to `26dvh` under 620px tall. |
| Access gate | `src/components/gate/AccessGate.tsx` | The door. One field, no label. Falls back to an Instagram DM link when no endpoint is configured — see README. |

## Copy

```
A private house in New York City. You must be 21 or under to enter.

Vavva [vaˈvˌvːa]; beauty, peace, and abundance — ancient Greek.

request access
```

Rules: never say what it is, only what it feels like to be near. No "members
club" — it explains, and "club" is the word that invites a licensing question we
have no reason to invite. No NYU, no term dates, no event listings. The etymology
stays because it implies rather than answers.

## Color

| Token | Value | Use |
|-------|--------|-----|
| `--paper` | `#E8E8E8` | page |
| `--ink` | `rgba(0,0,0,0.90)` | primary line |
| `--mute` | `rgba(0,0,0,0.45)` | etymology line, resting CTA |
| `--red` | `#B32622` | sampled from the brush mark — age rule, CTA hover, gate focus rule |

One accent only. No second brand colour (no Instagram purple, no gradient buttons).

## Colour worlds (ambient mark)

House Red → Blue Hour → Graphite → Candlelight → Last Hour. Each resolves to the paper at its light end; Graphite is the grey beat that keeps the cycle from reading as a rainbow.

Two rules on the order. House Red is index 0, so the brand colour is always the first frame drawn — and it is also the single still frame served under `prefers-reduced-motion`. Graphite is never last: parked at the end it made the loop-around a grey-to-red jump, the one hard cut in an otherwise continuous drift.

## Anti-patterns

- Full-bleed sky / frosted overlay cards
- Banner-scale logo
- Dense brand essays
- Extra chrome (nav, cards, pills)
- A second accent colour
- A second VAVVA at brand scale — there is one logo, and the footer stamp is an effect
