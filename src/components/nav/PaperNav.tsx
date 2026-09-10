"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComingSoon } from "@/components/glitch/ComingSoon";
import { destinationHref } from "@/lib/site";

const LINK =
  "nav-link inline-flex min-h-11 items-center text-[14px] font-semibold uppercase leading-5 tracking-[0.04em] text-black no-underline";

export function PaperNav() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const onProduct = pathname.startsWith("/products/");
  const backHref = onProduct ? "/products" : "/";
  const backLabel = onProduct ? "Back" : "Home";

  /* The catalogue stands the mark up at 52px in its own band, where its
     heading used to be (products/page.tsx), so a second copy in this row
     would be the same object twice on one screen. Every other interior route
     keeps it here, small, as chrome. */
  const markInPage = pathname === "/products";

  return (
    <header className="vv-paper-nav relative z-20 bg-[var(--paper)]">
      <nav
        aria-label="Shop"
        className="relative mx-auto flex h-16 w-full items-center justify-between px-6"
      >
        <Link href={backHref} className={LINK}>
          {backLabel}
        </Link>
        {/* THE HOUSE'S MARK, centred between the two links — a 32px scaled
            render of the landing plate (ComingSoon.tsx), static and not a
            link.

            IT SAYS VAVVA, and that word is the entire difference between this
            and the version that was removed hours earlier. That one read
            COMING SOON over a catalogue that also blurred every photograph
            and disabled every Add to cart: chrome repeating what the page
            already said twice. A wordmark repeats nothing. It is the one
            thing a header is actually for, and it is the reason this row can
            centre something at all — Home and Products are wayfinding, and
            what belongs between them is whose shop this is.

            It is absolutely positioned so it centres on the NAV, not on the
            gap between two links of unequal width (Back is 45px, Products is
            82px — flex would sit it 18px right of centre). */}
        {markInPage ? null : (
          <span className="gw-nav-slot absolute left-1/2 top-1/2">
            <ComingSoon size="bar" word="Vavva" />
          </span>
        )}
        <Link
          href={destinationHref("/products")}
          aria-current={pathname.startsWith("/products") ? "page" : undefined}
          className={`${LINK} underline`}
        >
          Products
        </Link>
      </nav>
    </header>
  );
}
