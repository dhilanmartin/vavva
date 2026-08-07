# mimis.nyc — Component Inventory

Structure-reconnaissance notes for the `clone-structure` skill (Phase 1). Structure and measurements only — no mimis.nyc copy, imagery, or brand values. See `.claude/skills/clone-structure/SKILL.md` for hard constraints.

Captured 2026-08-06 via Chrome MCP against the live site (built on Framer — class names like `framer-*` and breakpoints at 810px/1200px are Framer's defaults, not something worth cloning literally).

## Layout grid (measured via `getComputedStyle`)

- Page gutter: **24px** each side at desktop widths up to at least 1710px viewport (no fixed max-width container observed at that width — content tracks the full viewport minus the 24px gutter, not a centered max-width column). Hero image and nav both sit flush at `x = 24px` from viewport edge.
- Secondary inset padding of **36px** seen on some nested content wrappers.
- Product grid cards: **373px** fixed column width, **20px** gap, 4 columns at desktop.
- Breakpoints (from stylesheet media queries): mobile `<810px`, tablet `810–1199.98px`, desktop `≥1200px`.

## Spacing scale (sampled paddings/margins/gaps across ~300 elements)

Padding/margin values observed: `10px, 12px, 20px, 24px, 36px, 48px`.
Gap values observed: `4px, 6px, 10px, 12px, 16px, 20px, 24px, 28px, 40px, 64px, 65px`.

Reads as a loose 4px-multiple system rather than a strict 8pt grid — mixes 10/12/20/28/65 alongside the cleaner 24/40/48/64. Not a tightly disciplined scale; don't over-fit to it.

## Type scale

| Role | Size | Weight | Line-height | Family (role, not literal font) | Notes |
|---|---|---|---|---|---|
| H1 / page & hero headings | 48px | 400 | 56px (1.17) | serif display face | letter-spacing ≈ `-0.02em` |
| Nav links | 16px | 600 | — | sans | uppercase in markup for some, styled uppercase via CSS for others |
| Pill button label | 12px | — | — | sans | small, wide letter-spacing, uppercase |
| Body/paragraph (story lead + section copy) | not pinned exactly; visually ~18–20px | 400 | generous, multi-line-friendly | serif (same family as headings — this site does **not** switch to a sans body face) | |

Two-typeface system overall: one serif used for both display headings *and* body/paragraph copy, one sans used for UI chrome (nav, buttons, labels, prices). That's a notable structural choice — most sites split "serif for display, sans for body"; this one keeps serif all the way into paragraphs and reserves sans strictly for interface text.

## Border radius / shape scale

- **100px** (full pill) — all buttons: nav-adjacent CTAs, gift-card amount selector, segmented tab controls, newsletter submit.
- **24px** — larger surface rounding: hero image corners (mobile), CTA tiles, gift-card preview card.

Two radii total, not a graduated scale — a "pill for interactive, one soft corner for surfaces" system.

## Component list

### 1. Nav
- **Structure**: flex row, logo as a link in the true center, primary links left, secondary link + cart icon-button right.
- **Variants**: desktop (all links inline, horizontal) vs. mobile (hamburger icon left, logo center, cart icon right — primary links hidden until opened).
- **States**: default; **active/current-page** (underline on the matching link, no color change); mobile-menu-open (see Interactions).
- **Responsive behavior**: collapses at the mobile breakpoint (<810px) from an inline link row to a hamburger trigger.
- **Interactions**: mobile hamburger click → icon **morphs to an "X" close glyph** and an **in-flow panel pushes the page content down** (vertical accordion reveal, links stacked left-aligned bold uppercase) — this is not an overlay/drawer, it displaces layout.
- **Animations**: not timed/measured this session; the panel open/close reads as a simple height transition, no easing values captured.

### 2. Hero (home only)
- **Structure**: single full-bleed photo (inset by the page gutter — not edge-to-edge), two short headline fragments positioned as absolute overlays at opposite corners of the image (top-left, bottom-right).
- **Variants**: none — single hero, home page only.
- **Responsive behavior**: image gets rounded corners on mobile (24px radius) vs. square-ish corners at wider desktop widths (needs re-verification — corner radius shift wasn't cross-checked precisely between breakpoints).
- **Interactions/Animations**: none observed (static image, static overlay text — no ken-burns/parallax detected on scroll).

### 3. Section-label divider
- **Structure**: single centred line of serif text acting as a divider between two full-bleed sections. No icon, no button.
- **Variants**: one, home page only (between hero and the feature block).

### 4. Feature image + CTA block
- **Structure**: full-bleed dark photo; centred overlay stack of (top→bottom): small badge/icon glyph, 2-line heading, circular emblem image, pill button.
- **States**: content (heading + emblem + button) starts **lower-opacity and rises to full opacity** as the section scrolls into view — a scroll-triggered reveal, not a hover state. Confirmed by re-scrolling: the same section showed partial vs. full opacity depending on scroll position/timing, not cursor position.
- **Interactions**: pill button is a standard link-through (to the shop page).

### 5. CTA tile row
- **Structure**: 3 equal-width dark rounded-rect tiles in a row, each: 2-line text block (label + smaller sublabel) on the left, circular icon badge on the right.
- **Variants**: 3 tiles, one icon each (all different).
- **States**: one tile's icon-badge circle was observed transitioning from a **dark fill to an accent-colored fill** between two consecutive scroll-position screenshots — reads as an idle attention-drawing loop/pulse on that badge, not a hover effect (cursor wasn't over it). Worth flagging for Vavva's build as "confirm before copying — might be a one-shot intro animation rather than a loop."
- **Responsive behavior**: stacks to **1 column** (full-width rows) on mobile, same tile styling.

### 6. Newsletter band
- **Structure**: full-bleed dark section, tiled/repeating wordmark-shaped pattern as a low-contrast background texture, centred 2-line heading above a combined pill-shaped input+button (email field left, submit button right, both inside one pill container).
- **Responsive behavior**: same single-column centred layout at both breakpoints tested; texture pattern tiles to fill whatever width.
- **Interactions**: standard form submit (not exercised — no data entered).

### 7. Footer
- **Structure**: thin horizontal divider rule, then a row: small logo mark (left) · secondary nav link list (center) · brand wordmark text + legal link, stacked (right).
- **Variants**: consistent across all pages (not page-conditional) — always shows the same 4 secondary links regardless of current page. **Reduced on mobile**: at the narrow width tested, the secondary nav link row was not present, leaving just the logo mark + brand text + legal link.

### 8. Location card (repeating)
- **Structure**: illustration (fixed-ish size, ~176×246 at desktop) + text block: name (serif heading) → address (2 lines) → hours (1 line). Image-left/text-right for every card — not alternating.
- **Variants**: only content varies (2 instances observed); no visual variant switch.
- **Responsive behavior**: mobile stacks image above text (single column), same content order.

### 9. Product card
- **Structure**: image (aspect ≈ 5:4) → name (uppercase, centred, sans) → price (centred, sans), no border/shadow/card-chrome around the image itself.
- **States**: **no hover state** — confirmed by hovering directly over a card; no image swap, no overlay "quick add," no scale/shadow change. Deliberately minimal/static.
- **Responsive behavior**: part of the product grid (see below); card itself doesn't change shape across breakpoints, just column count.

### 10. Product grid
- **Structure**: CSS grid, 4 equal fixed-width columns (373px) × 20px gap at desktop; single column at mobile. Tablet column count not directly observed (breakpoint exists in CSS at 810–1199.98px, but not screenshotted).
- **Variants**: one — the shop page.

### 11. Page title heading
- **Structure**: centred serif H1, sits directly below the nav, above the page's first content section. Used identically on Locations, Shop, and (in spirit) Story.

### 12. Story lead block
- **Structure**: centred single-column text block — one bold lead sentence immediately followed (same block, no gap) by 1 regular-weight paragraph, both in the serif family.
- **Variants**: story page only, appears once at the top of the page.

### 13. Photo triptych
- **Structure**: 3 equal-width images side by side, no gap-caption, no text overlay. Appears twice on the Story page (different photo sets, identical component).

### 14. Icon + text block (repeating ×3)
- **Structure**: centred column — serif sub-heading → single outline-style icon glyph (heart, strawberry, two-people, one per instance) → 1–3 body paragraphs (serif).
- **Variants**: 3 instances on the Story page, differing only by icon + copy.

### 15. Curved interactive timeline
- **Structure**: an SVG/CSS-drawn **arc** of vertical tick marks, each representing a date, with date labels curving along the top of the arc. One tick is the "active" one: taller/accented line, an icon at its base, and a one-line bold caption beneath the whole arc.
- **States**: default (inactive ticks: thin grey line + small date label) vs. **active** (accent-colored line, icon, caption shown).
- **Interactions**: **click any tick to make it active** — confirmed live: clicking a different date tick re-centred the arc's rotation so the clicked tick became the new apex/active point, with its own icon + caption swapping in. This is a genuine click-driven state machine, not decorative.
- **Variants**: ~7–8 milestones total observed spanning roughly a year plus of dates.
- Distinctive enough that it's worth flagging as the single most novel interaction pattern on the site — nothing else on mimis.nyc has this kind of custom interactive component.

### 16. Gift-card composer (functional form — structure only, checkout flow itself out of scope)
- **Card-art preview**: dark card-shaped visual with a glow/gradient border, centred, purely decorative preview of the physical/digital card.
- **Segmented tab control** (×2 instances: buy-vs-reload, instant-vs-scheduled): 2 tabs in a pill-bordered container, active tab filled black, inactive tab outline-only.
- **Amount pill selector**: row of 5 pills (4 fixed amounts + "custom"), same filled/outline active-state pattern as the segmented tabs.
- **Form fields**: 2-column paired rows (name/email, recipient name/email) at desktop, presumably stacking to 1 column on mobile (not directly verified on this page). Plain-border rectangular inputs (not pill-shaped — inputs and buttons use different corner treatments).
- **Checkbox**: square, unfilled by default, standard label-right pattern.
- **Textarea**: full-width, multi-line, same border treatment as the text inputs.

## Buttons — variant summary

| Variant | Shape | Fill | Used for |
|---|---|---|---|
| Primary pill | 100px radius | filled black, white label | "shop merch," gift-card submit-adjacent actions |
| Segmented tab (active) | 100px radius, grouped | filled black | gift-card buy/reload, instant/scheduled |
| Segmented tab (inactive) | 100px radius, grouped | outline only, black label | the non-selected half of the same control |
| Dark CTA tile | 24px radius rect | filled near-black | the 3-item CTA row |
| Icon-only button | circle | filled light-neutral (nav) | cart trigger |

## Icons
No named icon library detected in a way that's inspectable from the outside (Framer typically inlines SVGs); icons observed are all simple single-glyph outline style (heart, strawberry/fruit, two-people/handshake-adjacent, gift box, briefcase/people, spotify glyph, hamburger/X, cart, flower/emblem badge). Treat as "outline SVG glyphs, ~24–40px, single-color, matches ink color of whatever section they sit in (white on dark sections, black on light)" — a structural role, not a specific library to import.
