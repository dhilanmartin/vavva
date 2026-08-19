/* The Instagram chip, ported from dhilan.fyi (2026-08-18).
   ===========================================================================

   D: "replace the vavva footer logo with the instagram component (same one
   im using for dhilan.fyi)." Read off that site's live styles rather than
   rebuilt by eye:

     anchor      34x34, border-radius 8.5px, flex centred
     icon        16x16 in a 24x24 viewBox, fill: currentColor
     transition  color / background-color / box-shadow 220ms
                 cubic-bezier(0.2, 0, 0, 1), transform 120ms ease-out

   TWO COLOURS ARE INVERTED, and this is a translation rather than a
   deviation. dhilan.fyi's page background measures lab(4.68) — near black.
   Its chip is a LIGHT grey at 7% alpha, which reads as a faint lift on a
   dark ground and would be invisible on this site's white paper. So the fill
   becomes black at 6%: the same gesture, same weight, inverted for the
   ground it sits on.

   The icon keeps its value. lab(51.628) is a neutral mid grey — #7B7B7B —
   and it is legible on either ground (4.55:1 on white). Left alone
   deliberately: it is quieter than the pure-black type beside it in the
   footer, which is the correct relationship for a social mark sitting next
   to navigation.

   The glyph is Instagram's own trademarked mark, used to link to an
   Instagram profile. That is the mark's ordinary purpose and is why it is
   drawn rather than replaced by a letter. */

import { INSTAGRAM_HREF } from "@/lib/site";

// Instagram's standard solid glyph, 24x24.
const PATH =
  "M12 2.163c3.204 0 3.584.012 4.85.07 1.17.053 1.805.249 2.227.415.56.217.96.477 1.38.896.42.42.68.82.896 1.38.166.422.362 1.057.415 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.053 1.17-.249 1.805-.415 2.227a3.72 3.72 0 0 1-.896 1.38c-.42.42-.82.68-1.38.896-.422.166-1.057.362-2.227.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.053-1.805-.249-2.227-.415a3.72 3.72 0 0 1-1.38-.896 3.72 3.72 0 0 1-.896-1.38c-.166-.422-.362-1.057-.415-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.053-1.17.249-1.805.415-2.227.217-.56.477-.96.896-1.38.42-.42.82-.68 1.38-.896.422-.166 1.057-.362 2.227-.415 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.332.014 7.052.072 5.775.13 4.902.333 4.14.63a5.88 5.88 0 0 0-2.126 1.384A5.88 5.88 0 0 0 .63 4.14C.333 4.902.131 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.059 1.277.261 2.15.558 2.912a5.88 5.88 0 0 0 1.384 2.126A5.88 5.88 0 0 0 4.14 23.37c.762.297 1.635.499 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.059 2.15-.261 2.912-.558a5.88 5.88 0 0 0 2.126-1.384 5.88 5.88 0 0 0 1.384-2.126c.297-.762.499-1.635.558-2.912C23.986 15.668 24 15.259 24 12s-.014-3.668-.072-4.948c-.059-1.277-.261-2.15-.558-2.912a5.88 5.88 0 0 0-1.384-2.126A5.88 5.88 0 0 0 19.86.63c-.762-.297-1.635-.5-2.912-.558C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.846-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z";

export function InstagramLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={INSTAGRAM_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className={`vv-ig ${className}`}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d={PATH} />
      </svg>
    </a>
  );
}
