"use client";

/* A row of indicator lamps that sweeps on once, on load, then stays lit.
   ===========================================================================

   2026-08-12: rewritten three times in one session. First moved from a
   homepage-only strip above the video into a site-wide header line (see
   layout.tsx and the note this replaced). Then, same day, D asked for two
   more things:

     1. "go across the whole site" — the strip used to be a fixed 19 lamps
        (456px), left-aligned in whatever container held it, with paper-
        colored dead space to the right on anything wider. It's now
        measured: a ResizeObserver on the wrapper computes exactly how many
        lamps fit the actual available width and re-renders on resize, so
        it always reaches the far edge instead of stopping partway. This
        part hasn't changed since and doesn't need to: it's orthogonal to
        whether the sweep loops or runs once.

     2. "move like a wave... a rotation of all of them on and off and on and
        forever... taking the same length as a rotation of the video so
        they're concurrent and symmetric" — turned this into an infinite
        loop, reversing the 2026-08-11 decision below. Sped up once, same
        day, on "make it faster" (video sync dropped on purpose then).

   Reverted to a one-shot entrance, 2026-08-12 (later, same day): D — "make
   it static once it loads in... i want all the leds on." This restores the
   2026-08-11 call below almost exactly, on the same reasoning that motivated
   it the first time (idle infinite motion competes with the video for
   attention) — the interruption was never that the reasoning was wrong, D
   just wanted the wave motion while it lasted. What's kept from the loop
   era: the ResizeObserver-driven full-width count above, and the two-state
   hard-cut mechanism (globals.css) instead of the old six-jump flicker —
   both are strict improvements over the original entrance and there's no
   reason to lose them going back to one-shot.

   [2026-08-11 note, superseded then un-superseded above, kept for the
   original reasoning]
   It is an ENTRANCE, not a loop. It ran as an infinite fill/empty rotation
   for one build and that was the wrong instrument: a strip cycling forever
   reads as a system busy with something, and nothing on this page is
   loading. Once, on arrival, then still.

   ONE <svg>, NOT N COPIES. Each lamp needs a housing gradient, a core
   gradient and a glow filter, referenced by id — see the original note
   (git history) for why N copies of PowerOnMark would silently share the
   first instance's gradients. The defs are declared once and the lamps are
   groups inside the same svg, same as before.

   The sweep itself is CSS (`vvLampsOn` in globals.css): each lamp gets the
   same single-run animation, with a per-lamp `animationDelay` spread evenly
   across SWEEP_MS, which is what keeps it on the compositor and reading as
   one wave rather than N independent flips. But the RESTING state is not
   left to CSS alone to guarantee — see the long comment on the "on" group
   below for a real engine bug (confirmed by forcing it live, not
   theoretical) where a backgrounded-then-foregrounded tab can leave one of
   these very short animations stuck mid-delay forever. A plain JS timer
   forces every lamp to a flat "on, unanimated" state once the sweep should
   be over, regardless of what the CSS animation actually did. */

import { useEffect, useRef, useState } from "react";

const PITCH = 24;
const LAMP_W = 16;
const LAMP_H = 9;
const ROW_H = 16;

// Total time for the one-shot entrance sweep to cross the row, regardless of
// how many lamps that is (see `step` below). Was CYCLE_MS/5400ms, tied to
// MediaFrame.tsx's video loop, back when this was an infinite loop; that
// name and that reasoning no longer apply now that it runs once. The
// globals.css `.vv-lamp` rule only needs this lamp-to-lamp delay math, not
// the total — there's no longer a second copy of this constant to keep in
// sync there.
const SWEEP_MS = 2000;

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

// Inverse of the old fixed-count width formula: given an available width,
// how many lamps at this pitch fit before the next one would overflow it.
function countForWidth(width: number) {
  return Math.max(1, Math.floor((width + (PITCH - LAMP_W)) / PITCH));
}

export function LoadingLamps({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  // 19 as the initial guess (the strip's old fixed count) so there's a
  // reasonable strip on first paint before the observer's first
  // measurement, rather than nothing.
  const [count, setCount] = useState(19);
  // The lamp count the entrance sweep was actually timed against, frozen at
  // the FIRST real measurement and never touched again — see the note on
  // the "on" group below for why later ResizeObserver firings must not be
  // allowed to change it.
  const [sweepCount, setSweepCount] = useState<number | null>(null);
  // Whether the sweep is DONE and every lamp should just render on, no CSS
  // animation involved at all — see the note on the "on" group below for
  // why the resting state can't be left to the animation alone.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) {
        const measured = countForWidth(width);
        setCount(measured);
        setSweepCount((prev) => prev ?? measured);
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sweepCount === null) return;
    // +100ms of headroom past the last lamp's own flip so this never fires
    // ahead of the CSS sweep on a slow frame.
    const timer = setTimeout(() => setSettled(true), SWEEP_MS + 100);
    return () => clearTimeout(timer);
  }, [sweepCount]);

  const width = count * PITCH - (PITCH - LAMP_W);
  const y = (ROW_H - LAMP_H) / 2;
  const step = sweepCount ? SWEEP_MS / sweepCount : 0;

  return (
    <div ref={wrapRef} className={`w-full ${className}`}>
      <svg
        aria-hidden
        viewBox={`0 0 ${width} ${ROW_H}`}
        width={width}
        height={ROW_H}
        fill="none"
        className="h-4 w-full"
        preserveAspectRatio="none"
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

        {Array.from({ length: count }).map((_, i) => (
          <g key={i} transform={`translate(${i * PITCH} ${y})`}>
            {/* Off: always painted, so a lamp mid-dark-phase reads as a dark
                lamp rather than as a gap in the strip. */}
            <g>
              <Lamp id="vv-lamps-off" />
            </g>
            {/* On: same artwork, switching on once, its own delay into the
                sweep, then staying lit for good.

                Bug fixed 2026-08-12, two layers deep. D reported a specific
                lamp (the second) sometimes never lighting up on mobile,
                self-healing if the viewport changed to desktop.

                Layer one — a JS race, not mobile-specific: `count` starts
                at the 19-lamp guess above, and every time the
                ResizeObserver reports a width, `i * step` got recomputed
                for whichever indices survive. Because React matches these
                `<g>` elements by `key={i}`, that was an in-place style
                update on the SAME DOM node, not a remount — rewriting
                `animation-delay` on an animation that's already running or
                already finished. The observer legitimately fires more than
                once per load (a web font swap reflowing the header text is
                enough), so this could happen well after the first paint, on
                any device. Fixed by computing `i * step` from `sweepCount`
                — captured once, on the first measurement, then frozen for
                the rest of this mount's life. A lamp's delay is now set at
                most once, ever, so there's nothing "already running" left
                for a later resize to disrupt.

                Layer two — this alone didn't fully close it, confirmed by
                forcing the exact failure live: a handful of lamps stayed
                stuck at opacity 0 indefinitely with entirely correct,
                never-rewritten delay values, after the tab had been
                backgrounded (`document.visibilityState`) and made visible
                again mid-delay — a real engine bug in how a very short
                (10ms), still-pending CSS animation resumes across a
                visibility change, not anything this component's JS was
                doing wrong. Phones background and resume tabs constantly
                (address bar show/hide, app switches); desktop mostly
                doesn't, which is why D saw it heal by switching there. CSS
                can't be trusted to always self-report "done," so it isn't
                asked to: the `settled` timer above forces every lamp to
                plain, unanimated opacity 1 a beat after the sweep should be
                over regardless of what the animation engine actually did.
                Three states fall out of that, most-authoritative first:
                `settled` true → on, no animation, full stop, whatever CSS
                was doing is irrelevant. Otherwise, `i < sweepCount` → mid
                sweep, animating on its own frozen delay. Otherwise (before
                the first measurement, or — only possible if the row grows
                wider than its original sweep width — added after the
                entrance already ran) → opacity 0 or plain on respectively,
                as before. */}
            <g
              className={
                !settled && sweepCount !== null && i < sweepCount
                  ? "vv-lamp"
                  : undefined
              }
              style={
                settled
                  ? undefined
                  : sweepCount === null
                    ? { opacity: 0 }
                    : i < sweepCount
                      ? { animationDelay: `${i * step}ms` }
                      : undefined
              }
              filter="url(#vv-lamps-glow)"
            >
              <Lamp id="vv-lamps-on" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
