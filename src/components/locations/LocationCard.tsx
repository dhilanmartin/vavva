// locations-page.spec.md / COMPONENT_INVENTORY.md §8: illustration (left) +
// text block (right) — name, 2-line address, hours — same side every entry,
// not alternating. Stacks to image-above-text on mobile.

import { AssetPlaceholder } from "@/components/placeholder/AssetPlaceholder";

export function LocationCard() {
  return (
    <div className="flex flex-col gap-6 tablet:flex-row tablet:items-start tablet:gap-10">
      <AssetPlaceholder
        tone="light"
        className="aspect-[176/246] w-full max-w-[220px] shrink-0 rounded-[24px] tablet:w-[176px]"
      />
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-[22px] font-normal tracking-[-0.01em] text-[var(--ink)]">
          [VAVVA COPY TBD]
        </h3>
        <p className="text-[15px] leading-[1.5] text-[var(--mute)]">
          [VAVVA COPY TBD]
          <br />
          [VAVVA COPY TBD]
        </p>
        <p className="text-[15px] leading-[1.5] text-[var(--mute)]">
          [VAVVA COPY TBD]
        </p>
      </div>
    </div>
  );
}
