# Plan 002: House PB&J — first real product in the Shop catalog

Written 2026-08-11. Source: /office-hours design session, doc archived at
`~/.gstack/projects/dhilanmartin/dhilanmartin-unknown-design-20260811-210752.md`
(APPROVED). This file exists so the product context survives inside the repo
itself, not only in that external doc.

## What this is

Casa Vavva's flagship owned product: a protein-forward remake of the
Uncrustable — a real peanut butter and jelly sandwich, target ~20g protein /
~200 cal. Explicitly not "another protein bar or supplement" — the thesis is
reinventing a beloved format, not adding to the fitness-snack aisle.

This is not a studio-for-hire offering. Prismarine (separate repo) is the
studio brand. Casa Vavva is the product/retail brand; this sandwich is its
first SKU.

## Current status: placeholder, not live

- `src/components/shop/ProductGrid.tsx` — "House PB&J" ($9, placeholder
  price) added to the invented `PRODUCTS` catalog alongside the existing
  fake goods (candle, tote, etc.). Same convention: "nothing here is a
  commitment."
- Image slot still renders `AssetPlaceholder` — no real product photo yet.
- The whole Shop page (and Locations, and Our Story) is gated off site-wide
  by `SECONDARY_PAGES_LIVE = false` in `src/lib/site.ts`, per D's 2026-08-07
  instruction to disable every page but the home page. **This flag is
  all-or-nothing** — flipping it to `true` reopens Locations and Our Story
  too, not just Shop. There is currently no per-route version of this gate.

## Central open problem (not yet solved)

Standard PB&J macros run roughly 390 cal / 13g protein — over on calories,
under on protein against the ~200/20g target. Hitting the target requires
specialty inputs (protein bread, isolate-boosted or defatted peanut butter,
reduced-sugar jam) — exactly the engineered, supplement-adjacent formulation
this product is trying to avoid reading as. Whether the macros can be hit
without the product tasting or reading like a fitness product is untested.
This is a kitchen R&D problem, not a code problem — nothing in this repo
blocks on it, but the product copy/positioning eventually will.

## Competitive context (checked 2026-08-11, not assumed)

Not a blue-ocean category. J.M. Smucker Co. (Uncrustables' own maker)
shipped a "Higher Protein" line in October 2025, 12g protein, national
frozen distribution. Jams (Walmart, 10g protein, real fruit), Welch's (12g,
4g added sugar), and Clean Eatz Kitchen (12g) are all in this space. None
reach the ~20g/200cal target — that gap is the remaining wedge, contingent
on solving the macro problem above without losing the "real food" framing.

## Business gates — outstanding, not code-blocking

These do not block anything in this repo, but they block whether this
product should ever go live for real:
1. NY/NYC cottage-food and home-processor permit rules for a perishable
   filled sandwich sold to strangers — unresearched as of this writing.
   Treat as unresolved until confirmed.
2. An actual recipe. Zero prototypes made, zero people fed, as of this
   writing.
3. Real pricing — the $9 in `ProductGrid.tsx` is a placeholder against a
   rough $2-4/unit COGS estimate, not a set price.

If asked to "make the shop live" or "ship this for real," these three are
the checklist, not architecture decisions in this codebase.

## Product photography — prompts ready, no images generated yet

Two ChatGPT/DALL-E image-gen prompts were written against this repo's actual
`DESIGN.md` tokens (`#E8E8E8` paper, `#B32622` red accent, no second color,
no chrome/shadows, no logo in-frame) and deliberately steered away from
gym/supplement visual language:

**Packaging shot (5:4, for the shop grid card):**
> Minimal product photography of a wrapped sandwich, shot from directly
> above on a flat matte background in solid color #E8E8E8 (a soft
> paper-grey, not white). The sandwich is wrapped in plain unbleached kraft
> paper, folded simply, no printed logo or label visible on the paper
> itself. A single thin strand of deep red twine (#B32622) is tied once
> around the wrap — the only color accent in the frame, everything else is
> grey, cream, and the natural tan of the paper. Soft, even, shadowless
> studio lighting — no visible shadow beneath the object, no reflections, no
> props, no surface texture, no second color anywhere. Extremely restrained,
> architectural, editorial food photography — closer to a museum object
> photograph than a food ad. Nothing overlapping the frame edges. Square-ish
> crop, generous negative space around the object, centered. No text, no
> logo, no watermark.

**Cross-section shot (optional, detail/story use):**
> Same treatment: flat #E8E8E8 background, shadowless even studio lighting,
> no props, no second color except a small accent of deep red #B32622 used
> once (a folded corner of paper or a single thread, not the food itself).
> Subject is a sandwich cut in half and stood on its cut edge so the layers
> are visible — bread, a visible protein-forward peanut butter, real fruit
> jam — photographed plainly and honestly, not styled like a supplement ad:
> no dramatic drip, no neon, no gym iconography, no motion blur, no dark
> moody lighting. Should read as real food photographed with restraint, not
> a fitness product. Centered, generous negative space, no text or logo.

Once a real image exists: replace the `AssetPlaceholder` for the "House
PB&J" entry in `ProductGrid.tsx` — that card is currently the only one in
the grid that has a real product behind it, so it's the one worth wiring to
a real asset first, ahead of the still-fully-invented goods around it.

## Out of scope for this plan

Flipping `SECONDARY_PAGES_LIVE`, reopening Locations/Our Story, real pricing,
recipe development, permit research. This plan documents the product and
prepares the code path; it does not launch anything.
