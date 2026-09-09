"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { destinationHref } from "@/lib/site";

const LINK =
  "nav-link inline-flex min-h-11 items-center text-[14px] font-semibold uppercase leading-5 tracking-[0.04em] text-black no-underline";

export function PaperNav() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const onProduct = pathname.startsWith("/products/");
  const backHref = onProduct ? "/products" : "/";
  const backLabel = onProduct ? "Back" : "Home";

  return (
    <header className="vv-paper-nav relative z-20 bg-[var(--paper)]">
      <nav
        aria-label="Shop"
        className="relative mx-auto flex h-16 w-full items-center justify-between px-6"
      >
        <Link href={backHref} className={LINK}>
          {backLabel}
        </Link>
        {/* THE PLATE IS NOT IN HERE ANY MORE, 2026-09-09, and it is worth
            saying why rather than leaving a gap where it stood. It was a
            scaled copy of the landing sign, centred between these two links,
            and it announced "Coming Soon" over a catalogue that by then also
            blurred every photograph and disabled every Add to cart. Three
            statements of one fact, and the nav's was the weakest of them:
            chrome that repeats what the page already says is decoration.

            The message now lives in the one place a visitor actually reaches
            for it — the CTA on the product page (ShopPdp.tsx). This row is
            navigation again, which is all a nav owes anyone. */}
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
