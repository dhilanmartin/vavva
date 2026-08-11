import { MediaFrame } from "@/components/media/MediaFrame";
import { LoadingLamps } from "@/components/waitlist/LoadingLamps";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

/* Landing, on index.how's structure. Every measurement was read off that
   site's live computed styles, not estimated from a screenshot — the values
   live in globals.css under the .idx-* classes, with the extraction noted
   there.

   The shape, top to bottom:
     stage    24px padding on mobile; ≥768 it becomes a grid that centres a
              single column in the remaining viewport height
     column   460px, centred
     header   24×16 mark, 16px above the media (PowerOnMark.tsx)
     media    the video, on repeat (MediaFrame.tsx)
     note     one paragraph: what this is, and what the field does
     form     the waitlist door (WaitlistForm.tsx)

   THE SLUG LIST IS GONE (D, 2026-08-10), replaced by the video.

   It was the reference's centrepiece and the most arresting thing on the
   page — a tall column of the site's own URLs, clipped and faded at the
   bottom so it read as a table of contents continuing past the frame. The
   problem was never how it looked: every row pointed at a route that does
   not exist, so the one honest page on the site had eleven fictional
   destinations at the top of it. SlugList.tsx is untouched on disk, the
   .idx-list / .idx-row / .idx-slug rules are still in globals.css, and
   putting it back is one import and one line.

   min-height is `100svh - 64px`, not 100vh: the nav is a real 64px row above
   this page rather than an overlay, so a full-viewport stage here would push
   the column down by exactly the nav's height and stop being centred. svh
   rather than dvh because dvh recalculates as a mobile address bar collapses
   and visibly shoves a vertically-centred column mid-scroll. */
export default function HomePage() {
  return (
    <main className="idx-stage w-full bg-[var(--paper)]">
      <div className="idx-col">
        {/* Inside the column, not beside it: .idx-stage is a centring grid
            at ≥768, so a header as its own grid child would centre
            horizontally instead of sitting at the column's left edge.

            The single status lamp became a full-width strip of them on
            2026-08-11 (D). Same lamp and same power-on flicker, staggered
            70ms apart so the row fills left to right across the top of the
            column and holds. PowerOnMark.tsx is untouched on disk. */}
        <header className="mb-4">
          <LoadingLamps />
        </header>

        {/* 16:9 — the column is 460px, so this lands at 460×259. It is the
            reference clip's own ratio, and it keeps the whole composition
            (mark, video, copy, field) inside one screen at laptop height,
            which the 50–60vh slug list did not always manage. */}
        <MediaFrame aspect="16 / 9" />

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
    </main>
  );
}
