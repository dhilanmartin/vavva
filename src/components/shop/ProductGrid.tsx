import { ProductTile } from "./ProductTile";
import trio from "../../assets/house-pbj-trio.png";

// Switched from ProductCard (photo-based) to ProductTile (case-study-block
// style, see ProductTile.tsx) 2026-08-12, matching internetlabs.co's
// portfolio-card pattern D asked for by name. ProductCard.tsx,
// RotatingProductImage.tsx, and the original two House PB&J photos are
// untouched — paused, not gone.
//
// Still one real product. Price folded into the tag row as a pill, same as
// the reference's own tag pattern (Internal/External + category) extended
// by one — their cards don't show price at all, this one still needs to
// since Vavva actually sells the thing (eventually).
const PRODUCTS = [
  {
    wordmark: "PB&J",
    emoji: "🥪",
    name: "House PB&J",
    description:
      "A real peanut butter and jelly sandwich, rebuilt from the inside.",
    tags: ["Internal", "Food", "$9"],
    image: trio,
  },
];

// No .mimi-measure here — the parent page (products/page.tsx) now owns the
// width constraint directly (560px, sized against the internetlabs.co
// reference), not Story's borrowed 716px column.
export function ProductGrid() {
  return (
    <div className="flex flex-col gap-10">
      {PRODUCTS.map((product) => (
        <ProductTile key={product.name} {...product} />
      ))}
    </div>
  );
}
