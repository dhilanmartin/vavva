// locations-page.spec.md / COMPONENT_INVENTORY.md §8: illustration (left) +
// text block (right) — name, 2-line address, hours — same side every entry,
// not alternating. Stacks to image-above-text on mobile.

import { SkylineSketch } from "./SkylineSketch";

// Redesigned 2026-08-06 per D's reference mockup: one location, sketch
// illustration left / text right, no card chrome, generous whitespace —
// replaces the earlier stacked image-over-text card pattern.
export function LocationCard({
  name,
  location,
  status,
}: {
  name: string;
  location: string;
  status: string;
}) {
  return (
    <div className="flex flex-col items-center gap-10 tablet:flex-row tablet:items-center tablet:gap-20">
      <SkylineSketch className="w-full max-w-[560px] tablet:w-[46%] tablet:max-w-none" />
      <div className="flex flex-col gap-5 text-center tablet:text-left">
        <h3 className="font-serif text-[32px] font-normal tracking-[-0.01em] text-[var(--ink)] desktop:text-[36px]">
          {name}
        </h3>
        <p className="text-[18px] leading-[1.6] text-[var(--ink)]">{location}</p>
        <p className="text-[18px] leading-[1.6] text-[var(--ink)]">{status}</p>
      </div>
    </div>
  );
}
