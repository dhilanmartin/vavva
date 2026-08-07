# Component spec: Locations page

Structural reference: mimis.nyc `/locations`. See `PAGE_TOPOLOGY.md` and `COMPONENT_INVENTORY.md` §8.

## Page structure
1. Nav (see `nav.spec.md`), current-page link underlined.
2. Page title: centred serif H1.
3. Repeating **location card**: illustration (left, ~176×246 at desktop) + text block (right): name (serif heading) → address (2 lines) → hours (1 line). Image-left/text-right for every entry — not alternating/zigzag.
4. Footer (see `footer.spec.md`).

## Variants
- Card content varies per location; visual treatment is identical across cards (no "flagship" vs. "standard" variant observed).

## States
- None — static list, no filter/sort/map-toggle UI observed.

## Responsive behavior
- Desktop: image-left/text-right, side by side.
- Mobile: stacks to image-above-text, single column, same content order.

## Interactions
- None beyond standard nav/footer links — no click-to-expand, no embedded map, no "get directions" button observed within the card itself.

## Animations
- None observed.

## Content fields (repeat per location)
- Illustration: `[VAVVA ASSET TBD]` — if Vavva wants a per-location illustration motif at all; this is a real content decision, not a structural default.
- Location name: `[VAVVA COPY TBD]`
- Address (2 lines): `[VAVVA COPY TBD]`
- Hours: `[VAVVA COPY TBD]`
- Page title: `[VAVVA COPY TBD]`

## Open question for D
Does Vavva's IA need a Locations page at all, or does this pattern only make sense if there's more than one physical location to list? Flag before building — don't build a one-item "locations" page just because the reference site has this route.
