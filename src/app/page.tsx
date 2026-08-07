import { DiaGradient } from "@/components/dia/DiaGradient";
import { Hero } from "@/components/home/Hero";
import { SectionLabel } from "@/components/home/SectionLabel";
import { FeatureBlock } from "@/components/home/FeatureBlock";
import { CtaTileRow } from "@/components/home/CtaTileRow";
import { Newsletter } from "@/components/home/Newsletter";

/* clone-structure rebuild (test/mimi-structure-clone). Replaces the previous
   one-pager per SKILL.md's approved scope pivot: PAGE_TOPOLOGY.md's Home
   structure is Nav → Hero → section-label divider → feature image+CTA block
   → 3-tile CTA row → newsletter band → Footer. Nav and Footer now live in
   the root layout (shared across every route); this page is everything
   between them.

   DiaGradient is kept, not retired (DESIGN.md asks that decision be
   deliberate either way) — unchanged from the previous build: fixed to the
   viewport bottom, z-index 0, so it sits behind whatever section currently
   occupies the bottom of the frame. It reads through on paper-colored
   sections and is simply covered by the opaque dark sections below, which
   is the same behavior it always had.

   The previous single-screen copy ("Casa Vavva is a creative studio...")
   and AccessGate door are not deleted — they're recoverable from git history
   on this branch and untouched on main. AccessGate.tsx itself is left in
   place, unused by this route, since nothing in this pass asked for the
   access-request flow specifically and it isn't part of mimi's structural
   pattern for a home page. */
export default function HomePage() {
  return (
    <main className="relative w-full bg-[var(--paper)]">
      <div className="relative z-10">
        <Hero />
        <SectionLabel>[VAVVA COPY TBD]</SectionLabel>
        <FeatureBlock />
        <CtaTileRow />
        <Newsletter />
      </div>

      <div className="dia-stage" aria-hidden>
        <DiaGradient reveal="mount" />
      </div>
    </main>
  );
}
