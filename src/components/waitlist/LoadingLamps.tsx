/* A row of indicator lamps that lights up on load and stays on.
   ===========================================================================

   This grows the single status lamp (PowerOnMark.tsx) into a strip that runs
   across the top of the column above the video. Same lamp, same measured
   treatment — the only new idea is the stagger.

   The strip lights left to right once on load and then stays lit — an
   entrance, not a loop. Each lamp reuses the single mark's own power-on
   flicker, offset 60ms from its neighbour, so the row catches like nineteen
   filaments rather than nineteen opacity fades. Timings and the reasoning for
   the fill mode live with the rule in globals.css (`.vv-lamp`).

   ONE <svg>, NOT NINETEEN. Each lamp needs a housing gradient, a core
   gradient and a glow filter, and those are referenced by id. Nineteen copies
   of PowerOnMark would put nineteen elements with `id="vv-lamp-on-core"` in
   one document — invalid, and worse than invalid in practice, because every
   `url(#…)` reference resolves to the FIRST match, so all nineteen lamps
   would quietly share the first one's gradients and any per-instance change
   would silently do nothing. The defs are declared once here and the lamps
   are groups inside the same svg.

   The stagger is CSS, not JS: `animation-delay` off a per-lamp `--i`. That
   keeps it on the compositor, costs no hydration, and means the sequence
   cannot desync from a re-render — nineteen JS timers would drift apart the
   moment the tab is backgrounded.

   The grey lamp underneath is always painted, so a position the packet has
   not reached reads as an unlit lamp rather than as empty space. Without it
   the strip would appear to be four lights flying through a void; with it,
   it is a row of nineteen lamps with four of them on.

   19 lamps at a 24px pitch is 456px, which fills the 460px column almost
   exactly. The viewBox scales the whole strip down on narrower screens rather
   than dropping lamps, so the count never changes and the sequence always
   reads the same. */

const COUNT = 19;
const PITCH = 24;
const LAMP_W = 16;
const LAMP_H = 9;
const ROW_H = 16;

// Measured off the reference's live SVG filter table — see PowerOnMark.tsx,
// which documents where each of these came from.
const LIT_EDGE = "#5CF05C";
const LIT_EDGE_DEEP = "#00C000";
const GREY_EDGE = "#EEEEEE";
const GREY_EDGE_DEEP = "#BBBBBB";

const LIT_CORE = ["#F2FFD2", "#B4FF7A", "#3BE844", "#00CC00"];
const GREY_CORE = ["#FFFFFF", "#F3F3F3", "#E0E0E0", "#C4C4C4"];
const CORE_STOPS = [0, 0.38, 0.74, 1];

function Ramps({
  id,
  edge,
  edgeDeep,
  core,
}: {
  id: string;
  edge: string;
  edgeDeep: string;
  core: string[];
}) {
  return (
    <>
      <linearGradient id={`${id}-housing`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={edge} />
        <stop offset="1" stopColor={edgeDeep} />
      </linearGradient>
      <radialGradient id={`${id}-core`} cx="0.5" cy="0.45" r="0.95">
        {core.map((color, i) => (
          <stop key={color} offset={CORE_STOPS[i]} stopColor={color} />
        ))}
      </radialGradient>
    </>
  );
}

function Lamp({ id }: { id: string }) {
  return (
    <>
      {/* Housing — the bezel the lamp is seated in. */}
      <rect
        width={LAMP_W}
        height={LAMP_H}
        rx="1.6"
        fill={`url(#${id}-housing)`}
      />
      {/* Lit face, inset so the housing reads as a chamfered bevel. */}
      <rect
        x="1.3"
        y="1.3"
        width={LAMP_W - 2.6}
        height={LAMP_H - 2.6}
        rx="0.9"
        fill={`url(#${id}-core)`}
      />
    </>
  );
}

export function LoadingLamps({ className = "" }: { className?: string }) {
  const width = COUNT * PITCH - (PITCH - LAMP_W);
  const y = (ROW_H - LAMP_H) / 2;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${width} ${ROW_H}`}
      width={width}
      height={ROW_H}
      fill="none"
      // Scales down on a narrow column instead of clipping lamps off the end.
      className={`h-4 w-full ${className}`}
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        <Ramps
          id="vv-lamps-off"
          edge={GREY_EDGE}
          edgeDeep={GREY_EDGE_DEEP}
          core={GREY_CORE}
        />
        <Ramps
          id="vv-lamps-on"
          edge={LIT_EDGE}
          edgeDeep={LIT_EDGE_DEEP}
          core={LIT_CORE}
        />
        {/* Halo: dilate → blur → composite OUT against the housing's own
            alpha, so the glow renders only OUTSIDE the lamp and never washes
            over the lit face. Flattened to the reference's #E2FFE1. */}
        <filter
          id="vv-lamps-glow"
          x="-4"
          y="-4"
          width={LAMP_W + 8}
          height={LAMP_H + 8}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
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
          <feBlend in="SourceGraphic" result="shape" />
        </filter>
      </defs>

      {Array.from({ length: COUNT }).map((_, i) => (
        <g key={i} transform={`translate(${i * PITCH} ${y})`}>
          {/* Off: always painted, so an unlit position reads as a dark lamp
              rather than as a gap in the strip. */}
          <g>
            <Lamp id="vv-lamps-off" />
          </g>
          {/* On: same artwork, flickering in on its own delay. */}
          <g
            className="vv-lamp"
            style={{ ["--i" as string]: i }}
            filter="url(#vv-lamps-glow)"
          >
            <Lamp id="vv-lamps-on" />
          </g>
        </g>
      ))}
    </svg>
  );
}
