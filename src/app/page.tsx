import Image from "next/image";
import { ComingSoon } from "@/components/glitch/ComingSoon";
import { Petals } from "@/components/hero/Petals";
import skyline from "../assets/nyc-skyline-lander.png";

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

   The copy is now ONE sentence. The second — "Join the waitlist for
   behind-the-scenes updates," briefly "Follow along for…" once the field
   was gone — was removed entirely on D's instruction. That resolves a
   thread rather than cutting one short: the sentence had been pointing at
   a control that no longer existed since the waitlist came out, and every
   rewrite of it was working around that. Deleting it is the version that
   does not need a workaround.

   What is left says what the studio is and when it arrives, which is the
   whole job of the page.

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
/* ---- 2026-08-18: the page has an object again -----------------------------

   D asked for a coming-soon component here, so the "NO call to action at all"
   state described above is over — but only just. What arrives is one badge
   with two words on it, above the sentence that was already the whole page.
   It is not a control: nothing to click, nowhere to go. The page still says
   what the studio is and when it arrives, and now it says the second part
   twice — once as an object and once as a caption.

   The badge tears itself apart in bursts (components/glitch/). That behaviour
   is the reason it earns a place on a page this bare: a static COMING SOON
   pill is the most generic thing a pre-launch site can print, and this one is
   the only thing on the front door, so it has to be worth being the only
   thing there.

   ---- THE SIGN IS THE PAGE (2026-08-18) ----------------------------------

   D: "replace the text in total (creative studio....) with the coming soon
   component, remove the arrow, and make it vavva red."

   So the landing is now ONE OBJECT: a red regulatory-style sign reading
   Coming Soon, centred, tearing itself apart in bursts. The studio's one
   sentence — "Casa Vavva is a new kind of creative studio based in New York
   City, arriving fall 2026" — is gone, and with it the last visible copy on
   the front door.

   THAT IS A REAL COST AND IT IS WORTH STATING PLAINLY rather than leaving
   for someone to rediscover: that sentence was the only place the site said
   what the studio IS, where it is, and when it opens. It is still in
   layout.tsx's `description` and JSON-LD, so search results and link
   previews keep it — but a visitor who lands here now reads two words. If
   the positioning ever needs to be readable again, `.home-note` and `.place`
   are still in globals.css and the sentence is one line up in git.

   THE HIDDEN <h1> IS NOT DECORATION. Without it this route ships with no
   heading and no text node at all: the only content would be an element
   whose accessible name comes from `role="img"`. That is a page with nothing
   to announce, nothing to index and nothing in a document outline. The <h1>
   is `sr-only`, so it changes nothing visually and costs nothing — it just
   means the page still says something to a reader that cannot see a red
   rectangle. Delete it and the landing is genuinely blank to everything but
   a browser.

   ONE CHILD, so the flex column that used to hold the stack is gone too —
   `.home-stage` is `place-items: center` and centring one item is exactly
   what it already does. `--i: 3` keeps the sign in the header's cascade,
   arriving just after the nav.

   The fire block that briefly sat below this was deleted the same day
   (`src/components/fire/`, recoverable from git). */
export const metadata = { title: "VAVVA" };

export default function HomePage() {
  return (
    <main className="home-stage">
      <h1 className="sr-only">
        Casa Vavva — a creative studio in New York City. Coming soon.
      </h1>
      {/* `priority`: this is the largest contentful paint on the front door
          and there is nothing above it to defer to. */}
      {/* `draggable={false}` plus `pointer-events: none` in CSS (D: the png
          "shouldnt b draggable and should b embed"). It is scenery, not an
          asset on the page — you should no more be able to peel it off than
          you could a background colour. Kept as next/image rather than a CSS
          `background-image` so it still gets a srcset, AVIF/WebP conversion
          and the blur placeholder; a CSS background would have shipped the
          full 2.9MB PNG to every visitor to achieve the same thing. */}
      <div className="vv-hero-art">
        <Image
          src={skyline}
          alt="Pixel-art view of the Manhattan skyline in spring, seen across the water from a park promenade with cherry blossom, a lamppost and an empty bench."
          sizes="100vw"
          priority
          draggable={false}
          placeholder="blur"
        />
      </div>

      <Petals />

      <div
        className="vv-hero-sign home-rise"
        style={{ ["--i" as string]: 3 }}
      >
        <ComingSoon />
      </div>
    </main>
  );
}
