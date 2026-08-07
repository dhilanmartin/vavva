// product-grid.spec.md §10: CSS grid, 4 fixed columns × 20px gap at
// desktop, 1 column mobile. Tablet column count was never directly observed
// on the reference site ("could be 2 or 3") — 2 is used here as the
// conservative middle value, noted rather than guessed silently.

import { ProductCard } from "./ProductCard";

const PRODUCTS = [
  { name: "Table Candle", price: "$38" },
  { name: "Ceramic Vessel", price: "$64" },
  { name: "Studio Print", price: "$48" },
  { name: "Canvas Tote", price: "$32" },
  { name: "Wool Scarf", price: "$86" },
  { name: "Bound Notebook", price: "$24" },
  { name: "Vavva Tee", price: "$42" },
  { name: "Enamel Pin", price: "$14" },
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
