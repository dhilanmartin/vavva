/* Footer — one ledger row above a hairline.
   ===========================================================================

   Rebuilt 2026-08-19. What was here was mimis.nyc's footer reproduced to the
   pixel: an 80px bar, 20px padding on all four sides, three EQUAL thirds
   measured over CDP at a 1440 viewport (450.7px each), their 14/600/20
   uppercase links, their two-line right zone. It was faithful and it was
   the clearest example on the site of DESIGN.md anti-pattern #1 — sourcing
   numbers from another site's inspector instead of authoring them.

   The replacement is the same information in the system's own terms: ledger
   type, the page container, one hairline. It is shorter because there is
   less to say — three links, a handle and a copyright — and a footer sized
   to its contents is the point of the "let it be short" rule that also
   governs the interior pages.

   The rule is a real background rather than a border so it cannot add a
   pixel of layout height, which is the bug that made the old bar 81px
   against a spec of 80. */

import Link from "next/link";
import { InstagramLink } from "@/components/social/InstagramLink";
import {
  CONTACT_HREF,
  NAV_DESTINATIONS_PARKED,
  SECONDARY_PAGES_LIVE,
} from "@/lib/site";

/* Kept in step with Nav's set deliberately: a footer listing different
   destinations than the header is a second, quieter IA to maintain.
   Filtered by SECONDARY_PAGES_LIVE for the same reason Nav is — this file
   must never be what resurrects links to disabled routes. Contact is not a
   route, so the list can never go empty. */
const LINKS = [
  ...(SECONDARY_PAGES_LIVE
    ? [
        { href: "/locations", label: "Locations" },
        { href: "/products", label: "Products" },
        { href: "/story", label: "Our Story" },
      ]
    : []),
  { href: CONTACT_HREF, label: "Contact", external: true },
];

export function Footer() {
  return (
    <footer className="w-full">
      <div className="vv-page">
        <div className="h-px w-full bg-[var(--rule)]" />

        <div className="flex flex-col gap-6 py-8 tablet:flex-row tablet:items-center tablet:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vv-ledger vv-nav-link"
                  >
                    {link.label}
                  </a>
                ) : (
                  /* Parked with the header, not independently — a footer
                     still routing to /products while the nav sent everything
                     home would be the one place the parking leaked. */
                  <Link
                    href={NAV_DESTINATIONS_PARKED ? "/" : link.href}
                    className="vv-ledger vv-nav-link"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <InstagramLink />
            {/* Not a link. Theirs pointed at a privacy page; this site has no
                such route, and shipping a link to a route that does not exist
                is worse than not shipping the link. */}
            <span className="vv-ledger vv-ledger-mute">
              Casa Vavva © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
