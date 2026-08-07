# Component spec: Newsletter band

Structural reference: mimis.nyc home, the closing dark section before the footer. See `COMPONENT_INVENTORY.md` §6.

## Structure
Full-bleed dark section. Low-contrast tiled/repeating pattern texture as background (built from a tonal, oversized repetition of a brand-shaped motif — role only, don't reuse mimi's actual pattern art). Centred, top to bottom: 2-line heading, then a single pill-shaped combined input+button (email field left, submit button right, inside one continuous pill container).

## Variants
- Single instance.

## Responsive behavior
- Same centred single-column layout at both breakpoints tested (mobile and desktop). Background texture tiles to fill whatever width is available.

## Interactions
- Standard form submit — not exercised (no data entered this session).

## Animations
- None observed on this section specifically.

## Layout measurements
- Input+button pill: full pill radius (100px scale value).

## Content fields
- Heading: `[VAVVA COPY TBD]`
- Input placeholder: `[VAVVA COPY TBD]`
- Submit button label: `[VAVVA COPY TBD]`
- Background texture motif: `[VAVVA ASSET TBD]` — if Vavva wants a textured dark band at all; could just as easily be flat `--ink` per DESIGN.md's restraint principle instead of inventing a new texture.

## Design-system note
A tiled background pattern is new surface area DESIGN.md doesn't currently have a rule for either way. Treat as an open question for D, not a default — the existing system's whole point is restraint (paper + one accent, no extra chrome).
