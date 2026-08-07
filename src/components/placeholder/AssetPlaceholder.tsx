// Structural stand-in for every image/video slot mimi's site has. Per
// SKILL.md's hard constraints, nothing is downloaded from mimis.nyc — every
// visual on this branch is one of these until D supplies real photography.
//
// Sizing/aspect-ratio/rounding are left to the caller's `className` (e.g.
// `aspect-[4/5] tablet:aspect-[16/9] rounded-[24px]`) rather than baked in
// here, so one component can serve the hero, the product grid, the location
// illustrations, and the story triptychs without a prop per shape.
//
// Colors are alpha ramps of the two neutrals already in the palette (black
// for `dark`, black-on-paper for `light`) — no new brand hues, per DESIGN.md.

export function AssetPlaceholder({
  tone = "light",
  label = "VAVVA ASSET TBD",
  className = "",
}: {
  tone?: "light" | "dark";
  label?: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            tone === "dark"
              ? "linear-gradient(155deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.68) 100%)"
              : "linear-gradient(155deg, rgba(0,0,0,0.09) 0%, rgba(0,0,0,0.03) 100%)",
        }}
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
