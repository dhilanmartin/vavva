/* Landing.
   ===========================================================================

   Current state, 2026-08-14: white paper, the header's usual red mark, and
   the studio's one sentence. Nothing else.

   HOW IT GOT HERE, because three things were removed in one day and the
   reasons are different for each:

     the video      D: "get rid of the video on the landing." The 2026-08-12
                    mimis.nyc hero arrangement (800px cap, 2.4334:1, the
                    paragraph positioned under it) is retired wholesale.
                    MediaFrame.tsx stays on disk and still holds the ffmpeg
                    note worth reading before anyone reinstates a video.
     the waitlist   replaced by an Instagram link when the page briefly went
                    red, on the grounds that WaitlistForm's live behaviour
                    with no NEXT_PUBLIC_ACCESS_ENDPOINT configured was
                    already `window.open(instagram)`. That reasoning still
                    holds if a CTA ever returns here.
     the red        the page ran as a full #B32622 brand field with a
                    reversed white wordmark for one pass. D reverted it to
                    white and removed both the Instagram link and the
                    COMING SOON line with it.

   So this page currently has NO call to action at all. That is the state as
   asked for, and it is worth stating plainly rather than leaving implied:
   a visitor can read the sentence and use the nav, and there is nothing
   else to do here. The nav is the only way out.

   The copy is D's own wording. One clause still differs from the original
   and is left as-is rather than silently reverted: "Join the waitlist for
   behind-the-scenes updates" became "Follow along for behind-the-scenes
   updates" when the waitlist field was removed, and there is still no
   waitlist on the page for the original sentence to point at.

   The type is set against system.studio at D's instruction — "view
   https://system.studio/ for how the text should sit / be colored / be
   padded (emulate it)" — measured off their live styles rather than
   eyeballed: 14px / 21px, tracking normal, pure black, centred, 288px
   measure, block centred in the viewport. See `.home-stage` / `.home-note`
   in globals.css for the numbers and the two deliberate departures.

   The face stays Inter, which is what this landing has always set, so
   "keep the same font" and "emulate system.studio" resolve together — only
   the metrics around the family moved. `.idx-note` and the 460px `.idx-col`
   are no longer used here; both stay in globals.css because their long
   constraint-solving note is still the record of how the previous setting
   was derived. */
export const metadata = { title: "VAVVA" };

export default function HomePage() {
  return (
    <main className="home-stage">
      <p className="home-note home-rise" style={{ ["--i" as string]: 3 }}>
        Casa Vavva is a new kind of creative studio based in{" "}
        <span className="place">New York City</span>, arriving fall 2026. Follow
        along for behind-the-scenes updates.
      </p>
    </main>
  );
}
