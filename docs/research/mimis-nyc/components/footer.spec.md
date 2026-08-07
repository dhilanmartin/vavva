# Component spec: Footer

Structural reference: mimis.nyc footer, present on every page. See `COMPONENT_INVENTORY.md` §7.

## Structure
Thin horizontal divider rule, then a row with 3 zones: small logo/mark icon (left), secondary nav link list (center), brand wordmark text + legal link stacked (right).

## Variants
- Consistent across all pages — not conditionally filtered based on current page (the same 4 secondary links appear regardless of which page you're on).

## States
- No active/current-page state was distinctly visible in the footer link row the way it is in the primary nav (unclear if it inherits the nav's underline logic — treat as untested).

## Responsive behavior
- Desktop: full 3-zone row as described.
- Mobile (<810px, tested ~500px viewport): **secondary nav link row was not present** — footer reduced to just the logo mark + brand text + legal link. Confirm whether this is a true breakpoint behavior or a links-wrap-below-viewport artifact before relying on it.

## Interactions
- Standard link-throughs, no special behavior.

## Animations
- None observed.

## Content fields
- Logo/mark icon: `[VAVVA ASSET TBD]` — reuse the existing brush wordmark per DESIGN.md; do not draw a second mark (DESIGN.md's Anti-patterns explicitly bans "a second VAVVA anywhere, at any scale," including a footer stamp — this needs D's explicit sign-off if a footer even carries a mark at all).
- Secondary link list: `[VAVVA COPY TBD]` × N, matching whatever IA Vavva settles on.
- Brand wordmark text: `[VAVVA COPY TBD]`
- Legal link label + destination: `[VAVVA COPY TBD]`
