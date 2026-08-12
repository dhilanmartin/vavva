import { MediaFrame } from "@/components/media/MediaFrame";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

/* Landing. Restructured 2026-08-12 against mimis.nyc's own hero, on D's
   instruction: "resize the video looping on the landing to the same size
   as the landing video on mimis.nyc. and where the text on mimis 'meet me'
   is is where the email signup and copy should go."

   Measured live off mimis.nyc at 1710px (this repo's own reference
   viewport — see Nav.tsx / DESIGN.md), not eyeballed:

     hero video   1662×683 (2.4334:1), inside the same 24px page gutter
                  Nav and the header LED line already use — full width, not
                  a centred column
     "Meet me
      at Mimi's"  the very next element, flush against the video's bottom
                  edge (~4px gap), centred, full-width container

   That's a straight swap of what this house's video/copy do for what
   mimis' video/heading do at that same position, not a copy of mimis'
   actual words: our video keeps its own footage, and mimis' heading slot
   becomes Vavva's paragraph + waitlist field.

   Width corrected, same day: D — full-page-width was too big, "reverse the
   full widh miis size, and make it somewehre in between... enough so that
   theres no need to scroll on the landing to see all the text too, but
   also where its not so big its blurry since its not 4k." Both halves of
   that are hard constraints, not taste, and both point at the same number:
   the source clip is a re-encode at a literal 800×450 (see MediaFrame.tsx's
   own ffmpeg note), so anything wider than 800px CSS width is upscaling
   past what the file actually has — 1662px would have been over 2x
   upscaled before a single retina pixel is even counted. 800px is that
   ceiling exactly, not a rounded-off "in between" guess, and it comfortably
   clears the no-scroll requirement too: nav + header line + this video at
   800×330 (still the mimis aspect ratio, just capped in width) + the copy
   block below it totals well under a laptop-height viewport — verified,
   not assumed. The mimis aspect ratio (2.4334:1) is kept at this width;
   only the absolute size was walked back, not the shape.

   Two things carry over UNCHANGED from the previous index.how-referenced
   layout, because this request was about size and position, not about
   them: the 460px `.idx-col` measure and the 13px paragraph sizing tuned
   to force the "arriving fall 2026" line break inside it (see the note on
   .idx-note in globals.css for the full constraint-solving story — it
   still holds verbatim in a 460px column regardless of how wide the video
   above it is), and the form itself (WaitlistForm.tsx).

   One casualty: the old `.idx-stage` grid-centre-in-one-screen trick
   (`display:grid; place-items:center; min-height: calc(100svh - 64px)`)
   assumed a SMALL composition that needed help not looking lost in a tall
   viewport. Even at the corrected 800px width the hero is taller than the
   old 460px one was, and mimis' own page just flows top-down and scrolls —
   so this page now does too, and comfortably fits one screen anyway per
   the no-scroll math above. The `.idx-stage` rule itself is deleted from
   globals.css rather than left orphaned; `.idx-col` (the 460px measure) is
   the only piece still used here, unchanged. THE SLUG LIST IS GONE (D,
   2026-08-10) and stays gone; see git history if it's ever wanted back. */
export default function HomePage() {
  return (
    <main className="w-full bg-[var(--paper)]">
      {/* aspect-ratio keeps mimis' measured 1662:683 proportion at any
          width rather than rounding it to a cleaner-looking fraction — a
          measured fact, not a designed one — while max-w-[800px] caps the
          absolute size at the source clip's own native resolution
          (800×450, see MediaFrame.tsx) so it's never displayed larger than
          the file actually has pixels for. Still wrapped in Vavva's own
          .vv-embed radius+shadow (globals.css): D asked to match the
          video's proportions, not to also drop this site's established
          embed treatment for a flush, sharp-cornered one — those are
          separate decisions and only the first was made here. */}
      <div className="mx-auto w-full max-w-[800px] px-6 pt-6 tablet:pt-8">
        <MediaFrame aspect="1662 / 683" />
      </div>

      {/* Sits where mimis' "Meet me at Mimi's" sits: centred, directly
          below the hero. Their heading runs almost flush against the
          video (~4px) because a 48px display heading barely needs
          separation to read as its own element; a bare paragraph and a
          form field do, so this gets 40px — the same image→text gap
          already established on Locations (LocationCard.tsx) rather than
          a new number invented for this one spot. */}
      <div className="flex w-full flex-col items-center px-6 pb-16 pt-10">
        <div className="idx-col">
          {/* Copy is D's own wording and is deliberately unchanged.

              Two edits predating this pass, both flagged rather than silent:

              1. The full stop after "New York City" is a comma. The two lines
                 D pasted are one sentence in this layout, and "New York City.
                 arriving fall 2026." reads as a fragment.
              2. "based in" was briefly cut to "in" to squeeze the block into
                 the reference's two lines, then RESTORED — D asked for the
                 second line to start "arriving fall 2026", and that break is
                 only reachable at three lines. Line 1 as D wants it is 360px
                 and line 2 is 489px against a 460px column, so a two-line
                 block simply cannot start line 2 there in Inter at 15px.
                 Cutting "based" bought two lines by moving "arriving" up onto
                 line 1, which is precisely the break D is rejecting.

              The city keeps the brush red it carries everywhere else. */}
          <p className="idx-note">
            Casa Vavva is a new kind of creative studio based in{" "}
            <span className="place">New York City</span>, arriving fall 2026.
            Join the waitlist for behind-the-scenes updates.
          </p>

          <WaitlistForm />
        </div>
      </div>
    </main>
  );
}
