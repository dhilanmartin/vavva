// footer.spec.md: thin divider + 3-zone row (mark / secondary links /
// wordmark text + legal), same 4 links on every page, link row absent on
// mobile.
//
// bg-[var(--paper)] added 2026-08-06: DiaGradient (dia-stage) is pinned to
// the viewport bottom at z-index 0, and this footer previously had no
// background of its own — so on any page tall enough for the footer to
// land where the aurora renders, the gradient showed through behind the
// footer's text instead of being occluded by it. DESIGN.md's own model is
// "opaque sections cover the aurora, paper-colored ones read through it";
// this footer just wasn't opaque before.
//
// Two deliberate departures from the spec's literal content fields:
// - No image logo here. DESIGN.md's Anti-patterns bans "a second VAVVA
//   anywhere, at any scale... including a footer stamp," and says that
//   needs D's explicit sign-off — which hasn't happened. The brand wordmark
//   text slot is set in plain type instead, not the PNG mark.
// - No legal link. mimi's footer legal link points at a /privacy page, and
//   recon flagged /privacy as out of scope ("not inspected... beyond 'small
//   legal-text page'"); the owner's route list for this pass is Home /
//   Locations / Shop / Story / Gift Cards only. Shipping a link to a route
//   that doesn't exist would be a half-finished state, so a plain copyright
//   line fills that slot instead.
//
// Link set mirrors mimi's own footer IA: Locations is deliberately excluded
// here (it's already prominent in the primary nav) — Story, Gift Cards,
// Shop, Contact is the same 4-link count the reference site carries.

// UNMOUNTED as of 2026-08-07 — layout.tsx no longer renders this, at D's
// instruction ("keep the vavva header, and remove its footer"). Kept on disk
// rather than deleted, the same way Hero/AccessGate/FeatureBlock/CtaTileRow/
// Newsletter/IconTextBlock/Timeline are kept: paused, not gone. It still
// compiles and still type-checks, so it can be remounted in one line.
//
// The per-link `gated` flags went with GATED_ROUTES_LIVE (see src/lib/site.ts)
// — every route in this list renders unconditionally now.
//
// Gift Cards dropped from the link set the same day: D removed that route
// ("remove the gift card page for now") and it no longer exists, so this is
// down to 3 links against the reference site's 4. Left as 3 rather than
// padded back up with something invented — the row is a flex-wrap list and
// reads fine at any count.

import { CONTACT_HREF } from "@/lib/site";

// Labels track Nav's — see the note on PRIMARY_LINKS there. Routes unchanged.
const LINKS = [
  { href: "/story", label: "Our Story" },
  { href: "/shop", label: "Merch" },
  { href: CONTACT_HREF, label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/10 bg-[var(--paper)] px-4 py-8 md:px-5 tablet:px-6">
      <div className="mx-auto flex max-w-[1710px] flex-col items-center gap-6 tablet:flex-row tablet:justify-between">
        <div aria-hidden className="hidden tablet:block tablet:flex-1" />

        <ul className="hidden flex-wrap items-center justify-center gap-x-6 gap-y-2 tablet:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="footer-link text-[13px] font-medium uppercase tracking-[0.04em] text-[var(--mute)] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-1 flex-col items-center gap-1 tablet:items-end">
          <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--ink)]">
            VAVVA
          </span>
          <span className="text-[11px] text-[var(--mute)]">
            © {new Date().getFullYear()} Casa Vavva
          </span>
        </div>
      </div>
    </footer>
  );
}
