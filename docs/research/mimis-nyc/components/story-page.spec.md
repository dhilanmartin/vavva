# Component spec: Story page

Structural reference: mimis.nyc `/story`. See `PAGE_TOPOLOGY.md` and `COMPONENT_INVENTORY.md` §11–14. The page's timeline component is split out separately — see `curved-timeline.spec.md`.

## Page structure
1. Nav (current-page link underlined).
2. **Lead block** (see below).
3. **Photo triptych** (see below).
4. Section heading — centred serif, names the "why" section of the page.
5. **Icon + text block**, repeated 3×.
6. Second **photo triptych** (same component, different content).
7. **Curved interactive timeline** — see `curved-timeline.spec.md`.
8. A line-art illustration (same style as the Locations page cards) as a closing visual.
9. Footer.

This is the longest, most content-heavy page type in the reference site — treat it as optional/deferred for Vavva unless D specifically wants a long-form brand story page.

---

## Sub-component: Lead block
- **Structure**: centred single column. One bold lead sentence, immediately followed (same block, no visible gap) by one regular-weight paragraph. Both set in the serif family — this site does not switch to sans for body copy.
- **Variants**: appears once, top of page.
- **Responsive**: stays centred/single-column at both breakpoints tested.
- **Content fields**: lead sentence `[VAVVA COPY TBD]`, paragraph `[VAVVA COPY TBD]`.

## Sub-component: Photo triptych
- **Structure**: 3 equal-width images side by side, no gap-caption, no text overlay.
- **Variants**: reused twice on this page with different photo sets — same component.
- **Responsive**: not directly re-verified at mobile for this exact block; assume it either stacks to 1 column or scrolls horizontally — confirm before building.
- **Content fields**: image 1/2/3 `[VAVVA ASSET TBD]` each, ×2 instances.

## Sub-component: Icon + text block (repeating ×3)
- **Structure**: centred column, top to bottom: serif sub-heading → single outline-style icon glyph → 1–3 body paragraphs (serif).
- **Variants**: 3 instances, each with a different icon.
- **States/Interactions/Animations**: none observed — static content blocks.
- **Content fields per instance**: sub-heading `[VAVVA COPY TBD]`, icon `[VAVVA ASSET TBD]`, body paragraph(s) `[VAVVA COPY TBD]`.

## Design-system note
The serif-for-body-copy choice is a real typographic decision, not incidental — worth deciding deliberately for Vavva rather than defaulting to it, since DESIGN.md currently runs Inter for everything (statement, gloss, and IPA alike) as a considered choice about hierarchy-via-color-not-typeface.
