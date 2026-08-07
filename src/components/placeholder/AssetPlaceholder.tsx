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

const SYSTEM_GRAY = { light: "#D1D1D6", dark: "#8E8E93" };

export function AssetPlaceholder({
  tone = "light",
  label = "VAVVA ASSET TBD",
  className = "",
}: {
  tone?: "light" | "dark";
  label?: string;
  className?: string;
}) {
  const position = className.includes("absolute") ? "" : "relative";

  return (
    <div className={`${position} overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: SYSTEM_GRAY[tone] }}
      />
      {label ? (
        <span
          className="absolute bottom-2 right-2.5 select-none text-[9px] font-semibold uppercase leading-none tracking-[0.08em]"
          style={{
            color:
              tone === "dark" ? "rgba(232,232,232,0.4)" : "var(--mute)",
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
