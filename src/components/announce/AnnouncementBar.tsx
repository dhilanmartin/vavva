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
   A dismissed bar rendered on the server and removed on hydration is 45px
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

import { useState } from "react";
import { INSTAGRAM_HREF } from "@/lib/site";

export const ANNOUNCE_KEY = "vv-announce:v1";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
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
        onClick={() => {
          try {
            window.localStorage.setItem(ANNOUNCE_KEY, "1");
          } catch {
            /* private mode / storage disabled — dismiss for this view only */
          }
          document.documentElement.classList.add("announce-off");
          setDismissed(true);
        }}
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
  );
}
