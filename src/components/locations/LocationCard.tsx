// locations-page.spec.md / COMPONENT_INVENTORY.md §8: illustration (left) +
// text block (right) — name, 2-line address, hours — same side every entry,
// not alternating. Stacks to image-above-text on mobile.

import Image from "next/image";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";
import skyline from "../../assets/nyc-skyline.png";

// Redesigned 2026-08-06 per D's reference mockup: one location, skyline
// illustration left / text right, no card chrome, generous whitespace —
// replaces the earlier stacked image-over-text card pattern. Illustration
// is D's own supplied asset (src/assets/nyc-skyline.png), swapped in for
// the placeholder hand-authored sketch this slot carried until now.
//
// The image is deliberately outside ScrollReveal (2026-08-07): any
// opacity transition on an ancestor forces a new stacking context for
// its duration, which blocks mix-blend-mode from seeing the real page
// background behind it — the flush blend broke while the reveal was
// mid-transition. Only the text half reveals; the image is just always
// there, which reads fine for a static illustration.
export function LocationCard({
  name,
  location,
  status,
}: {
  name: string;
  location: string;
  status: string;
}) {
  return (
    <div className="flex flex-col items-center gap-10 tablet:flex-row tablet:items-center tablet:gap-20">
      <Image
        src={skyline}
        alt="New York City skyline"
        priority
        sizes="(min-width: 810px) 46vw, 560px"
        className="w-full max-w-[560px] mix-blend-multiply tablet:w-[46%] tablet:max-w-none"
      />
      <ScrollReveal className="flex flex-col gap-5 text-center tablet:text-left">
        <h3 className="font-serif text-[32px] font-normal tracking-[-0.01em] text-[var(--ink)] desktop:text-[36px]">
          {name}
        </h3>
        <p className="font-serif text-[18px] leading-[1.6] text-[var(--ink)]">{location}</p>
        <p className="font-serif text-[18px] leading-[1.6] text-[var(--ink)]">{status}</p>
      </ScrollReveal>
    </div>
  );
}
