import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationCard } from "@/components/locations/LocationCard";
import { SECONDARY_PAGES_LIVE } from "@/lib/site";

export const metadata: Metadata = { title: "Locations — VAVVA" };

// One entry — the studio itself — not the multi-location retail pattern the
// reference site carries, which Vavva has no equivalent of.
//
// Content is D's own, supplied verbatim 2026-08-07. It also resolves the
// "Members Only" flag this file used to carry: that string reintroduced the
// members-club framing DESIGN.md records as deliberately retired on
// 2026-07-31, and "Open Soon" replaces it — which is both consistent with
// the studio's stated positioning and with the landing's "arriving fall
// 2026".
//
// Address shape matches the reference's: street on one line, city/state/ZIP
// on the next, inside a single paragraph, with hours as a separate one.
const LOCATIONS = [
  {
    name: "New York City",
    address: ["Mercer St", "New York NY 10012"],
    status: "Open Soon",
  },
];

/* Type matches mimis.nyc/locations exactly as of 2026-08-07 — h1 at
   43px / 56px leading / -0.86px tracking / weight 400 (.mimi-title), which
   is a genuinely different size from the 48px their Story h1 uses, and is
   fixed rather than fluid: it measured 43px at both 1280 and 375 on their
   site, so the `desktop:` size jump this file used to carry is gone. Page
   gutter is their 24px, and the h1 sits 40px below the 64px header. */
export default function LocationsPage() {
  // Disabled 2026-08-07 — see SECONDARY_PAGES_LIVE in src/lib/site.ts.
  if (!SECONDARY_PAGES_LIVE) notFound();

  return (
    <main className="w-full bg-[var(--paper)] px-6 pb-24 pt-10">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mimi-title mb-20">Locations</h1>
        <div className="flex flex-col gap-14 tablet:gap-16">
          {LOCATIONS.map((location) => (
            <LocationCard key={location.name} {...location} />
          ))}
        </div>
      </div>
    </main>
  );
}
