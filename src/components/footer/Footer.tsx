/* Footer, rebuilt 1:1 against mimis.nyc's own (2026-08-18).
   ===========================================================================

   D: "emulate 1:1 but replace their logo with ours and their buttons with
   ours on our site. but i want the line and all."

   Measured off their live styles — structure and metrics only, none of their
   copy (see .claude/skills/clone-structure):

     THE LINE      a `::after` on their footer element carrying
                   `border-top: 1px solid rgb(0,0,0)`. Pure black and full
                   hairline weight, not a tinted divider — it is the only
                   rule on their whole page and it reads as a hard edge. It
                   spans the CONTAINER, not the viewport
     bar           80px of content under the rule: 20px padding, a 40px row,
                   20px padding — and the padding is on ALL FOUR SIDES, so
                   the row is inset 20px horizontally from the rule as well
     row           three zones of EQUAL WIDTH — re-measured over CDP at a
                   1440 viewport: a 1392px bar, 20px padding, a 1352px row,
                   three 450.7px thirds. The first pass had this as
                   space-between with `flex-1` on the outer two, which
                   centres the link group correctly but sizes the zones
                   505/381/505. Same result for these four labels, different
                   result for any others — and D asked for 1:1 placement, so
                   it is a real grid of thirds now
     left          their 18x20 monogram
     centre        4 links, 24px gap, centred, Inter 14/600/20 uppercase
                   #000, no underline
     right         a flex COLUMN, align-items: flex-end, justify: center,
                   gap 6px — brand name in 14/600 uppercase (plain text, not
                   a link) over a legal line at 12/400/17 uppercase
                   (theirs was 10px; 12 is the readable floor)

   The right zone being two stacked lines is what makes the row 40px tall
   and therefore the bar 80px. Everything else in the row is 20px.

   ---- what is Vavva's, and the one rule that had to change ----------------

   THE LEFT ZONE IS THE INSTAGRAM CHIP, not the wordmark (D, 2026-08-18:
   "replace the vavva footer logo with the instagram component"). It is
   ported from dhilan.fyi — see components/social/InstagramLink.tsx.

   That reinstates the second-VAVVA ban in practice: the mark sat here for
   one pass under an explicit amendment, and with it gone the site is back to
   one wordmark. DESIGN.md keeps the amendment recorded rather than reverted,
   because the reasoning still holds if a footer stamp is ever wanted again —
   but nothing uses it today.

   THE LEGAL SLOT IS A COPYRIGHT, NOT A LINK. Theirs points at a privacy
   page. Vavva has no such route, and shipping a link to a route that does
   not exist is a half-finished state rather than a faithful copy — the same
   call the previous version of this file made for the same reason. It
   occupies the slot at the same size, weight, case and position.

   IT STACKS ON MOBILE, which theirs does not: their four labels survive to
   375px in a row that measures ~357px of content in a 327px box. Vavva's are
   longer, and this repo's Nav already answers small widths by restructuring
   rather than squeezing. */

import Link from "next/link";
import { InstagramLink } from "@/components/social/InstagramLink";
import { destinationHref, liveInteriorNav } from "@/lib/site";

/* Same live routes as PaperNav. Contact is out of the chrome for now —
   Instagram stays as the chip on the left, not as a duplicate text link. */
const LINKS = liveInteriorNav();

// Their 14/600/20 uppercase, in this site's Inter. `.nav-link` on top so the
// footer's hover and press behaviour is the header's rather than a second set
// of rules to keep in step.
const FOOTER_LINK =
  "nav-link inline-block text-[14px] font-semibold uppercase leading-5 tracking-[0.04em] text-black no-underline";

// Their brand line: same size and weight as the links. Ours is a home link,
// because the shop has a second route and the stamp is the way back.
const FOOTER_BRAND =
  "text-[14px] font-semibold uppercase leading-[17px] tracking-[0.04em] text-black";

// Legal slot under the brand. 12px is the floor; theirs was 10.
const FOOTER_LEGAL =
  "text-[12px] font-normal uppercase leading-[17px] tracking-[0.04em] text-black";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--paper)] px-6 pb-[env(safe-area-inset-bottom)]">
      {/* The rule sits on the CONTAINER, so it stops at the page gutter —
          24px in — not the raw viewport edge. Chrome is full-width; the
          product is `--shop`. They are different layers. */}
      <div className="vv-footer-rule w-full py-5">
        {/* Equal thirds at tablet+, matching their 450.7/450.7/450.7 — a
            grid, not space-between, so the zones stay equal no matter what
            the labels are. Stacked below that. */}
        <div className="flex min-h-10 items-center justify-between tablet:grid tablet:grid-cols-3 tablet:items-start tablet:gap-0">
          <div className="flex justify-start">
            <InstagramLink />
          </div>

          <ul className="hidden items-center justify-center gap-x-6 tablet:flex">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={destinationHref(link.href)}
                  className={FOOTER_LINK}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-end justify-center gap-1.5">
            <Link href="/" className={`${FOOTER_BRAND} nav-link no-underline`}>
              Casa Vavva
            </Link>
            <span className={FOOTER_LEGAL} suppressHydrationWarning>
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
