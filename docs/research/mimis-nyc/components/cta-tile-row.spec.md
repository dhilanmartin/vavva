# Component spec: CTA tile row

Structural reference: mimis.nyc home, the 3-tile row directly under the feature image + CTA block. See `COMPONENT_INVENTORY.md` §5.

## Structure
Row of 3 equal-width dark rounded-rect tiles. Each tile: 2-line text block (label + smaller sublabel) on the left, circular icon badge on the right.

## Variants
- 3 tiles, each with a different icon + destination. Count is content-driven, not structurally fixed at exactly 3 — but 3 is what was observed.

## States
- Default: icon badge circle filled dark (matches tile bg family).
- **Possible idle animation**: one tile's icon badge was seen with an accent-colored fill in one screenshot and a dark fill in another, at the same scroll position, cursor not over it — reads as either a one-shot intro animation or a slow idle pulse/loop. Not conclusively characterized this session — confirm behavior before copying it into a build; don't assume it's a hover state.

## Responsive behavior
- Desktop: 3 columns, equal width, single row.
- Mobile (<810px): stacks to **1 column**, full-width rows, same tile styling, stacked vertically with a visible gap between tiles.

## Interactions
- Each tile is a link-through (whole tile clickable, standard link semantics).

## Animations
- See "Possible idle animation" above — not fully characterized, don't replicate blindly.

## Layout measurements
- Border radius: 24px (surface-rounding value).
- Fill: near-black / dark-neutral (color role only — see DESIGN.md for Vavva's actual palette; do not use mimis.nyc's literal color values).

## Content fields
- Tile 1: label `[VAVVA COPY TBD]`, sublabel `[VAVVA COPY TBD]`, icon `[VAVVA ASSET TBD]`, destination `[VAVVA COPY TBD]`
- Tile 2: label `[VAVVA COPY TBD]`, sublabel `[VAVVA COPY TBD]`, icon `[VAVVA ASSET TBD]`, destination `[VAVVA COPY TBD]`
- Tile 3: label `[VAVVA COPY TBD]`, sublabel `[VAVVA COPY TBD]`, icon `[VAVVA ASSET TBD]`, destination `[VAVVA COPY TBD]`

## Design-system note
This is straightforward "chrome" (cards/pills) that DESIGN.md's Anti-patterns section currently bans outright. Confirmed by SKILL.md as an approved supersession for this test branch — but it's exactly the kind of thing that needs the Anti-patterns rewrite pass called out in Phase 4 before anything here ships past the test branch.
