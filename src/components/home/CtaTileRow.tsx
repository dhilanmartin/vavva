// cta-tile-row.spec.md: 3 equal dark rounded-rect tiles, each a label +
// sublabel (left) and a circular icon badge (right), stacking to 1 column
// on mobile. The reference site showed one badge possibly pulsing to an
// accent fill between scroll positions — the spec flags that as
// unconfirmed ("don't assume it's a hover state"), so it isn't replicated
// here.
//
// Destinations point at the three routed sub-pages this pass ships
// (Locations, Shop, Story) — a content-neutral default per the spec's
// "[VAVVA COPY TBD]" destination field.

import Link from "next/link";

const TILES = [
  { href: "/locations" },
  { href: "/shop" },
  { href: "/story" },
];

export function CtaTileRow() {
  return (
    <section className="px-4 py-10 md:px-5 tablet:px-6 tablet:py-12">
      <ul className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
        {TILES.map((tile) => (
          <li key={tile.href}>
            <Link
              href={tile.href}
              className="flex h-full items-center justify-between gap-4 rounded-[24px] bg-[var(--ink)] px-6 py-6 transition-transform active:scale-[0.98]"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[16px] font-semibold text-[var(--paper)]">
                  [VAVVA COPY TBD]
                </span>
                <span className="text-[13px] text-[var(--paper)]/60">
                  [VAVVA COPY TBD]
                </span>
              </span>
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--paper)]/10 text-[var(--paper)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
