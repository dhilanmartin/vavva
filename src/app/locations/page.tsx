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

/* ---- 2026-08-18: the h1 matches Products' ------------------------------

   D: "match the Locations and the Products title text on each given page
   (should b same font/size/bold)."

   This carried `.mimi-title` — 43px/-0.86px — against Products' 48px/-0.96px
   `.mimi-display`. Both were faithful: mimis.nyc really does set its
   locations heading at 43px and its shop heading at 48px, measured on their
   live styles, and this repo reproduced each page against its own
   counterpart.

   THAT IS EXACTLY THE PROBLEM WITH REFERENCING PER PAGE. The two headings
   were never compared to each other, only to their sources, so the site
   ended up with two page-title sizes 5px apart — close enough to look like
   drift rather than intent. One title role for the whole site is worth more
   than matching a reference that was never trying to be consistent with
   itself.

   `.mimi-display` is the survivor because it is the display role by name
   and Products already used it. Everything else is unchanged: both classes
   already shared family (serif), weight 440, colour and centre alignment,
   so this moves font-size and letter-spacing only. `.mimi-title` now has no
   users; it stays in globals.css with the measurement note that justifies
   it, in case a genuinely smaller heading role is ever wanted.

   Page gutter is still 24px, and the h1 still sits 40px below the header. */
export default function LocationsPage() {
  // Disabled 2026-08-07 — see SECONDARY_PAGES_LIVE in src/lib/site.ts.
  if (!SECONDARY_PAGES_LIVE) notFound();

  return (
    <main className="w-full bg-[var(--paper)] px-6 pb-24 pt-10">
      {/* 1710px, matching Nav, the lamp strip and Products — this was the
          one route still on 1400px. No visual change: the entry inside is a
          centred stack capped at 560px, so the container width has never
          been what positions it. Aligning it means the site has one page
          width rather than two, and the next full-bleed element added here
          lines up with the header instead of being 310px narrower. */}
      <div className="mx-auto max-w-[1710px]">
        {/* On-load entrance, 2026-08-18 — same `.home-rise`, same `--i: 3`
            slot as the Products heading, for the reason spelled out there.

            The SKYLINE BELOW IT STAYS STATIC, and that is a constraint
            rather than an omission: the image carries `mix-blend-multiply`
            (LocationCard.tsx), and an ancestor animating opacity or filter
            forces a stacking context for the duration of the animation,
            which cuts the blend off from the page background and shows a
            hard white box around the artwork until the entrance finishes.
            That is exactly why the image already sits outside this page's
            ScrollReveal. The heading and the text block are the two things
            here that can move, so they are the two things that do. */}
        <h1
          className="mimi-display home-rise mb-20"
          style={{ ["--i" as string]: 3 }}
        >
          Locations
        </h1>
        <div className="flex flex-col gap-14 tablet:gap-16">
          {LOCATIONS.map((location) => (
            <LocationCard key={location.name} {...location} />
          ))}
        </div>
      </div>
    </main>
  );
}
