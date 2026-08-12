// product-grid.spec.md §9: image (≈5:4) → name (uppercase, centred, sans) →
// price. No border/shadow/chrome on the image, and deliberately **no hover
// state** — confirmed on the reference site by direct hover test. Do not
// add a hover treatment to this card. RotatingProductImage's auto-cycle is
// timer-driven, not hover-driven, so it doesn't violate that rule.

import type { StaticImageData } from "next/image";
import { AssetPlaceholder } from "@/components/placeholder/AssetPlaceholder";
import { RotatingProductImage } from "./RotatingProductImage";

export function ProductCard({
  name,
  price,
  images,
}: {
  name: string;
  price: string;
  images?: StaticImageData[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {images && images.length > 0 ? (
        <RotatingProductImage images={images} alt={name} />
      ) : (
        <AssetPlaceholder tone="light" className="aspect-[5/4] w-full" />
      )}
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[var(--ink)]">
          {name}
        </span>
        <span className="text-[13px] text-[var(--mute)]">{price}</span>
      </div>
    </div>
  );
}
