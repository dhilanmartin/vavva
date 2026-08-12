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
