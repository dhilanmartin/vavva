"use client";

// Dia Browser's signature gradient.
// reveal: "mount" rises once; "scroll" ties scaleY to scroll progress so the
// aurora only blooms as you move down the page.

import { useEffect, useState } from "react";

type Stop = { offset: number; color: string };

const DIA_STOPS: Stop[] = [
  { offset: 0, color: "#340B05" },
  { offset: 0.1827, color: "#0358F7" },
  { offset: 0.2837, color: "#5092C7" },
  { offset: 0.4135, color: "#E1ECFE" },
  { offset: 0.5866, color: "#FFD400" },
  { offset: 0.6827, color: "#FA3D1D" },
  { offset: 0.8029, color: "#FD02F5" },
  { offset: 1, color: "#FFC0FD00" },
];

const VBW = 1271;
const VBH = 599;

function bellHeights(n: number, peak: number, valley: number): number[] {
  const out: number[] = [];
  const mid = (n - 1) / 2;
  for (let i = 0; i < n; i++) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid;
    const eased = 1 - Math.pow(t, 1.24);
    out.push(peak * VBH * (valley + (1 - valley) * eased));
  }
  return out;
}

export function DiaGradient({
  bars = 9,
  blur = 15,
  peak = 0.98,
  valley = 0.55,
  stops = DIA_STOPS,
  riseMs = 1100,
  reveal = "mount",
  /** Scroll distance (px) to reach full height when reveal="scroll". */
  scrollRange = 420,
}: {
  bars?: number;
  blur?: number;
  peak?: number;
  valley?: number;
  stops?: Stop[];
  riseMs?: number;
  reveal?: "mount" | "scroll" | "none";
  scrollRange?: number;
}) {
  const [scaleY, setScaleY] = useState(reveal === "none" ? 1 : 0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reveal === "none" || reduced) {
      const id = requestAnimationFrame(() => setScaleY(1));
      return () => cancelAnimationFrame(id);
    }

    if (reveal === "mount") {
      let outer = 0;
      let inner = 0;
      outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setScaleY(1));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }

    // scroll reveal — bloom with page scroll
    let ticking = false;
    const measure = () => {
      ticking = false;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const next = Math.max(0, Math.min(1, y / Math.max(1, scrollRange)));
      setScaleY(next);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reveal, scrollRange]);

  const heights = bellHeights(bars, peak, valley);
  const colW = VBW / bars;
  const animated = reveal === "mount";

  return (
    <div
      aria-hidden
      style={{
        height: "100%",
        width: "100%",
        transformOrigin: "bottom",
        transform: `scaleY(${scaleY})`,
        transition: animated
          ? `transform ${riseMs}ms cubic-bezier(0.16, 1, 0.3, 1)`
          : undefined,
        willChange: "transform",
      }}
    >
      <svg
        style={{ height: "100%", width: "100%" }}
        viewBox={`0 0 ${VBW} ${VBH}`}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dia-grad" x1="0" y1="1" x2="0" y2="0">
            {stops.map((s, i) => (
              <stop key={i} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
          <filter id="dia-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        </defs>
        {heights.map((h, i) => (
          <g key={i} filter="url(#dia-blur)">
            <rect
              x={i * colW}
              y={VBH - h}
              width={colW * 1.23}
              height={h}
              fill="url(#dia-grad)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
