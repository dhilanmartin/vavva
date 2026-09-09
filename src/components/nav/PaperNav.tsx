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

  return (
    <header className="vv-paper-nav relative z-20 bg-[var(--paper)]">
      <nav
        aria-label="Shop"
        className="relative mx-auto flex h-16 w-full items-center justify-between px-6"
      >
        <Link href={backHref} className={LINK}>
          {backLabel}
        </Link>
        {/* 1:1 scale of the landing plate, static, 20px tall. */}
        <span className="gw-nav-slot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ComingSoon size="bar" word="Coming Soon" />
        </span>
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
