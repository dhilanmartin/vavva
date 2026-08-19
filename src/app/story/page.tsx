import type { Metadata } from "next";
import { LeadBlock } from "@/components/story/LeadBlock";

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
   Vavva's. Page rhythm matches too: 24px gutters, h1 40px below the header
   (that 40px is mimis' own measured rhythm, independent of Vavva's own
   header height — see Nav.tsx for the 2026-08-12 change to that), lead 68px
   below the h1.

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
  /* ---- the door is open again (2026-08-18) -------------------------------

     This carried `redirect("/")` from 2026-08-12, when D wanted "Our Story"
     specifically off — independent of SECONDARY_PAGES_LIVE, which gates
     Locations and Products. A redirect rather than notFound(), so a live
     nav link landed somewhere intentional instead of on an error.

     Removed because D is working on this page: "host the dev again so i can
     work on the products and about page." A page that redirects before it
     renders cannot be worked on. The body below never changed while the
     door was shut — same paused-not-gone convention as the rest of this
     repo — so this is one line coming out, not a rebuild.

     Put `redirect("/")` back here to shut it again; nothing else needs
     touching. */

  return (
    /* ---- 2026-08-18: the triptych and the skyline are gone -------------

       D: "remove on the story page the 3 cards with diff colors, and the
       nyc skyline."

       Both were filling space rather than saying anything. The triptych was
       three empty placeholders that had never held real photography — they
       took solid colours earlier the same day, which made them prettier and
       no more informative. The skyline was a stock line drawing already
       carried by the Locations page, so the Story page closed on a picture
       that belonged somewhere else.

       Removing them leaves the page as what it should have been: a heading
       and a writeup. Triptych.tsx stays on disk unused under the usual
       paused-not-gone convention; the skyline asset is still Locations'. */
    <main className="w-full bg-[var(--paper)] pb-24 pt-10">
      <LeadBlock />
    </main>
  );
}
