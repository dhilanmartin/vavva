// Structural stand-in for every image/video slot mimi's site has. Per
// SKILL.md's hard constraints, nothing is downloaded from mimis.nyc — every
// visual on this branch is one of these until D supplies real photography.
//
// Sizing/aspect-ratio/rounding are left to the caller's `className` (e.g.
// `aspect-[4/5] tablet:aspect-[16/9] rounded-[24px]`) rather than baked in
// here, so one component can serve the hero, the product grid, the location
// illustrations, and the story triptychs without a prop per shape.
//
// Flat Apple system-gray fills (HIG systemGray palette) — plain layout
// blocking, not a design decision, so D can read section rhythm/copy gaps
// without a gradient reading as "finished." No new brand hues, per DESIGN.md.
// Values live as --placeholder-light/-dark in globals.css, alongside the
// rest of the palette tokens, not hardcoded here.

// `fill` (2026-08-18) overrides the grey for callers that want a solid colour
// instead of layout blocking — see Triptych.tsx. `tone` keeps its job either
// way: it decides the LABEL's contrast, not the background, so a caller that
// sets a dark fill passes tone="dark" and gets a light label. Deliberately
// not derived from `fill`: the value can be a CSS custom property, which no
// amount of JS can read a luminance out of at render time.
const SYSTEM_GRAY = { light: "var(--placeholder-light)", dark: "var(--placeholder-dark)" };

export function AssetPlaceholder({
  tone = "light",
  fill,
  label = "VAVVA ASSET TBD",
  className = "",
}: {
  tone?: "light" | "dark";
  fill?: string;
  label?: string;
  className?: string;
}) {
  const position = className.includes("absolute") ? "" : "relative";

  return (
    <div className={`${position} overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: fill ?? SYSTEM_GRAY[tone] }}
      />
      {label ? (
        <span
          aria-hidden
          className="absolute bottom-2 right-2.5 select-none text-[9px] font-semibold uppercase leading-none tracking-[0.08em]"
          style={{
            color:
              tone === "dark" ? "rgba(255,255,255,0.45)" : "var(--mute)",
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
