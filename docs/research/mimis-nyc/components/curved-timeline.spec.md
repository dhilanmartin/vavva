# Component spec: Curved interactive timeline

Structural reference: mimis.nyc `/story`, the milestone timeline section. See `COMPONENT_INVENTORY.md` §15. This is the single most novel/custom interaction pattern found on the reference site — flagged for careful, deliberate reimplementation rather than a quick copy, and it's a genuinely heavier lift than everything else in this inventory.

## Structure
- An arc of vertical tick marks (SVG or CSS-transform-drawn), each tick representing one date/milestone, curving along a shallow horizontal arc.
- Date labels curve along the top of the arc, following the same rotation as their tick.
- One tick is "active": longer/accent-colored line, an icon at its base, and a one-line bold caption rendered beneath the entire arc (not attached to the individual tick — it's a shared caption slot below the whole component).
- Roughly 7–8 milestones observed spanning just over a year of dates on the reference site.

## Variants
- Single instance, story page only.

## States
- **Inactive tick**: thin grey line + small curved date label, no icon, no caption contribution.
- **Active tick**: accent-colored line (longer than inactive ticks), icon glyph at its base, one-line bold caption shown in the shared caption slot below the arc.

## Interactions
- **Click any tick → it becomes the active tick.** Confirmed live: clicking a date other than the initially-active one caused the arc to visually re-center/rotate so the clicked tick moved to (or stayed at) the apex position, its line became accented, and its icon+caption replaced the previous active tick's.
- Not tested: keyboard navigation, touch/swipe-drag on the arc itself, or whether there's also a scroll-linked auto-advance.

## Animations
- The re-center/rotate on click reads as a smooth transition (labels visibly slide along the arc) but exact duration/easing was **not measured** this session — profile it directly if precise timing matters before building an equivalent.

## Layout measurements
- Arc spans roughly the content-column width at desktop; not measured to the pixel.
- Not measured at mobile — the component's viability at narrow widths (does the arc compress, go scrollable, or restack to a vertical list?) is unverified and should be checked before committing to this pattern for Vavva.

## Content fields (repeat per milestone)
- Date label: `[VAVVA COPY TBD]`
- Icon: `[VAVVA ASSET TBD]`
- Caption (shown only when active): `[VAVVA COPY TBD]`

## Recommendation
This is a substantial custom-build (arc math, rotation-on-click state, curved text positioning) relative to everything else in this inventory, which is mostly standard flex/grid patterns. Treat it as an explicit "build this or skip it" decision for D at Phase 3 planning — don't default to building it just because it's in the reference site. A simpler horizontal-scroll or accordion timeline would carry the same content structure at a fraction of the implementation cost, if Vavva even needs a timeline/history page at all.
