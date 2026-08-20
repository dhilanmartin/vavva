"use client";

/* The announcement bar — and as of 2026-08-20 it is the site's ONLY chrome.
   ===========================================================================

   D: "for now remove the red header and keep just the announcement bar. i
   dont think the vavva logo is necessary for now since the domain is
   vavva.xyz itself. also dont make the announcement bar disappear
   automatically."

   So this one 43px strip is now everything above the artwork. The red header
   that stood under it for half a day — links, wordmark, Contact, hamburger —
   is unmounted in layout.tsx. Nav.tsx and VavvaMark.tsx stay on disk under
   the same paused-not-gone convention as Footer, LoadingLamps and SlugList.

   THE LOGO'S ARGUMENT IS D'S AND IT IS A GOOD ONE: the address bar already
   says vavva.xyz, so a wordmark under it is the site introducing itself twice
   to someone who just typed its name. That holds precisely while this is a
   one-page coming-soon; it stops holding the moment there is a second route
   to navigate back from.

   WHAT WOULD HAVE BEEN LOST WITH THE HEADER, AND WHY IT ISN'T: the header
   carried the only Instagram handoff on the landing (its Contact link). This
   bar's "Follow Us ↗" is the same destination, so removing the nav costs the
   page no reachable link at all. Every nav item besides Contact was already
   parked to `/` and every secondary route is dark — see src/lib/site.ts.

   ---- "dont make it disappear automatically" ------------------------------

   Nothing here removes itself. It never did on a timer, but it DID vanish on
   its own in the way that actually matters to someone testing the page: the
   dismissal used to persist in localStorage and a pre-paint script in
   layout.tsx re-applied it, so closing the bar once meant every later load
   opened with no bar and nothing to look at. That is indistinguishable from
   the bar being broken, and it cost a round trip on 2026-08-20 when a stale
   key from two days earlier was hiding it.

   THE PERSISTENCE IS GONE. The close button stays — D asked for a dismiss
   control and it is still his — but it now closes the bar for THIS VIEW only
   and the next load brings it back. Every disappearance is a click, in front
   of you, that you can undo by reloading.

   That deletes the whole `vv-announce:v1`/`v2` key, the `announce-off` class,
   the pre-paint read in layout.tsx, and the flash-of-dismissed-bar problem
   that read was there to solve. The bar's absence can no longer outlive the
   page it was dismissed on.

   ---- the field ------------------------------------------------------------

   shadowlion.com's, matched to their own served CSS (their site blocks
   automated rendering, so it was read from the stylesheet rather than
   measured live): background #fff, colour #000, padding .75rem 1.5rem,
   centred, font-size .9rem, box-shadow 0 2px 8px rgba(0,0,0,.1); the clause
   at weight 500 and the link at 700; hover to opacity .7 over .3s.

   The shadow is back on this element, where it started. It had moved to the
   red header on 2026-08-20 because the shadow belongs at the BOTTOM edge of
   the chrome and the header was the bottom; this bar is the bottom again.

   It still animates in, with the page rather than after it (D, 2026-08-20:
   "remove the delay for the bar to load in"). The bar holds its 43px from the
   first frame and only the ink fades and drops 8px into place — a delayed
   entrance had to open its own height and push the page down, and the same
   push at 0s would just be reflow during first paint. See `announceIn` in
   globals.css. */

import { useEffect, useState } from "react";
import { INSTAGRAM_HREF } from "@/lib/site";

/* Long enough to outlast the 220ms collapse in globals.css with room for a
   slow frame. The bar is already at opacity 0 well before this fires, so the
   only thing it delays is the unmount. */
const EXIT_MS = 400;

export function AnnouncementBar() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  /* IT ANIMATES OUT, and it has to. This was once a bare `if (dismissed)
     return null`, so a bar that took 420ms to arrive left in a single frame —
     yanking 43px out of normal flow and shoving the whole page up under the
     cursor that had just clicked. An entrance without an exit is the jarring
     change the entrance was there to prevent.

     The unmount is all this does now. There is no longer a class to stamp on
     <html> or a key to write, because the dismissal does not outlive the
     view. */
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => setGone(true), EXIT_MS);
    return () => clearTimeout(t);
  }, [leaving]);

  if (gone) return null;

  const dismiss = () => {
    if (leaving) return; // second click during the exit
    // Reduced motion gets an instant removal. A collapsing bar is movement,
    // and this one carries no meaning that a fade preserves.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    setLeaving(true);
  };

  return (
    <div className={`vv-announce-shell${leaving ? " is-leaving" : ""}`}>
      {/* The clip is its own element because `.vv-announce` is padded and a
          grid row does not size padding — see globals.css. */}
      <div className="vv-announce-clip">
        <div className="vv-announce">
          <div className="vv-announce-content">
            <span>
              We have news to share •{" "}
              <a
                href={INSTAGRAM_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="vv-announce-link"
              >
                Follow Us ↗
              </a>
            </span>
          </div>

          <button
            type="button"
            aria-label="Dismiss announcement"
            className="vv-announce-close"
            onClick={dismiss}
          >
            <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">
              <path
                d="M1 1l10 10M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
