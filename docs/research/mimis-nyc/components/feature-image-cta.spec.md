# Component spec: Feature image + CTA block

Structural reference: mimis.nyc home, the full-bleed dark photo section between the section-label divider and the CTA tile row. See `COMPONENT_INVENTORY.md` §4.

## Structure
Full-bleed dark photo. Centred overlay stack, top to bottom:
1. Small badge/icon glyph
2. 2-line heading
3. Circular emblem image
4. Pill button

## Variants
- Single instance, home page only.

## States
- **Scroll-in**: heading + emblem + button start at lower opacity and rise to full opacity as the section scrolls into the viewport. Confirmed by comparing two screenshots at different scroll timings over the same section — not a hover effect (cursor position didn't correlate).

## Responsive behavior
- Not cross-checked at mobile this session for this specific block — assume same centred-stack layout holds (it's already single-column), verify before building.

## Interactions
- Pill button is a standard link-through to the shop-equivalent page.

## Animations
- Opacity fade tied to scroll position. No exact threshold/duration/easing captured — measure before implementing if precise timing matters, or substitute Vavva's existing `intro-js`/`intro-go` blur-rise pattern (already defined in DESIGN.md) rather than inventing a new one.

## Content fields
- Background photo: `[VAVVA ASSET TBD]`
- Badge/icon glyph: `[VAVVA ASSET TBD]` — or reuse an existing Vavva mark element if one fits; don't invent a new brand glyph without flagging it.
- 2-line heading: `[VAVVA COPY TBD]`
- Circular emblem image: `[VAVVA ASSET TBD]`
- Pill button label: `[VAVVA COPY TBD]`
- Pill button destination: `[VAVVA COPY TBD]` — decide what this links to in Vavva's IA.
