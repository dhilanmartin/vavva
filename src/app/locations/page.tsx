import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationCard } from "@/components/locations/LocationCard";
import { PageOpen } from "@/components/page/PageOpen";
import { SECONDARY_PAGES_LIVE } from "@/lib/site";

export const metadata: Metadata = { title: "Locations — VAVVA" };

/* One location, and the page says so plainly rather than dressing a single
   entry up as a directory. */
const LOCATIONS = [
  {
    name: "New York City",
    address: ["Mercer St", "New York NY 10012"],
    status: "Open Soon",
  },
];

export default function LocationsPage() {
  if (!SECONDARY_PAGES_LIVE) notFound();

  return (
    <main className="w-full pb-32">
      <PageOpen title="Locations">
        <div className="flex flex-col gap-16">
          {LOCATIONS.map((location) => (
            <LocationCard key={location.name} {...location} />
          ))}
        </div>
      </PageOpen>
    </main>
  );
}
