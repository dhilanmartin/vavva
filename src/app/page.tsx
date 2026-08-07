import { DiaGradient } from "@/components/dia/DiaGradient";
import { Hero } from "@/components/home/Hero";

/* clone-structure rebuild (test/mimi-structure-clone), simplified 2026-08-06
   by the owner to an "in between" of the original one-pager and the fuller
   mimi-structured exploration: Nav -> Hero (real copy + real AccessGate) ->
   straight to Footer, aurora intact. The mid-page sections built for the
   mimi-structural pass (SectionLabel, FeatureBlock, CtaTileRow, Newsletter)
   depended entirely on placeholder imagery/copy that doesn't exist yet —
   rather than ship placeholders on the actual landing page, they're cut from
   this route until there's real content for them. The components themselves
   aren't deleted (still under src/components/home/), and Locations/Shop/
   Story/Gift Cards remain reachable via Nav as the live structural
   exploration — this route alone is the one meant to be push-ready.

   DiaGradient is kept, not retired (DESIGN.md asks that decision be
   deliberate either way) — unchanged from the previous build: fixed to the
   viewport bottom, z-index 0, so it sits behind whatever section currently
   occupies the bottom of the frame. It reads through on paper-colored
   sections and is simply covered by opaque dark sections, same as always. */
export default function HomePage() {
  return (
    <main className="relative w-full bg-[var(--paper)]">
      <div className="relative z-10">
        <Hero />
      </div>

      <div className="dia-stage" aria-hidden>
        <DiaGradient reveal="mount" />
      </div>
    </main>
  );
}
