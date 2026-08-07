// Original line-art skyline sketch: thin single-weight ink stroke, no fill,
// generic Lower-Manhattan-style silhouette (spire tower + mixed mid-rise
// blocks) over a loose water line. Hand-authored SVG, not traced from any
// reference image — per D's 2026-08-06 note, the Locations page should
// carry an actual sketch here instead of a flat placeholder.

export function SkylineSketch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 620 360"
      fill="none"
      className={className}
      stroke="var(--ink)"
      strokeWidth="1.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* low left blocks */}
      <path d="M20 300V250h34v50" />
      <path d="M54 300V230h28v70" />
      <path d="M82 300V260h22v40" />
      <path d="M104 300V210h30v90" />
      <path d="M104 210l15-14 15 14" />

      {/* mid blocks approaching the spire */}
      <path d="M148 300V190h26v110" />
      <path d="M174 300V150h24v150" />
      <path d="M198 300V175h20v125" />

      {/* spire tower, focal point */}
      <path d="M240 300V120h44v180" />
      <path d="M262 120V40" />
      <path d="M254 60h16" />

      {/* right of spire, denser cluster */}
      <path d="M292 300V160h24v140" />
      <path d="M316 300V200h18v100" />
      <path d="M340 300V140h30v160" />
      <path d="M340 140l15-16 15 16" />
      <path d="M386 300V185h22v115" />
      <path d="M414 300V225h26v75" />
      <path d="M414 225l13-12 13 12" />
      <path d="M456 300V245h20v55" />
      <path d="M480 300V265h34v35" />
      <path d="M520 300V255h18v45" />
      <path d="M542 300V270h30v30" />

      {/* light window ticks, sparse */}
      <path d="M116 230h6M116 250h6M116 270h6" strokeWidth="0.8" />
      <path d="M186 175h6M186 195h6M186 215h6M186 235h6" strokeWidth="0.8" />
      <path d="M252 145h6M252 175h6M252 205h6M252 235h6M252 265h6" strokeWidth="0.8" />
      <path d="M352 165h6M352 195h6M352 225h6" strokeWidth="0.8" />

      {/* waterline */}
      <path d="M0 300h620" strokeWidth="1.4" />
      <path d="M10 316q20-6 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0" strokeWidth="0.8" opacity="0.5" />
      <path d="M10 332q25-5 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0 50 0" strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}
