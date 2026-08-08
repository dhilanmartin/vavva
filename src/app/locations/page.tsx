import type { Metadata } from "next";
import { LocationCard } from "@/components/locations/LocationCard";

export const metadata: Metadata = { title: "Locations — VAVVA" };

// locations-page.spec.md flags this as an open question ("does Vavva's IA
// need this at all?"). Simplified per the owner's 2026-08-06 note and
// reference mockup to keep thin sections minimal: one real entry (the
// studio itself), not a multi-location retail pattern Vavva doesn't have.
//
// Copy is the owner's own, from the 2026-08-06 mockup. Flagging rather than
// silently resolving: "Members Only" reintroduces the members-club framing
// DESIGN.md's Copy section records as deliberately retired on 2026-07-31
// ("a creative studio, not a private members club"). Shipped as given —
// this needs the owner's call, not mine, on whether that reversal is
// intentional for this page or should read differently (e.g. "By
// appointment").
const LOCATIONS = [
  {
    name: "Casa Vavva",
    location: "New York City, NY",
    status: "Members Only",
  },
];

/* Type matches mimis.nyc/locations exactly as of 2026-08-07 — h1 at
   43px / 56px leading / -0.86px tracking / weight 400 (.mimi-title), which
   is a genuinely different size from the 48px their Story h1 uses, and is
   fixed rather than fluid: it measured 43px at both 1280 and 375 on their
   site, so the `desktop:` size jump this file used to carry is gone. Page
   gutter is their 24px, and the h1 sits 40px below the 64px header. */
export default function LocationsPage() {
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
