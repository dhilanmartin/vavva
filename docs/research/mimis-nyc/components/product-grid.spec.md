# Component spec: Product grid + product card (Shop page)

Structural reference: mimis.nyc `/shop`. See `PAGE_TOPOLOGY.md` and `COMPONENT_INVENTORY.md` §9–10.

## Page structure
1. Nav (current-page link underlined).
2. Page title: centred serif H1.
3. Product grid.
4. Footer.

## Grid structure
- CSS grid, 4 equal fixed-width columns (373px) × 20px gap at desktop.
- 16 cards observed on the reference site (content-driven count, not a structural ceiling).

## Card structure
- Image (aspect ≈ 5:4) → name (uppercase, centred, sans) → price (centred, sans). No border/shadow/chrome framing the image.

## Variants
- One card layout, no featured/large-card variant observed.

## States
- **No hover state on cards** — confirmed by direct hover test: no image swap, no overlay "quick add" button, no scale/shadow change. This is a deliberately static, minimal card.

## Responsive behavior
- Desktop (≥1200px): 4 columns.
- Mobile (<810px): 1 column, full width.
- Tablet (810–1199.98px): **not directly observed this session** — breakpoint exists in the CSS but wasn't screenshotted. Don't assume 2-column without checking; could be 2 or 3.

## Interactions
- Card is presumably a link-through to a product detail/purchase flow — not exercised (checkout/payment flow is out of scope per SKILL.md).

## Animations
- None observed (consistent with "no hover state" above).

## Content fields (repeat per product)
- Image: `[VAVVA ASSET TBD]`
- Name: `[VAVVA COPY TBD]`
- Price: `[VAVVA COPY TBD]`
- Page title: `[VAVVA COPY TBD]`

## Open question for D
Does Vavva sell physical merch/product at all? This entire page type only makes sense if there's a real catalog behind it — flag before building rather than scaffolding an empty shop.
