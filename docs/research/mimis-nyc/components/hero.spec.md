# Component spec: Hero (home)

Structural reference: mimis.nyc home hero. Structure/measurements only — see `COMPONENT_INVENTORY.md` §2.

## Structure
- One full-bleed photo, inset by the page gutter on both sides (not edge-to-edge to the viewport).
- Two short headline fragments positioned as absolute overlays at opposite corners of the image: one top-left, one bottom-right.

## Variants
- Single instance, home page only.

## States
- None observed — static image, static text overlay.

## Responsive behavior
- Corner radius on the image appears larger/more rounded on mobile than at wide desktop widths — flagged as needing re-verification, not confirmed precisely cross-breakpoint.
- Overlay text fragments hold their corner positions at both breakpoints tested (no re-flow to stacked/centered on mobile).

## Interactions
- None — no parallax, no ken-burns, no click-through region observed on the image itself.

## Animations
- None detected on load or scroll.

## Layout measurements
- Image inset: 24px from each side (desktop, at the widths tested).
- Corner radius: 24px (surface-rounding value from the site's 2-value radius scale).

## Content fields
- Full-bleed photo: `[VAVVA ASSET TBD]` — placeholder imagery until real photography exists; do not source from mimis.nyc.
- Top-left headline fragment: `[VAVVA COPY TBD]`
- Bottom-right headline fragment: `[VAVVA COPY TBD]`

## Design-system note
This split-corner-overlay hero pattern directly conflicts with DESIGN.md's current one-pager rules (no full-bleed sky, mark stays centred/signature-scale, ragged-left copy). SKILL.md's hard constraints call this an explicit, approved supersession for this test branch only — flag it again at Phase 4 sign-off, don't let it slide into `main` unexamined.
