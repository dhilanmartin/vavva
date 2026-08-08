// The glowing green indicator lamp at the top of the waitlist column.
//
// What it actually is: blowing the reference's header mark up 10× in the
// browser settled a question the first pass got wrong. It is not a logo or a
// letterform — it is a small beveled LED panel: a rounded housing with a
// chamfered inner bevel, a radial hotspot sitting slightly above centre, a
// soft mint halo bleeding outside the housing, and a 0.5px white emboss
// along the bottom edge. Which is exactly why its animation is called
// "power-on" and stutters like a filament catching.
//
// That makes it an interface primitive — a status lamp — rather than
// anybody's brand mark, so it is drawn here from the measured treatment
// rather than substituted with a Vavva letterform (the first pass used a V,
// which read as a checkmark and was answering a question nobody asked).
//
// Measured off the reference's live DOM and SVG filter table, 2026-08-07:
//
//   slot        <span> relative inline-block 24×16, vertical-align: top
//   rest layer  16×9 artwork absolutely placed at (4,4) — a flat grey ramp
//               (#EEE → #D8D8D8 → #BBB), i.e. the lamp switched off
//   glow layer  24×16 holding the SAME 16×9 artwork drawn at (4,4), so the
//               halo has 4px of bleed on every side
//   halo        feMorphology dilate r=2 → feGaussianBlur stdDeviation=1 →
//               feComposite operator="out" against hardAlpha (so the halo
//               renders only OUTSIDE the housing, never washing over the
//               lit face) → feColorMatrix flattening it to
//               rgb(.886275, 1, .882353) = #E2FFE1
//   green ramp  their three display-p3 stops, converted to sRGB
//   power-on    0.6s step-end 0.5s both, hard cuts at 0/16/28/44/56/72/100
//               (keyframes live in globals.css as vvPowerOn)

const LIT_EDGE = "#5CF05C";
const LIT_EDGE_DEEP = "#00C000";
const GREY_EDGE = "#EEEEEE";
const GREY_EDGE_DEEP = "#BBBBBB";

// Radial hotspot: bright core falling off to the housing green. Centre sits
// at 45% vertically, matching where the reference's highlight actually pools
// — and the pool is deliberately BROAD (r 0.95, with the bright stop held
// out to 0.38) rather than tight. A small hotspot reads as a gemstone; the
// reference's fills most of the lit face, which is what makes it read as a
// lamp lit from behind rather than a jewel catching a spotlight.
const LIT_CORE = ["#F2FFD2", "#B4FF7A", "#3BE844", "#00CC00"];
const GREY_CORE = ["#FFFFFF", "#F3F3F3", "#E0E0E0", "#C4C4C4"];
const CORE_STOPS = [0, 0.38, 0.74, 1];

function Lamp({ housingId, coreId }: { housingId: string; coreId: string }) {
  return (
    <>
      {/* Housing — the bezel the lamp is seated in. */}
      <rect
        x="0"
        y="0"
        width="16"
        height="9"
        rx="1.6"
        fill={`url(#${housingId})`}
      />
      {/* Lit face, inset so the housing reads as a chamfered bevel. */}
      <rect
        x="1.3"
        y="1.3"
        width="13.4"
        height="6.4"
        rx="0.9"
        fill={`url(#${coreId})`}
      />
    </>
  );
}

function Ramps({
  housingId,
  coreId,
  edge,
  edgeDeep,
  core,
}: {
  housingId: string;
  coreId: string;
  edge: string;
  edgeDeep: string;
  core: string[];
}) {
  return (
    <>
      <linearGradient id={housingId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={edge} />
        <stop offset="1" stopColor={edgeDeep} />
      </linearGradient>
      <radialGradient id={coreId} cx="0.5" cy="0.45" r="0.95">
        {core.map((color, i) => (
          <stop key={color} offset={CORE_STOPS[i]} stopColor={color} />
        ))}
      </radialGradient>
    </>
  );
}

export function PowerOnMark() {
  return (
    <span className="relative inline-block h-4 w-6 align-top">
      {/* Off: grey, always painted, sits under the lit layer. */}
      <svg
        aria-hidden
        width="16"
        height="9"
        viewBox="0 0 16 9"
        fill="none"
        className="absolute left-1 top-1"
      >
        <defs>
          <Ramps
            housingId="vv-lamp-off-housing"
            coreId="vv-lamp-off-core"
            edge={GREY_EDGE}
            edgeDeep={GREY_EDGE_DEEP}
            core={GREY_CORE}
          />
        </defs>
        <Lamp housingId="vv-lamp-off-housing" coreId="vv-lamp-off-core" />
      </svg>

      {/* On: same artwork at (4,4) so the dilate+blur halo has bleed room. */}
      <svg
        aria-hidden
        width="24"
        height="16"
        viewBox="0 0 24 16"
        fill="none"
        className="vv-power-on absolute inset-0"
      >
        <defs>
          <Ramps
            housingId="vv-lamp-on-housing"
            coreId="vv-lamp-on-core"
            edge={LIT_EDGE}
            edgeDeep={LIT_EDGE_DEEP}
            core={LIT_CORE}
          />
          <filter
            id="vv-lamp-glow"
            x="0"
            y="0"
            width="24"
            height="16"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="2"
              result="spread"
            />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.886275 0 0 0 0 1 0 0 0 0 0.882353 0 0 0 1 0"
            />
            <feBlend in2="BackgroundImageFix" result="glow" />
            {/* 0.5px white emboss along the bottom lip. */}
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha2"
            />
            <feOffset dy="0.5" />
            <feComposite in2="hardAlpha2" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
            />
            <feBlend in2="glow" result="lip" />
            <feBlend in="SourceGraphic" in2="lip" result="shape" />
          </filter>
        </defs>
        <g filter="url(#vv-lamp-glow)" transform="translate(4 4)">
          <Lamp housingId="vv-lamp-on-housing" coreId="vv-lamp-on-core" />
        </g>
      </svg>
    </span>
  );
}
