// gift-card-page.spec.md: dark card-shaped visual with a glow/gradient
// border, centred, purely decorative. The "glow" is a soft box-shadow using
// the existing --red accent at low opacity, not a new color.

import { AssetPlaceholder } from "@/components/placeholder/AssetPlaceholder";

export function CardArtPreview() {
  return (
    <div className="mx-auto w-full max-w-[340px]">
      <AssetPlaceholder
        tone="dark"
        className="aspect-[16/10] w-full rounded-[24px] shadow-[0_0_0_1px_rgba(179,38,34,0.35),0_20px_60px_-20px_rgba(0,0,0,0.5)]"
      />
    </div>
  );
}
