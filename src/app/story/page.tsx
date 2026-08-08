import type { Metadata } from "next";
import Image from "next/image";
import { LeadBlock } from "@/components/story/LeadBlock";
import { Triptych } from "@/components/story/Triptych";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";
import skyline from "../../assets/nyc-skyline.png";

// Route stays /story, label reads "Our Story" (D, 2026-08-07) — see Nav.tsx.
// The page's own h1 stays "The Vavva Story": that's the heading, not the nav
// label, and the reference site draws the same distinction (nav OUR STORY,
// heading "The Mimi's Story").
export const metadata: Metadata = { title: "Our Story — VAVVA" };

/* Reopened 2026-08-07 at D's instruction ("open back up the Our Story
   page"). The notFound() gate is removed outright rather than inverted —
   with the landing now a waitlist, the whole site is pre-launch, so gating
   individual routes behind NEXT_PUBLIC_VERCEL_ENV no longer describes
   anything real. See src/lib/site.ts.

   Type is now mimis.nyc/story's own scale, measured off their live computed
   styles and reproduced exactly (.mimi-* in globals.css); the words are
   Vavva's. Page rhythm matches too: 24px gutters, h1 40px below the 64px
   header, lead 68px below the h1.

   Trimmed 2026-08-07 per the owner: the "why we believe" icon+text section
   and the Timeline stay cut from this route (not deleted — IconTextBlock.tsx
   and Timeline.tsx remain in src/components/story/, same "paused, not gone"
   treatment as Hero/AccessGate/Footer). One triptych, not two: with those
   sections gone, a second identical 3-image grid read as duplicate content
   rather than a deliberate beat.

   Closing visual is the real skyline artwork (src/assets/nyc-skyline.png),
   flush mix-blend-multiply, full bleed. Deliberately not wrapped in
   ScrollReveal: an ancestor's opacity transition forces a stacking context
   for its duration, which blocks mix-blend-mode from reading the real
   background behind it — same fix as LocationCard's image. */
export default function StoryPage() {
  return (
    <main className="w-full bg-[var(--paper)] pb-24 pt-10">
      <div className="flex flex-col gap-20">
        <LeadBlock />

        <ScrollReveal className="px-6">
          <Triptych />
        </ScrollReveal>

        <Image
          src={skyline}
          alt="New York City skyline"
          sizes="100vw"
          className="mix-blend-multiply mx-auto w-full max-w-[1200px]"
        />
      </div>
    </main>
  );
}
