// product-grid.spec.md §10: CSS grid, 4 fixed columns × 20px gap at
// desktop, 1 column mobile. Tablet column count was never directly observed
// on the reference site ("could be 2 or 3") — 2 is used here as the
// conservative middle value, noted rather than guessed silently.

import { ProductCard } from "./ProductCard";
import packaging from "../../assets/house-pbj-packaging.png";
import crossSection from "../../assets/house-pbj-cross-section.png";

// Catalog trimmed to the one real product, 2026-08-11, at D's instruction
// ("format the shop the same sizing etc as it was before just with 1
// item"). The eight invented placeholder goods (candle, vessel, print, tote,
// scarf, notebook, tee, pin) are gone from here — preserved in git history
// (commit 448280a) if the catalog needs padding again later; not
// reintroduced speculatively.
//
// House PB&J, from the office-hours design doc at
// ~/.gstack/projects/dhilanmartin/dhilanmartin-unknown-design-20260811-210752.md.
// Price is still a placeholder — the doc's own back-of-envelope COGS is
// $2-4/unit and no retail price is locked. Real photography (rotating via
// RotatingProductImage), but the product itself stays behind
// SECONDARY_PAGES_LIVE like everything else: the doc's Day-0 gates (NYC
// permit check, an actual recipe) haven't cleared, so this being visible in
// local dev is not the same as this being ready to sell.
const PRODUCTS = [
  { name: "House PB&J", price: "$9", images: [packaging, crossSection] },
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.name} {...product} />
      ))}
    </div>
  );
}
