import Link from "next/link";

/* This route matters again as of 2026-08-07: deleting /gift-card made this
   the page that request lands on, so it was worth reading rather than
   assuming. Two things were wrong with it, both predating the nav's
   existence — it was written when this site was a single full-viewport page
   with no chrome above it:

   - `min-h-dvh` measured the whole viewport while sitting *below* a 64px
     nav, so the document overflowed by exactly the nav's height and put a
     scrollbar on a page holding two lines of text. svh not dvh for the
     reason page.tsx already documents: dvh recalculates as the mobile
     address bar collapses and shoves centred content mid-scroll.

     The nav briefly ran 80px mobile / 200px tablet+ (2026-08-12,
     casajondal.es) and this carried both numbers to match. Reverted
     2026-08-14 — the bar is a flat 64px again, mimis' own.

     **104px, not 64px** (fixed 2026-08-14). The subtraction was still only
     counting the nav after the LoadingLamps strip was added below it, so
     this page had quietly regressed into the exact bug described above:
     measured live, the document ran 940px against a 900px viewport and
     overflowed by 40px — the strip's height precisely — putting a scrollbar
     back on a page holding two lines of text. The chrome is 64px of bar
     plus 40px of strip (24px of py-3 around a 16px row). `.home-stage` in
     globals.css subtracts the same 104px; if either the bar or the strip
     ever changes height, both numbers move together. See Nav.tsx.
   - The background was a hardcoded `#E8E8E8` rather than `var(--paper)` —
     the same colour today, but a second place to remember on a palette
     change. There is no second place now.

   px-4 / md:px-5 is left as-is. The rest of the site moved to a flat 24px
   gutter to match the type reference, but this page's gutter comment is an
   explicit decision to match the *home column*, and the home column is
   still on that stepped scale. */
export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-104px)] w-full flex-col bg-[var(--paper)] antialiased">
      {/* px-4 / md:px-5 to match the home column. This was px-1, which put the
          copy 4px off the bezel on a 320px phone while the home page held 16 —
          the two pages are the same site and should not gutter differently.
          max-w stays 360: there is no measure to fit here, only a short label,
          so it just needs to stop the block drifting on a wide screen. */}
      <div className="mx-auto flex w-full max-w-[360px] flex-1 flex-col justify-center px-4 py-16 md:px-5">
        {/* An h1, not a p. The home page's heading is carried by the mark; this
            page has no mark, so as a <p> it shipped with no heading at all. */}
        <h1 className="m-0 text-[15px] font-medium leading-[1.4] tracking-[-0.015em] text-black">
          Not found
        </h1>
        <p className="mt-6">
          <Link href="/" className="social-link">
            back
          </Link>
        </p>
      </div>
    </main>
  );
}
