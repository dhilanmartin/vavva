"use client";

// feature-image-cta.spec.md: content "starts lower-opacity and rises to full
// opacity as the section scrolls into view" — a scroll-triggered reveal, not
// a hover state. This reuses the home page's blur-rise motion values (see
// `.scroll-reveal` in globals.css) but arms per-instance via
// IntersectionObserver instead of the page-mount `intro-js`/`intro-go`
// classes on <html>, since this needs to fire below the fold on routes that
// never run that mount sequence.

import { useEffect, useRef, useState } from "react";

export function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal${visible ? " is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
