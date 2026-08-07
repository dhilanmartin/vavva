// product-grid.spec.md §9: image (≈5:4) → name (uppercase, centred, sans) →
// price. No border/shadow/chrome on the image, and deliberately **no hover
// state** — confirmed on the reference site by direct hover test. Do not
// add a hover treatment to this card.

import { AssetPlaceholder } from "@/components/placeholder/AssetPlaceholder";

export function ProductCard({
  name,
  price,
}: {
  name: string;
  price: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <AssetPlaceholder tone="light" className="aspect-[5/4] w-full" />
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[var(--ink)]">
          {name}
        </span>
        <span className="text-[13px] text-[var(--mute)]">{price}</span>
      </div>
    </div>
  );
}
