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
  const onShop = pathname.startsWith("/products");
  const backHref = onProduct ? "/products" : "/";
  const backLabel = onProduct ? "Back" : "Home";
  const shopHref = destinationHref("/products");

  return (
    <header className="vv-paper-nav relative z-20 bg-[var(--paper)]">
      <nav
        aria-label="Shop"
        className="relative mx-auto flex h-16 w-full items-center justify-between px-6"
      >
        <Link href={backHref} className={LINK}>
          {backLabel}
        </Link>
        {/* House name in the middle — Balenciaga puts the brand here.
            Absolute so Home/Back vs Products of unequal width cannot pull
            it off centre. */}
        <span
          aria-hidden="true"
          className="vv-shop-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          Vavva
        </span>
        <Link
          href={shopHref}
          aria-current={onShop ? "page" : undefined}
          className={LINK}
        >
          Products
        </Link>
      </nav>
    </header>
  );
}
