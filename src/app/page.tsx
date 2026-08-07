import { DiaGradient } from "@/components/dia/DiaGradient";
import { Hero } from "@/components/home/Hero";

/* Landing page, 2026-08-06: matches live vavva.xyz 1:1 (Hero.tsx is a
   direct port of main's original page.tsx) — the only differences are the
   Nav above and Footer below, both now living in the root layout instead of
   this page owning the whole viewport. Nav/Footer simply add extra scroll
   length beyond that one viewport, which is the expected cost of adding
   chrome that didn't exist before.

   min-h-svh, not min-h-dvh, as of 2026-08-07: on mobile, dvh recalculates
   as the browser's address bar collapses/expands during scroll — main's
   min-height grew mid-scroll as the bar hid, visibly shoving the footer
   down. svh always assumes the bar is showing (the smaller, stable value),
   so it never recalculates while scrolling. Same class of bug DESIGN.md's
   own history already names once ("dvh arithmetic here is what produced
   the iOS seam this page has already been through once") — same fix
   applied here.

   The mid-page sections built for the mimi-structural pass (SectionLabel,
   FeatureBlock, CtaTileRow, Newsletter) depended entirely on placeholder
   imagery/copy that doesn't exist yet — cut from this route rather than
   shipping placeholders on the actual landing page. Components themselves
   aren't deleted (still under src/components/home/), and Locations/Shop/
   Story/Gift Cards remain reachable via Nav as the live structural
   exploration.

   DiaGradient unchanged: fixed to the viewport bottom, z-index 0. Footer
   now carries an explicit --paper background (see Footer.tsx) so it
   occludes the aurora instead of letting it bleed through underneath. */
export default function HomePage() {
  return (
    <main className="relative flex min-h-svh w-full flex-col bg-[var(--paper)]">
      <Hero />

      <div className="dia-stage" aria-hidden>
        <DiaGradient reveal="mount" />
      </div>
    </main>
  );
}
