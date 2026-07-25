"use client";

// Dia Browser's signature gradient.
// The bar field bleeds below its own frame so the saturated base runs off the
// bottom of the screen instead of fading to a visible edge. Blur is applied in
// CSS (isotropic, GPU-composited) rather than SVG — mobile browsers routinely
// drop or stall a large stretched feGaussianBlur.
// reveal: "mount" rises via CSS keyframes (renders even before hydration);
// "scroll" ties scaleY to scroll progress.

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
  peak = 0.98,
  valley = 0.55,
  stops = DIA_STOPS,
  reveal = "mount",
  /** Scroll distance (px) to reach full height when reveal="scroll". */
  scrollRange = 420,
}: {
  bars?: number;
  peak?: number;
  valley?: number;
  stops?: Stop[];
  reveal?: "mount" | "scroll" | "none";
  scrollRange?: number;
}) {
  const [scrollScale, setScrollScale] = useState(0);

  useEffect(() => {
    if (reveal !== "scroll") return;

    let ticking = false;
    const measure = () => {
      ticking = false;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrollScale(Math.max(0, Math.min(1, y / Math.max(1, scrollRange))));
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

  return (
    <div
      aria-hidden
      className={`dia-wrap${reveal === "mount" ? " dia-rise" : ""}`}
      style={{
        transform: reveal === "scroll" ? `scaleY(${scrollScale})` : undefined,
      }}
    >
      <div className="dia-field">
        <svg
          style={{ height: "100%", width: "100%", display: "block" }}
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
          </defs>
          {heights.map((h, i) => (
            <rect
              key={i}
              x={i * colW}
              y={VBH - h}
              width={colW * 1.23}
              height={h}
              fill="url(#dia-grad)"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
