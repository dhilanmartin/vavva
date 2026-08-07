// hero.spec.md: single full-bleed photo inset by the page gutter, two short
// headline fragments overlaid at opposite corners (top-left / bottom-right).
// No hover/scroll interaction observed — static image, static text.

import { AssetPlaceholder } from "@/components/placeholder/AssetPlaceholder";

export function Hero() {
  return (
    <section className="px-4 pt-6 md:px-5 tablet:px-6 tablet:pt-8">
      <div className="relative">
        <AssetPlaceholder
          tone="dark"
          className="aspect-[3/4] w-full rounded-[24px] tablet:aspect-[16/9]"
        />
        <p className="absolute left-5 top-5 max-w-[65%] font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-[var(--paper)] desktop:text-[36px]">
          [VAVVA COPY TBD]
        </p>
        <p className="absolute bottom-5 right-5 max-w-[65%] text-right font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-[var(--paper)] desktop:text-[36px]">
          [VAVVA COPY TBD]
        </p>
      </div>
    </section>
  );
}
