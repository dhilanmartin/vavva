// Case-study tile, modeled on internetlabs.co's portfolio cards (see
// plans/003-viral-direction-brief.md and the CHIP card reference D
// attached 2026-08-12) — big rounded card, soft shadow, then plain
// name/description/pill-tag row below.
//
// 2026-08-12, later same day: swapped the flat-color + wordmark treatment
// for a real product photo, at D's instruction ("just use it... i think
// the point is viral branding"). The photo (house-pbj-trio.png) shows a
// foil-wrapped-bar treatment with printed "20g Protein | 200 Calories"
// callouts — flagged to D before wiring it in as a real tension against
// the design doc's "not another protein bar" premise and its "macros are
// unsolved, don't state as fact" rule. D's call, made knowingly: viral
// branding is the point right now. Not a quiet reversal — see plan 002 and
// 003 for the full context if this needs revisiting.
//
// This is still a deliberate, scoped exception to DESIGN.md's Anti-patterns
// list (cards/pills/shadow banned everywhere else) — see the Products-page
// note added there, now extended to Home/Locations for cross-page
// cohesion. Radius/shadow come from the shared .vv-embed class (globals.css)
// rather than repeating the values here — MediaFrame and LocationCard use
// the same class. `image` is optional: without one, the tile falls back to
// the original flat --red + wordmark treatment (still used if this
// component is reused for a future product with no photo yet).

import Image, { type StaticImageData } from "next/image";

export function ProductTile({
  wordmark,
  emoji,
  name,
  description,
  tags,
  image,
}: {
  wordmark: string;
  emoji: string;
  name: string;
  description: string;
  tags: string[];
  image?: StaticImageData;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="vv-embed relative aspect-[16/9] w-full overflow-hidden bg-[var(--red)]">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes="(min-width: 716px) 716px, 100vw"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-full w-full items-center justify-center gap-3 text-[clamp(2.25rem,9vw,4rem)] font-extrabold uppercase tracking-[-0.02em] text-[var(--paper)]"
          >
            {wordmark}
            <span className="text-[0.7em] not-italic">{emoji}</span>
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 px-1">
        <div className="flex flex-col gap-1">
          <span className="text-[15px] font-semibold text-[var(--ink)]">
            {name}
          </span>
          <span className="text-[14px] text-[var(--mute)]">
            {description}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-black/[0.06] px-3 py-1 text-[13px] font-medium text-[var(--ink)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
