// feature-image-cta.spec.md: full-bleed dark photo, centred overlay stack —
// badge glyph, 2-line heading, circular emblem, pill button. Content
// scroll-reveals per ScrollReveal.tsx. The badge glyph is a plain
// geometric SVG (cross-in-circle), not a brand mark — the spec explicitly
// warns against inventing a new brand glyph here.

import Link from "next/link";
import { AssetPlaceholder } from "@/components/placeholder/AssetPlaceholder";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";

export function FeatureBlock() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-16 text-center md:px-5 tablet:py-20 desktop:py-24">
      <AssetPlaceholder tone="dark" className="absolute inset-0 -z-10" />

      <ScrollReveal className="mx-auto flex max-w-[520px] flex-col items-center gap-5">
        <span
          aria-hidden
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--paper)]/40 text-[var(--paper)]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M2 12h20" strokeLinecap="round" />
          </svg>
        </span>

        <h2 className="font-serif text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-[var(--paper)] desktop:text-[36px]">
          [VAVVA COPY TBD]
          <br />
          [VAVVA COPY TBD]
        </h2>

        <AssetPlaceholder tone="dark" label="" className="h-14 w-14 rounded-full" />

        <Link
          href="/shop"
          className="mt-1 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--paper)] px-6 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--ink)] transition-transform active:scale-[0.96]"
        >
          [VAVVA COPY TBD]
        </Link>
      </ScrollReveal>
    </section>
  );
}
