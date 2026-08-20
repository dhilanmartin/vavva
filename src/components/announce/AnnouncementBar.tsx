"use client";

/* The announcement bar, above everything.
   ===========================================================================

   shadowlion.com's, matched to their own served CSS (their site blocks
   automated rendering, so it was read from the stylesheet rather than
   measured live): background #fff, colour #000, padding .75rem 1.5rem,
   centred, font-size .9rem, box-shadow 0 2px 8px rgba(0,0,0,.1); the clause
   at weight 500 and the link at 700; hover to opacity .7 over .3s.

   VAVVA ADDS TWO THINGS THEIRS DOES NOT HAVE, both at D's request: it
   animates in, and it can be dismissed.

   ---- why this is a client component now ---------------------------------

   Dismissal has to persist, or the bar is a nag: closed on the landing,
   back on the next navigation. So it reads localStorage — which makes this
   the only client component in the chrome. It ships ~1KB of JS.

   THE FLASH IS THE HARD PART, and it is handled BEFORE React, not in it.
   A dismissed bar rendered on the server and removed on hydration is 43px
   of white that appears and vanishes on every page load — worse than not
   having a dismiss button. The inline script in layout.tsx reads the same
   key and stamps `announce-off` on <html> before first paint, so a
   dismissed bar is never painted at all. This component's state only
   handles the dismissal that happens in front of you.

   THE KEY IS VERSIONED (`vv-announce:v1`). Dismissal means "I have read
   this announcement", not "never show me a bar again". Change the copy,
   bump the version, and it returns for everyone who dismissed the old one.

   `aria-live` is deliberately ABSENT. The bar is present on load rather
   than arriving later, so announcing it would interrupt a screen reader
   mid-sentence for something already in the document order. */

import { useEffect, useState } from "react";
import { INSTAGRAM_HREF } from "@/lib/site";

export const ANNOUNCE_KEY = "vv-announce:v1";

/* Long enough to outlast the 220ms collapse in globals.css with room for a
   slow frame. The bar is already at opacity 0 well before this fires, so the
   only thing it delays is the unmount. */
const EXIT_MS = 400;

export function AnnouncementBar() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  /* IT ANIMATES OUT, and it has to (2026-08-19). This used to be a bare
     `if (dismissed) return null`, so a bar that took 420ms to arrive left in
     a single frame — yanking 43px out of normal flow and shoving the whole
     page up under the cursor that had just clicked. An entrance without an
     exit is the jarring change that entrance was there to prevent.

     `announce-off` is deliberately NOT set until the exit finishes: it
     carries `display: none`, which would delete the bar mid-collapse. Its
     real job is the next page load, where the inline script in layout.tsx
     sets it from localStorage before first paint. Storage is written
     immediately, though, so a navigation mid-animation still counts as
     dismissed. */
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => {
      document.documentElement.classList.add("announce-off");
      setGone(true);
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [leaving]);

  if (gone) return null;

  const dismiss = () => {
    if (leaving) return; // second click during the exit
    try {
      window.localStorage.setItem(ANNOUNCE_KEY, "1");
    } catch {
      /* private mode / storage disabled — dismiss for this view only */
    }
    // Reduced motion gets the old instant removal. A collapsing bar is
    // movement, and this one carries no meaning that a fade preserves.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("announce-off");
      setGone(true);
      return;
    }
    setLeaving(true);
  };

  return (
    <div className={`vv-announce-shell${leaving ? " is-leaving" : ""}`}>
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
