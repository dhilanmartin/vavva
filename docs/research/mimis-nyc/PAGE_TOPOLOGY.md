# mimis.nyc — Page Topology

Structure-reconnaissance notes for the `clone-structure` skill (Phase 1). Structure and measurements only — no mimis.nyc copy, imagery, or brand values. See `.claude/skills/clone-structure/SKILL.md` for hard constraints.

Captured 2026-08-06 via Chrome MCP against the live site.

## Site map

Reference URL default: `https://mimis.nyc/`.

Reachable destinations, by how they're reached:

| Destination | Reached via | Route | Notes |
|---|---|---|---|
| Home | logo (centre nav), footer logo | `/` | |
| Locations | nav | `/locations` | |
| Shop | nav (labelled "Merch") | `/shop` | also linked from footer as "Merch" |
| Story | nav (labelled "Our Story") | `/story` | also linked from footer as "Our Story" |
| Contact | nav + footer | `mailto:` link | **not a page** — resolves straight to a mailto link, no `/contact` route exists |
| Gift Cards | footer only | `/gift-card` | not in the primary nav, only reachable from the footer link row |
| Privacy | footer only | `/privacy` | legal page, not inspected in depth (out of scope: no structural content worth cloning beyond "small legal-text page") |
| Cart | icon button, top-right of nav | opens a cart drawer/flow | not inspected — checkout/payment flow is explicitly out of scope per SKILL.md |

Five nav-facing destinations, of which one (Contact) is actually an email handoff rather than a page, plus one page (Gift Cards) that only exists off the footer. Worth carrying into Vavva's IA: **not every nav item has to be a route.**

## Breakpoints

Confirmed directly from the site's stylesheet media queries (`getComputedStyle`/`document.styleSheets` inspection, not visual guessing):

| Range | Queries observed |
|---|---|
| Mobile | `max-width: 809.98px` |
| Tablet | `min-width: 810px` and `max-width: 1199.98px` |
| Desktop | `min-width: 1200px` |

Verified by rendering: mobile (<810px, tested ~500px viewport) and desktop (tested ~1512–1710px viewport). Tablet range is confirmed to exist in the CSS but its rendered layout was **not directly screenshotted this session** (browser-resize tool was unreliable mid-session) — treat any tablet-specific column counts below as inferred from the mobile/desktop pair, not observed.

## Per-page topology

### Home (`/`)
1. **Nav** — persistent bar: 3 links left, logo centre, 1 link + cart icon right (desktop). Collapses to hamburger + centered logo + cart icon on mobile.
2. **Hero** — full-bleed photo (inset by the page gutter, not edge-to-edge), two short headline fragments overlaid at opposite corners (top-left / bottom-right).
3. **Section label** — centred, single-line serif divider heading between hero and next block.
4. **Feature image + CTA block** — full-bleed dark photo, centred: small badge icon, 2-line heading, circular emblem, pill button. Content fades in on scroll-into-view.
5. **CTA tile row** — 3 equal dark rounded-rect tiles, each: label + sublabel (left) + circular icon badge (right). Stacks to 1 column on mobile.
6. **Newsletter band** — full-bleed dark section, repeating tonal wordmark pattern as background texture, centred heading + email input + submit button, pill-shaped combined field.
7. **Footer** — thin, divider rule above; small logo mark bottom-left, secondary nav link row centre, brand name + legal link bottom-right. Reduced further on mobile (nav link row not present at the narrow width tested).

### Locations (`/locations`)
1. Nav (identical component, "Locations" shows active/underline state).
2. Page title — centred serif H1 ("Locations").
3. **Repeating location card** — not alternating: illustration (left) + text block (right) for every entry, same side every time. Text block: name (serif heading) → address (2 lines) → hours (1 line). Two entries observed; pattern is a simple vertical stack, no grid/carousel.
4. Footer (same component as home).

### Shop (`/shop`)
1. Nav ("Merch" active/underline).
2. Page title — centred serif H1.
3. **Product grid** — 4 columns × N rows on desktop (373px cards, 20px gap, image aspect ~373:300 ≈ 5:4), collapses to **1 column** on mobile. Tablet column count not directly observed. 16 product cards counted. Card = image + name (uppercase, centred) + price, stacked. No hover-reveal state on cards (static — no image swap, no overlay CTA on hover).
4. Footer.

### Story (`/story`)
Longest page, several distinct stacked sections:
1. Nav ("Our Story" active/underline).
2. **Lead block** — centred single column: one bold lead sentence + 1 body paragraph, serif/display type.
3. **Photo triptych** — 3 equal-width images in a row.
4. **Section heading** ("Why Mimi's" equivalent) — centred serif.
5. **Repeating icon+text block × 3** — centred column: sub-heading (serif) → single-glyph outline icon → 1–3 body paragraphs. Repeats three times for three sub-topics.
6. Second photo triptych (same component as #3).
7. **Curved interactive timeline** — an arced horizontal rail of tick marks with date labels running along the curve; one "active" milestone is emphasised (accent-coloured marker, icon, one-line bold caption) while the rest show only a date label. **Click-driven**: clicking any date tick recentres the arc so that tick becomes the new active/emphasised milestone (confirmed by direct interaction — clicking a different date shifted the highlighted point and its caption). Roughly 7–8 milestones across the full timeline.
8. A line-art building illustration (same illustration style as the Locations page cards) sits below the timeline as a closing visual.
9. Footer.

### Gift Cards (`/gift-card`, footer-linked only)
This is a functional purchase form; structure only, since checkout/payment is out of scope:
1. Nav (no active-state link, since it isn't in primary nav).
2. Card-art preview — a dark card-shaped visual with a glow border, centred.
3. **Segmented tab control** — 2 tabs ("buy" / "reload"), filled-vs-outline pill styling for active/inactive.
4. **Amount pill selector** — 4 fixed-amount pills + 1 "custom" pill, single row, filled-black for selected state.
5. Form: 2-column field row (sender name/email) → checkbox ("send to myself") → 2-column field row (recipient name/email) → full-width message textarea.
6. **Second segmented tab control** — send-timing (instant vs. scheduled).
7. reCAPTCHA badge (third-party, not a structural element to replicate).
8. Footer.

### Contact
No dedicated page — both nav and footer "Contact" links are `mailto:` links. Nothing to map structurally beyond "contact resolves to an email handoff, not a page."

## Structural cross-page patterns

- **Nav active-state**: current page's nav link (and its footer counterpart, when present) gets an underline — no colour change.
- **Footer is a fixed component**: same 4 secondary links (equivalent of "Our Story / Gift Cards / Merch / Contact") regardless of which page you're on — it isn't conditionally filtered per current page.
- **Page titles**: every non-home page opens with a centred serif H1 naming the page, directly under the nav.
- **Illustration motif**: the same line-art building illustration style recurs on both the Locations cards and the Story page closing visual — one illustration "voice" reused across pages rather than photography everywhere.
