import { ProductTile } from "./ProductTile";
import trio from "../../assets/house-pbj-trio.png";

// Switched from ProductCard (photo-based) to ProductTile (case-study-block
// style, see ProductTile.tsx) 2026-08-12, matching internetlabs.co's
// portfolio-card pattern D asked for by name. ProductCard.tsx,
// RotatingProductImage.tsx, and the original two House PB&J photos are
// untouched — paused, not gone.
//
// Still one real product. `tags` (and the "Internal" categorization label
// specifically) is gone as of the same-day redesign — see ProductTile.tsx
// — and `price` is now its own field, given equal billing with `name`
// rather than folded into a pill row.
const PRODUCTS = [
  {
    wordmark: "PB&J",
    emoji: "🥪",
    name: "House PB&J",
    price: "$9",
    description:
      "A real peanut butter and jelly sandwich, rebuilt from the inside.",
    image: trio,
  },
];

// Grid, not a stacked column — 2026-08-12, later same day: D asked for the
// whole Products page to match mimis.nyc's own /shop, "the same font and
// design." Their grid is 4 fixed columns at a 20px gap (measured live at
// 1710px: 400.5px columns in a 1662px row, i.e. this site's standard 24px
// page gutter, not a bespoke width). `gap-5` is Tailwind's 20px step.
// `grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4` down-steps from
// their desktop count rather than forcing 4 cramped ~80px columns on a
// phone — mimis' own site drops to 1 column under 810px (their tablet
// step wasn't directly observed; 2 is this site's usual middle step, not
// a measured mimis fact).
//
// One card today, not sixteen: this is a genuine, structurally-correct 4-
// column grid with one populated cell, not a fake grid built for a single
// item. That's an honest state for a pre-launch catalog with one real SKU,
// the same way an empty inbox is still a real inbox — the grid is ready
// for the second product without another rebuild when it arrives, rather
// than optimizing today's layout around today's inventory count.
//
// The parent page (products/page.tsx) now owns the full 1710px page width
// directly, matching Nav/the header LED line, not a narrow centred column
// — a single product tile inside a 4-col grid needs the grid's real width
// to read as a grid rather than an arbitrarily narrow box.
export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
      {PRODUCTS.map((product) => (
        <ProductTile key={product.name} {...product} />
      ))}
    </div>
  );
}
