# Component spec: Nav

Structural reference: mimis.nyc primary navigation. Structure/measurements only — see repo `docs/research/mimis-nyc/COMPONENT_INVENTORY.md` §1 for the full reconnaissance notes.

## Structure
- Flex row, full page-gutter width (24px inset each side at desktop).
- Three zones: **left** (primary link group), **center** (logo/wordmark link home), **right** (secondary link + icon-button).
- Height: 64px at desktop.

## Variants
- **Desktop** (≥1200px, and likely tablet — unverified): all primary links rendered inline, no trigger needed.
- **Mobile** (<810px): left zone collapses to a single hamburger icon-button; primary links move into a collapsible panel.

## States
- **Default**: all links equal weight, no underline.
- **Active/current-page**: matching nav link gets an underline. No color shift.
- **Mobile menu open**: hamburger icon morphs to an "X"; panel is visible.

## Responsive behavior
- Below 810px: hamburger replaces inline links. Logo stays centered, icon-button (cart-equivalent, if Vavva has one) stays right.
- No sticky/fixed positioning confirmed either way this session — treat nav as static-in-flow unless a future check confirms otherwise.

## Interactions
- Click hamburger → icon becomes "X" → an **in-flow panel pushes page content down** (not an overlay, not a slide-from-side drawer) → links appear stacked, left-aligned, bold, uppercase, one per row.
- Click "X" (or hamburger again) → panel closes, content moves back up.

## Animations
- Panel open/close reads as a height transition. No exact duration/easing captured this session — measure before implementing if precise timing matters.

## Layout measurements
- Height: 64px.
- Page gutter: 24px each side (desktop, up to ≥1710px viewport — no centered max-width container observed).
- Link font: 16px / weight 600, sans.

## Content fields
- Primary link labels: `[VAVVA COPY TBD]` × however many top-level destinations Vavva's IA needs.
- Secondary link (mimi's used this slot for a mailto-style contact link): `[VAVVA COPY TBD]` — decide whether Vavva needs an equivalent off-page handoff link or a real route.
- Center logo: `[VAVVA ASSET TBD]` — **use the existing brush wordmark** (`src/assets/vavva-mark.png` / `VavvaMark.tsx`) per DESIGN.md; do not draw a new mark.
- Icon-button (cart-equivalent): `[VAVVA ASSET TBD]` — only include if Vavva's IA actually needs this affordance; don't add chrome for its own sake.
