"use client";

// nav.spec.md: 3-zone flex row (primary links left, logo centre, secondary
// link right), collapsing below 810px to hamburger-left / logo-centre /
// secondary-link-right, with primary links moving into an in-flow panel that
// pushes page content down (not an overlay). Mimi's site also carries a cart
// icon-button in the right zone; Vavva has no cart/checkout, and the spec's
// own content-field note says only add that affordance "if Vavva's IA
// actually needs" it — it doesn't, so it's omitted rather than added as
// chrome for its own sake.
//
// Route destinations per PAGE_TOPOLOGY.md: primary nav = Locations, Shop,
// Story (the 3 nav-reachable pages). Contact is a mailto: handoff, not a
// route, and sits in the secondary slot at tablet and up.
//
// On-load entrance (2026-08-07): mimis.nyc's own nav fades + rises in on
// load (measured: opacity 0->1, translateY -20px->0, easing out over
// ~0.6-0.8s) — a structural/behavioral fact, not their content, so it's
// fair game the same way every other measured value on this branch is.
// Reuses Vavva's own already-established .home-rise system (site-wide via
// the intro-js/intro-go classes stamped on <html> in layout.tsx, not a
// home-page-only mechanism) rather than inventing separate motion tokens
// for just the nav — same fade+rise+blur shape, same 0.5s curve.
//
// ---- 2026-08-07 revision, against D's own mobile-header reference ----
//
// Measured off mimis.nyc rather than eyeballed from the screenshot, then
// cross-checked against it (their logo renders 60px wide, which is exactly
// half its width in D's 2x capture — so the capture reads 1:1 in points and
// every offset below could be verified against it):
//
//   header height        64px, flat at every width (re-measured on
//                         mimis.nyc 2026-08-14; it briefly ran 200px
//                         tablet+ / 80px mobile — see the mark note below)
//   page gutter          24px            (was 16/20/24 stepped; now flat 24)
//   panel link type      Inter 600 / 16px / uppercase, same as the desktop
//                        row — the mobile links are NOT scaled up
//   panel row pitch      32px
//   panel top offset     ~24px below the header
//   link states          rest #000 / none, hover accent + underline,
//                        current #111 + underline  (see globals.css)
//
// Two departures, both deliberate:
// - The accent is Vavva red, not their yellow. D's call.
// - Contact joins the panel on mobile. Their panel lists all four
//   destinations and the right zone holds the cart instead; Vavva has no
//   cart, so parking Contact alone in an otherwise-empty right zone would
//   have been the one place this nav read as emptier than the reference.
//   It keeps its tablet+ position unchanged.
//
// The 32px row pitch is below this repo's usual 44px control floor but
// clears WCAG 2.5.8 AA (24px) on both axes — each link is a full-width
// block — so the reference value is kept rather than overridden.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { VavvaMark } from "@/components/brand/VavvaMark";
import {
  CONTACT_HREF,
  NAV_DESTINATIONS_PARKED,
  SECONDARY_PAGES_LIVE,
} from "@/lib/site";

// "Merch" reverted to "Shop" 2026-08-07, then "Shop" renamed to "Products"
// 2026-08-12 (label and route together, same rule as the 2026-08-07 move —
// see products/page.tsx). "Our Story" keeps its label/route split.
const PRIMARY_LINKS = [
  { href: "/locations", label: "Locations" },
  { href: "/products", label: "Products" },
  { href: "/story", label: "Our Story" },
];

// Leading is deliberately NOT set here: the row is 20px in the header bar and
// 32px in the mobile panel, and two line-height utilities on one element are
// decided by stylesheet order rather than by the order they're concatenated
// in — so each call site sets its own.
//
// 2026-08-07, re-measured against mimis.nyc/story at 1280 for a 1:1 match on
// D's request. Three things were off and all three are corrected here:
//
//   underline offset   was 6px, reference is `auto` — the browser's own
//                      font-derived position. 6px sat the rule visibly low
//                      and was the single most obvious difference.
//   letter-spacing     was 0.01em, reference is `normal` (0). Tiny, but it
//                      widened every link and made the row read looser.
//   colour             was --ink (#1A1A1A on white) for both states;
//                      reference is #000 at rest and #111 for the current
//                      page. Kept literal here rather than tokenised
//                      because "1:1" was the ask and the two values are a
//                      deliberate pair on that site — the current page is
//                      very slightly LIGHTER than its siblings, not darker.
//
// Everything else already matched and is left alone: Inter, 16px, weight
// 600, 20px line-height, uppercase, 20px gap, 24px gutter, 64px bar.
// inline-block so the :active press-scale in globals.css can apply — a
// non-replaced inline box ignores `transform` entirely. `transition-colors`
// is gone with it: .nav-link now owns its own transition (colour + the
// press transform together), and two transition declarations on one element
// are resolved by stylesheet order rather than by concatenation order.
const navLinkClass = (active: boolean) =>
  `nav-link inline-block text-[16px] font-semibold uppercase ${
    active ? "text-[#111] underline" : "text-black no-underline"
  }`;

/* One nav item, rendered as a real link or as an inert label.
   D, 2026-08-07: "ensure the buttons are still visible on the header even
   tho they are disabled. just have them click to nothing."

   When SECONDARY_PAGES_LIVE is false this renders a <span>, not an <a>. It
   is NOT an anchor with a dead href: that would still be focusable, still
   announce as a link, still show a target in the status bar, and — with the
   routes 404ing — would hand anyone who clicked it a Not Found page, which
   is exactly the "click to nothing" D is ruling out.

   The span is visually identical to a live link (same class, same colour,
   same weight — it should not read as greyed out), but carries
   aria-disabled so assistive tech announces it as unavailable rather than
   silently offering a link that goes nowhere, and drops the press-scale,
   since feedback on a press that does nothing is a small lie. */
function NavItem({
  href,
  label,
  active,
  className,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  className: string;
  onNavigate?: () => void;
}) {
  if (!SECONDARY_PAGES_LIVE) {
    return (
      <span
        aria-disabled="true"
        className={`${className} ${navLinkClass(false)} nav-link-inert`}
      >
        {label}
      </span>
    );
  }

  /* PARKED: a real link that goes home (see NAV_DESTINATIONS_PARKED in
     src/lib/site.ts). D asked for the header to stay "clickable and
     hoverable" while every button lands on the coming-soon page, which is a
     different thing from the `SECONDARY_PAGES_LIVE` branch above — that one
     renders inert <span>s with no href and no hover.

     `active` is forced FALSE rather than recomputed. Every parked item
     resolves to `/`, so on the landing all three would satisfy
     `pathname === href` at once and the header would show three current
     pages — `aria-current="page"` on three links, three underlines. A
     header where everything is current tells a visitor nothing, and tells a
     screen reader something false. */
  const parked = NAV_DESTINATIONS_PARKED;
  const target = parked ? "/" : href;
  const isCurrent = parked ? false : active;

  return (
    <Link
      href={target}
      aria-current={isCurrent ? "page" : undefined}
      onClick={onNavigate}
      className={`${className} ${navLinkClass(isCurrent)}`}
    >
      {label}
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = PRIMARY_LINKS.map((link) => ({
    ...link,
    active: pathname === link.href,
  }));

  return (
    <header className="relative z-20 bg-[var(--paper)]">
      {/* THE MARK IS ABSOLUTELY CENTRED, and the side zones size to their own
          content. This replaced three `flex-1` zones, which looked like the
          right way to centre a mark and failed at a specific band of widths.

          The failure, measured at 856px: a third of the bar is 269px, and
          "LOCATIONS SHOP OUR STORY" at 16px/600 needs 277px. Eight pixels
          short. The zone could not grow — the other two thirds were holding
          their width — so the only give in the system was the text, and "OUR
          STORY" broke across two lines, taking the link row to 42px inside a
          64px bar.

          Adding `white-space: nowrap` alone would have moved the problem
          rather than fixed it: a flex item's default `min-width: auto` stops
          it shrinking below its content, so the left zone would then push
          past its third and shove the mark off-centre — trading a wrapped
          label for a mark that drifts as the labels change.

          Out of flow, the mark is pinned to the true centre of the bar at
          every width, and the side zones are free to be whatever width their
          content needs. The centring transform lives on this wrapper rather
          than on the <Link>, because the link carries `home-rise`, whose
          keyframes animate `transform` — one element cannot hold both a
          static centring translate and an animated one. */}
      <div className="relative mx-auto flex h-16 max-w-[1710px] items-center justify-between px-6">
        <div
          className="home-rise flex items-center justify-start"
          style={{ ["--i" as string]: 0 }}
        >
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="nav-toggle -ml-2 flex h-11 w-11 items-center justify-center tablet:hidden"
          >
            <span aria-hidden className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-full bg-[var(--ink)] transition-transform duration-300 ease-[var(--ease-out)] ${
                  open ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-[var(--ink)] transition-transform duration-300 ease-[var(--ease-out)] ${
                  open ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>

          <ul className="hidden items-center gap-5 tablet:flex">
            {links.map((link) => (
              <li key={link.href}>
                <NavItem {...link} className="leading-5" />
              </li>
            ))}
          </ul>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-0 flex h-full -translate-x-1/2 items-center">
          <Link
            href="/"
            aria-label="Vavva — home"
            className="home-rise pointer-events-auto flex items-center"
            style={{ ["--i" as string]: 1 }}
          >
          {/* Sized by HEIGHT, not width: a nav bar sizes marks by height,
              which is what sets the row's optical rhythm.

              ---- 2026-08-14: back to 64px / 31px, flat ----

              D: "fix the size of the vavva logo... it should be much
              smaller so that the header is the same size as mimis."

              This reverts the 2026-08-12 casajondal.es pass, which had
              grown the bar to 200px (tablet+) to hold a 152px mark,
              matching the wordmark on a site whose wordmark IS its header
              — no bar, no persistent nav, sitting alone over a full-bleed
              illustration. Vavva's header is real chrome on every route,
              so that was always a strained comparison; against mimis it
              is simply the wrong number.

              Re-measured on mimis.nyc at 1280 rather than recalled:

                bar        64px, flat — it does not step at any width
                logo       60x22px, an SVG, centred, top: 21 in the bar
                gutter     24px
                nav links  Inter 600 / 16px / 20px tall

              The bar is now `h-16` at every width, matching theirs
              exactly. It had been 80px on mobile and 200px above tablet.

              The MARK stays 31px rather than dropping to their literal
              22px, and that is a deliberate departure with history: 31px
              is the number D landed on for this exact question on
              2026-08-07, when matching 22px was tried and rejected as
              overshooting. The reason still holds — the brush script
              carries real ascenders and descenders where "Mimi's" sits
              compact, so the same numeric height reads visibly smaller on
              this wordmark. 31px lands it ~67px wide, close to their 60px
              of width, and sits in a 64px bar with ~16px of air above and
              below.

              ---- 2026-08-18: 31 -> 40 -> back to 31 ----

              It went to 40px for one pass ("just make it a lil bigger to b
              more visual"), the same day the white glow came off on the
              landing where the mark sits on sky at 1.2:1 — size does not fix
              contrast, but a bigger wordmark is recognised rather than read.
              D put it back the same day, so 31px stands.

              That returns this to the number reached on 2026-08-07, when
              matching mimis' literal 22px was tried and rejected as
              overshooting: the brush script carries real ascenders and
              descenders where "Mimi's" sits compact, so the same numeric
              height reads visibly smaller on this wordmark.

              So: the header is the same size as mimis' (the ask), and the
              mark is the size this repo has now decided on twice. See not-found.tsx for the one other file
              that has to know the bar height. */}
            <VavvaMark className="h-[31px] w-auto" />
          </Link>
        </div>

        <div
          className="home-rise flex items-center justify-end"
          style={{ ["--i" as string]: 2 }}
        >
          {/* Visibility lives on a WRAPPER, not on the link.

              `hidden tablet:inline` on the link itself did not work, and the
              reason is not obvious from reading the markup: navLinkClass()
              also contributes `inline-block` (which .nav-link needs, since
              `transform` has no effect on a non-replaced inline box and the
              press-scale would silently do nothing). Tailwind emits display
              utilities in its own canonical order — `.hidden` before
              `.inline-block` — and both are plain single-class selectors, so
              source order decides and `inline-block` wins.

              The result was CONTACT visible in the header bar at every width,
              including mobile, where it ALSO appears in the open panel. Two
              of the same link on one screen.

              A wrapper separates the two concerns: it owns display, the link
              owns inline-block, and neither can override the other. */}
          {/* target/rel because CONTACT_HREF is an external https link as of
              2026-08-18, not a `mailto:` — see src/lib/site.ts. A mailto
              hands off to a mail client and leaves the page where it is;
              this one navigates away, and opening it in a new tab is what
              preserves that behaviour. */}
          <div className="hidden tablet:block">
            <a
              href={CONTACT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`leading-5 ${navLinkClass(false)}`}
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* In-flow panel: grid-rows technique in globals.css animates from an
          unmeasured content height to 0 and back — not an overlay/drawer. */}
      <div
        id="nav-panel"
        inert={!open}
        className={`nav-panel tablet:hidden ${open ? "is-open" : ""}`}
      >
        <div>
          {/* `--i` per row drives the staggered entrance in globals.css —
              the same index-as-custom-property mechanism .home-rise uses
              in the header row above and the product grid uses on its
              tiles. Contact is the last row, so its index continues the
              list's rather than restarting at 0. */}
          <ul className="flex flex-col px-6 pb-8 pt-6">
            {links.map((link, i) => (
              <li key={link.href} style={{ ["--i" as string]: i }}>
                <NavItem
                  {...link}
                  className="block leading-[32px]"
                  onNavigate={() => setOpen(false)}
                />
              </li>
            ))}
            <li style={{ ["--i" as string]: links.length }}>
              <a
                href={CONTACT_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`block leading-[32px] ${navLinkClass(false)}`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
