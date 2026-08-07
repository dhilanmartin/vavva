import type { Metadata } from "next";
import Image from "next/image";
import { LeadBlock } from "@/components/story/LeadBlock";
import { Triptych } from "@/components/story/Triptych";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";
import skyline from "../../assets/nyc-skyline.png";

export const metadata: Metadata = { title: "Story — VAVVA" };

/* Trimmed 2026-08-07 per the owner: the "why we believe" icon+text section
   and the Timeline are cut from this route for now (not deleted —
   IconTextBlock.tsx and Timeline.tsx stay in src/components/story/,
   same "paused, not gone" treatment as the home page's FeatureBlock/
   CtaTileRow/Newsletter). The two triptych instances collapse to one —
   with the "why" section and timeline gone, a second identical 3-image
   grid right after the first read as duplicate content, not a deliberate
   beat.

   Closing visual is now the real skyline artwork (src/assets/nyc-skyline.png)
   instead of a placeholder — same flush mix-blend-multiply treatment as
   the Locations page, full-bleed rather than the earlier boxed/rounded
   placeholder. */
export default function StoryPage() {
  return (
    <main className="w-full bg-[var(--paper)] pb-24 pt-10 tablet:pt-14">
      <div className="flex flex-col gap-16 tablet:gap-20">
        <LeadBlock />

        <ScrollReveal className="px-4 md:px-5 tablet:px-6">
          <Triptych />
        </ScrollReveal>

        <ScrollReveal>
          <Image
            src={skyline}
            alt="New York City skyline"
            sizes="100vw"
            className="mix-blend-multiply mx-auto w-full max-w-[1200px]"
          />
        </ScrollReveal>
      </div>
    </main>
  );
}
