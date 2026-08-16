/* A row of indicator lamps, always lit. No entrance, no sweep, no timing.
   ===========================================================================

   2026-08-12: this file went through four rewrites in one session — a
   fixed-count entrance flicker, an infinite width-matched wave, a one-shot
   sweep-then-static version, and finally this one. The one-shot version
   (see git history for the full mechanism if it's ever useful again) was
   real motion done carefully: a frozen-at-first-measurement delay per lamp,
   a hard on/off cut via CSS, and a JS timer as a backstop against a
   confirmed browser bug where a very short animation could get stuck mid-
   delay across a tab visibility change. It worked, verified live. D killed
   it anyway: "just leave the leds on 24/7. the load in is always bugging
   with a few of them off or whatsoever. i dont want it like that."

   That's not a request to fix the remaining edge case — it's a request to
   stop having one. The most reliable version of "no load-in bug" is "no
   load-in": every lamp renders lit, unconditionally, on every render, from
   the very first paint. There is no CSS animation left to get stuck, no
   per-lamp delay math, no timer racing the animation engine, and no
   distinct "off" lamp artwork — none of that machinery has a reason to
   exist once there's no motion to sequence.

   ---- 2026-08-14: the ResizeObserver is gone, and it was hiding a bug ----

   This used to measure the wrapper and size `count` to match, starting from
   a hardcoded guess of 19 and correcting on the observer's first callback.
   The note here claimed that was harmless — "a guess that's off by a few
   lamps just means a couple extra or fewer lit lamps for one frame."

   That was wrong on both counts, measured live at a 1440px viewport:

     - the guess is off by 39, not "a few": 19 against the 58 that fit
     - and because the <svg> carried `preserveAspectRatio="none"` with a
       `w-full` class, a wrong count never produced FEWER LAMPS. It produced
       STRETCHED ones. 19 lamps' worth of viewBox (448 units) painted across
       1392px is a 3.11x horizontal stretch: each lamp rendered 49.7x9px
       against a designed 16x9, an aspect ratio of 5.52 against 1.78.

   So every page load painted a row of badly stretched lamps until the
   observer fired. Worse, ResizeObserver delivery is part of the rendering
   steps, exactly like requestAnimationFrame — so in a tab that loads in the
   background it does not fire at all, and the strip stays stretched until
   the tab is looked at. That is the same failure shape as the header bug
   fixed in layout.tsx the same day.

   THE FIX IS TO STOP MEASURING. The strip lives inside this site's standard
   `max-w-[1710px] px-6` container, so the widest row it can ever need is
   1662px — 70 lamps. Rendering a fixed MAX_LAMPS that always overflows and
   letting the wrapper clip gives the same "reaches the far edge at any
   viewport" result with no observer, no guess, no correction pass and no
   hydration difference: the server's markup is already final.

   `preserveAspectRatio="none"` and `w-full` go with it. The <svg> now
   carries width/height attributes only, so one user unit is one CSS pixel
   and the lamps are their designed size at every viewport.

   ---- 2026-08-14: the row slides, and why that is not the thing D killed --

   D: "add the emoji header as a sliding thing that moves or is animated...
   to add some character."

   This looks like a reversal of the decision above and is not one, so the
   distinction is worth stating precisely. What D rejected was a ONE-SHOT
   ENTRANCE carrying per-lamp state: each lamp had its own delay, its own
   on/off cut, and a terminal "lit" state it was supposed to reach. The bug
   was that a lamp could fail to reach it — "a few of them off or
   whatsoever" — because a tab visibility change mid-delay left an
   individual lamp stranded, and the whole strip then looked broken until
   reload.

   This animation has none of those parts. It is one continuous linear
   translate on ONE group, with no delays, no per-lamp state, and no
   terminal frame: every position in the cycle is as correct as every other
   one. A visibility change cannot strand it, because there is nothing for
   it to be stranded short of — it simply resumes wherever it is. The class
   of failure D was objecting to is not available to it.

   SEAMLESS, structurally rather than by tuning. The lamps repeat on a
   fixed PITCH, so translating the row by exactly one PITCH lands on a
   pattern identical to where it started. LOOP_LAMPS extra lamps are drawn
   past the right edge to fill the gap the slide opens, and the wrapper
   clips them until they are needed. Nothing here depends on the duration or
   the viewport width — change either and it stays seamless.

   Reduced motion stops it dead, and the resting state is the full lit row,
   which is exactly what shipped before this.

   ONE <svg>, NOT N COPIES — each lamp needs a housing gradient, a core
   gradient and a glow filter, referenced by id; the defs are declared once
   and the lamps are groups inside the same svg (see git history for why N
   copies of PowerOnMark would silently share the first instance's
   gradients — the same hazard applies here). */

const PITCH = 24;
const LAMP_W = 16;
const LAMP_H = 9;
const ROW_H = 16;

// Extra lamps drawn past the right edge, to fill the gap the slide opens as
// the row travels left. The animation only ever travels a single PITCH, so
// one would do; two costs nothing and leaves no doubt.
const LOOP_LAMPS = 2;

// Enough lamps to overflow the widest row this strip can ever occupy. It
// sits inside `max-w-[1710px] px-6`, so that is 1662px — 70 lamps at a 24px
// pitch. 80 leaves headroom for the page container growing without this
// file being revisited, and the overflow is clipped rather than drawn.
const MAX_LAMPS = 80;

// Measured off the reference's live SVG filter table — see PowerOnMark.tsx,
// which documents where each of these came from.
const LIT_EDGE = "#5CF05C";
const LIT_EDGE_DEEP = "#00C000";
const LIT_CORE = ["#F2FFD2", "#B4FF7A", "#3BE844", "#00CC00"];
const CORE_STOPS = [0, 0.38, 0.74, 1];

export function LoadingLamps({ className = "" }: { className?: string }) {
  const count = MAX_LAMPS;
  const width = (count + LOOP_LAMPS) * PITCH - (PITCH - LAMP_W);
  const y = (ROW_H - LAMP_H) / 2;

  return (
    // overflow-hidden is what makes the fixed count work: the row is drawn
    // wider than any container it can land in, and the excess is clipped
    // rather than measured away.
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        aria-hidden
        viewBox={`0 0 ${width} ${ROW_H}`}
        width={width}
        height={ROW_H}
        fill="none"
      >
        <defs>
          <linearGradient id="vv-lamps-housing" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={LIT_EDGE} />
            <stop offset="1" stopColor={LIT_EDGE_DEEP} />
          </linearGradient>
          <radialGradient id="vv-lamps-core" cx="0.5" cy="0.45" r="0.95">
            {LIT_CORE.map((color, i) => (
              <stop key={color} offset={CORE_STOPS[i]} stopColor={color} />
            ))}
          </radialGradient>
          {/* Halo: dilate → blur → composite OUT against the housing's own
              alpha, so the glow renders only OUTSIDE the lamp and never
              washes over the lit face. Flattened to the reference's
              #E2FFE1. */}
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

        {/* One group carries the whole row, so the slide is a single
            transform on a single element rather than N animations that
            could ever disagree with each other. */}
        <g className="vv-lamp-row">
          {Array.from({ length: count + LOOP_LAMPS }).map((_, i) => (
            <g
              key={i}
              transform={`translate(${i * PITCH} ${y})`}
              filter="url(#vv-lamps-glow)"
            >
              <rect
                width={LAMP_W}
                height={LAMP_H}
                rx="1.6"
                fill="url(#vv-lamps-housing)"
              />
              <rect
                x="1.3"
                y="1.3"
                width={LAMP_W - 2.6}
                height={LAMP_H - 2.6}
                rx="0.9"
                fill="url(#vv-lamps-core)"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
