/* The announcement bar, above everything.
   ===========================================================================

   shadowlion.com's, matched to their own stylesheet rather than to a
   screenshot. Their site blocks automated rendering — a headless load returns
   an empty document whatever user agent it claims — so this was read from
   their served HTML and CSS bundle directly:

     bar       background #fff, color #000, padding .75rem 1.5rem,
               text-align center, font-size .9rem, box-shadow
               0 2px 8px rgba(0,0,0,.1)
     content   max-width 1200px, margin 0 auto, font-weight 500
     link      color #000, text-decoration none, font-weight 700,
               transition opacity .3s, hover opacity .7

   So the clause is 500 and the link is 700 — a two-step weight jump on one
   line, which is what gives it its snap. The bullet is part of the plain
   text and takes the same colour as everything else; it is not a separator
   in a lighter grey, which is what this shipped as first.

   ONE DEPARTURE, AND IT IS LAYOUT NOT TYPE. Theirs is `position: fixed`. That
   works on a site whose landing is one fixed screen; Vavva's other routes
   scroll, and a fixed bar would sit over the product grid the whole way
   down. This stays in normal flow, and the landing's absolutely positioned
   header offsets itself by `--announce-h` to clear it.

   The link also carries vertical padding with a matching negative margin —
   the visual line is unchanged, but the tap target grows from 20px to ~32px.
   Their inline link is a 20px-tall target on a phone; that is the one part
   of the pattern not worth copying exactly. */

import { INSTAGRAM_HREF } from "@/lib/site";

export function AnnouncementBar() {
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
    </div>
  );
}
