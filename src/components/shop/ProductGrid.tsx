// product-grid.spec.md §10: CSS grid, 4 fixed columns × 20px gap at
// desktop, 1 column mobile. Tablet column count was never directly observed
// on the reference site ("could be 2 or 3") — 2 is used here as the
// conservative middle value, noted rather than guessed silently.

import { ProductCard } from "./ProductCard";

const PRODUCT_COUNT = 8;

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-4">
      {Array.from({ length: PRODUCT_COUNT }).map((_, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
}
