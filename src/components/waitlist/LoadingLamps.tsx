"use client";

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

   What stays: the ResizeObserver measuring the wrapper's width and sizing
   `count` to match, so the row still reaches the far edge at any viewport
   instead of stopping at a fixed lamp count. That was always about "how
   many lamps fit," never about the on/off motion, so it's orthogonal to
   everything above and has no bug history of its own.

   ONE <svg>, NOT N COPIES — each lamp needs a housing gradient, a core
   gradient and a glow filter, referenced by id; the defs are declared once
   and the lamps are groups inside the same svg (see git history for why N
   copies of PowerOnMark would silently share the first instance's
   gradients — the same hazard applies here). */

import { useEffect, useRef, useState } from "react";

const PITCH = 24;
const LAMP_W = 16;
const LAMP_H = 9;
const ROW_H = 16;

// Measured off the reference's live SVG filter table — see PowerOnMark.tsx,
// which documents where each of these came from.
const LIT_EDGE = "#5CF05C";
const LIT_EDGE_DEEP = "#00C000";
const LIT_CORE = ["#F2FFD2", "#B4FF7A", "#3BE844", "#00CC00"];
const CORE_STOPS = [0, 0.38, 0.74, 1];

// Inverse of the old fixed-count width formula: given an available width,
// how many lamps at this pitch fit before the next one would overflow it.
function countForWidth(width: number) {
  return Math.max(1, Math.floor((width + (PITCH - LAMP_W)) / PITCH));
}

export function LoadingLamps({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  // 19 as the initial guess (the strip's old fixed count) so there's a
  // reasonable strip on first paint before the observer's first
  // measurement, rather than nothing. Harmless now in a way it wasn't
  // before: a guess that's off by a few lamps just means a couple extra or
  // fewer lit lamps for one frame before the observer corrects `count` —
  // there's no per-lamp animation state left for that correction to
  // disrupt.
  const [count, setCount] = useState(19);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setCount(countForWidth(width));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const width = count * PITCH - (PITCH - LAMP_W);
  const y = (ROW_H - LAMP_H) / 2;

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

        {Array.from({ length: count }).map((_, i) => (
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
      </svg>
    </div>
  );
}
