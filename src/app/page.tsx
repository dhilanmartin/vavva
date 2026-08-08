import { PowerOnMark } from "@/components/waitlist/PowerOnMark";
import { SlugList } from "@/components/waitlist/SlugList";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

/* Landing rebuilt 2026-08-07 on index.how's structure, at D's instruction.
   Every measurement below was read off that site's live computed styles, not
   estimated from a screenshot — the values live in globals.css under the
   .idx-* classes, with the extraction noted there.

   The shape, top to bottom:
     stage    24px padding on mobile; ≥768 it becomes a grid that centres a
              single column in the remaining viewport height
     column   460px, centred
     header   24×16 mark, 16px above the list (PowerOnMark.tsx)
     list     the studio's subjects, clipped and faded (SlugList.tsx)
     note     one 15px paragraph: what this is, and what the field does
     form     the waitlist door (WaitlistForm.tsx)

   The header slot was empty on the first pass and D asked for it back
   ("same with the green icon they have at the top of their site"), which
   also fixes the list's position — the reference's list starts 40px into
   the column (24px mark + 16px margin), and without the header everything
   sat 40px high. The mark is an icon-scale V, not the brush wordmark: see
   PowerOnMark.tsx for why that isn't the "second VAVVA" DESIGN.md bans.

   min-height is `100svh - 64px`, not 100vh: the nav is a real 64px row above
   this page rather than an overlay, so a full-viewport stage here would
   push the column down by exactly the nav's height and stop being centred.
   svh for the same reason page.tsx already carried it before this rewrite —
   dvh recalculates as the mobile address bar collapses and visibly shoves a
   vertically-centred column mid-scroll.

   The aurora (DiaGradient) is retired from this route rather than ignored,
   per the clone-structure brief's "keep or deliberately retire" instruction:
   it is a fixed light pinned to the bottom of the viewport, and this page's
   whole composition is a column centred in that same space. They were
   occupying the same real estate for two different reasons. The component
   and its CSS stage are untouched on disk.

   Hero.tsx / AccessGate.tsx are likewise left in place, unused — the same
   "paused, not gone" treatment the rest of this branch uses. */
export default function HomePage() {
  return (
    <main className="idx-stage w-full bg-[var(--paper)]">
      <div className="idx-col">
        {/* Inside the column, not beside it: .idx-stage is a centring grid
            at ≥768, so a header as its own grid child would centre
            horizontally instead of sitting at the column's left edge. */}
        <header className="mb-4">
          <PowerOnMark />
        </header>

        <SlugList />

        {/* Copy is D's own wording, set to the reference paragraph's exact
            metrics (15px / 22.5px leading / +0.02em / 16px margins — see
            .idx-note). Two edits to what D sent, both flagged rather than
            silent:

            1. The full stop after "New York City" is a comma. The two lines
               D pasted are one sentence in this layout, and "New York City.
               arriving fall 2026." reads as a fragment.
            2. "based in" was briefly cut to "in" to squeeze the block into
               the reference's two lines. RESTORED 2026-08-07: D asked for
               the second line to start "arriving fall 2026", and that
               break is only reachable at three lines. The measurements:
               line 1 as D wants it is 360px, line 2 is 489px against a
               460px column — 29px over, so a two-line block simply cannot
               start line 2 there in Inter at 15px. Cutting "based" bought
               two lines by moving "arriving" up onto line 1, which is
               precisely the break D is rejecting.

               With "based in" back, the break D wants happens on its own —
               line 1 fills to 410px and "arriving" starts line 2 naturally,
               no <br> and no width hack. The cost is a third line, and
               .idx-note carries text-wrap: pretty to keep "updates." from
               orphaning on it.

            The city keeps the brush red it carries everywhere else on this
            site — the reference tints its two founder names the same way,
            so the accent lands in the same place in the sentence. */}
        <p className="idx-note">
          Casa Vavva is a new kind of creative studio based in{" "}
          <span className="place">New York City</span>, arriving fall 2026.
          Join the waitlist for behind-the-scenes updates.
        </p>

        <WaitlistForm />
      </div>
    </main>
  );
}
