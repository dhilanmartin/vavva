"use client";

import { useEffect, useRef } from "react";
import { BlurGlow } from "./engine";

/** Ambient wordmark — transparent canvas, so it sits straight on the page. */
export function BlurGlowMark({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const engine = new BlurGlow(host);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const start = () => {
      if (reduced) engine.renderStill(true);
      else engine.start();
    };

    const boot = requestAnimationFrame(() => {
      engine.refreshFont();
      start();
    });

    const ro = new ResizeObserver(() => engine.onResize());
    ro.observe(host);

    const io = new IntersectionObserver(
      (entries) => {
        const on = entries[0]?.isIntersecting ?? true;
        if (reduced) return;
        if (on) engine.start();
        else engine.stop();
      },
      { threshold: 0.01 },
    );
    io.observe(host);

    const onVis = () => {
      if (document.hidden) engine.stop();
      else if (!reduced) engine.start();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(boot);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      ro.disconnect();
      engine.destroy();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      aria-hidden
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "transparent",
      }}
    />
  );
}
