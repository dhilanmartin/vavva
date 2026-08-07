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
// route, and sits in the secondary slot on every breakpoint since it never
// needs to hide behind the hamburger. Gift Cards is footer-only per the
// reference site's own IA — intentionally not in this nav.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { VavvaMark } from "@/components/brand/VavvaMark";
import { CONTACT_HREF } from "@/lib/site";

const PRIMARY_LINKS = [
  { href: "/locations", label: "Locations" },
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Story" },
];

const navLinkClass = (active: boolean) =>
  `nav-link text-[16px] font-semibold uppercase tracking-[0.01em] text-[var(--ink)] underline-offset-[6px] transition-colors ${
    active ? "underline" : "no-underline"
  }`;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 bg-[var(--paper)]">
      <div className="mx-auto flex h-16 max-w-[1710px] items-center px-4 md:px-5 tablet:px-6">
        <div className="flex flex-1 items-center justify-start">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="-ml-2 flex h-11 w-11 items-center justify-center tablet:hidden"
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

          <ul className="hidden items-center gap-8 tablet:flex">
            {PRIMARY_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={navLinkClass(active)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Link
          href="/"
          aria-label="Vavva — home"
          className="flex flex-1 items-center justify-center"
        >
          <VavvaMark className="h-auto w-[88px]" />
        </Link>

        <div className="flex flex-1 items-center justify-end">
          <a href={CONTACT_HREF} className={navLinkClass(false)}>
            Contact
          </a>
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
          <ul className="flex flex-col gap-1 px-4 pb-6 pt-2 md:px-5">
            {PRIMARY_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block py-2 text-[16px] font-bold uppercase tracking-[0.01em] text-[var(--ink)] ${
                      active ? "underline underline-offset-[6px]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
