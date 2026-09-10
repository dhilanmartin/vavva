"use client";

/* The announcement bar — home chrome.
   ===========================================================================

   D: "for now remove the red header and keep just the announcement bar..."

   ---- 2026-09-10: Shop stays when the news leaves -------------------------------

   Shop used to live inside the dismissible shell, so closing the news also
   deleted the only nav word on the landing until reload. The news and the X
   still leave; Shop is always painted. A 43px row with one link is thin, but
   it is chrome that cannot vanish under the visitor's own click. */

import Link from "next/link";
import { useEffect, useState } from "react";
import { destinationHref, INSTAGRAM_HREF } from "@/lib/site";

const EXIT_MS = 400;

export function AnnouncementBar() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => setGone(true), EXIT_MS);
    return () => clearTimeout(t);
  }, [leaving]);

  const dismiss = () => {
    if (leaving || gone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    setLeaving(true);
  };

  const shop = (
    <Link href={destinationHref("/products")} className="vv-announce-shop">
      Products
    </Link>
  );

  /* News dismissed: keep the row, keep Shop, drop the copy and the X. */
  if (gone) {
    return (
      <div className="vv-announce-shell vv-announce-shell--nav-only">
        <div className="vv-announce-clip">
          <div className="vv-announce vv-announce--nav-only">{shop}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`vv-announce-shell${leaving ? " is-leaving" : ""}`}>
      <div className="vv-announce-clip">
        <div className="vv-announce">
          {shop}

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
