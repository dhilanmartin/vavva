import type { Metadata } from "next";
import { LocationCard } from "@/components/locations/LocationCard";
import { ScrollReveal } from "@/components/reveal/ScrollReveal";

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

export default function LocationsPage() {
  return (
    <main className="w-full bg-[var(--paper)] px-4 pb-24 pt-10 md:px-5 tablet:px-6 tablet:pt-14">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="mb-16 text-center font-serif text-[36px] font-normal leading-[1.17] tracking-[-0.02em] text-[var(--ink)] tablet:mb-20 desktop:text-[48px]">
          Locations
        </h1>
        <div className="flex flex-col gap-14 tablet:gap-16">
          {LOCATIONS.map((location) => (
            <ScrollReveal key={location.name}>
              <LocationCard {...location} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}
