import type { Metadata } from "next";
import { LocationCard } from "@/components/locations/LocationCard";

export const metadata: Metadata = { title: "Locations — VAVVA" };

// locations-page.spec.md flags this as an open question ("does Vavva's IA
// need this at all?"). The owner's build instructions list Locations among
// the routes to ship, so it's built — two placeholder entries, enough to
// show the repeating-card pattern without inventing a real address.
const LOCATIONS = [1, 2];

export default function LocationsPage() {
  return (
    <main className="w-full bg-[var(--paper)] px-4 pb-24 pt-10 md:px-5 tablet:px-6 tablet:pt-14">
      <div className="mx-auto max-w-[900px]">
        <h1 className="mb-12 text-center font-serif text-[36px] font-normal tracking-[-0.02em] text-[var(--ink)] tablet:mb-16 desktop:text-[48px]">
          Locations
        </h1>
        <div className="flex flex-col gap-14 tablet:gap-16">
          {LOCATIONS.map((id) => (
            <LocationCard key={id} />
          ))}
        </div>
      </div>
    </main>
  );
}
