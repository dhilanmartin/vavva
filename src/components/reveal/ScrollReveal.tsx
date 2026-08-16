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

    /* threshold 0, not 0.2 — and this is a bug fix, not a taste change.
       2026-08-14: the Products grid went from one tile to eight. At one
       column on a phone that is a 3076px-tall target in an 812px viewport,
       so the most of itself it can ever show is 812/3076 = 26%, and the
       -10% root margin takes that to 24%. On first paint only 16.5% was in
       view, under the old 0.2 gate — so the entire catalogue rendered at
       opacity 0 and a phone visitor landed on a blank page until they
       scrolled far enough to satisfy a ratio the element could barely
       reach.

       A ratio threshold is the wrong instrument for a target that can be
       taller than the root: it asks "how much of this element is on
       screen," when what a reveal means is "has this element started to
       arrive." threshold 0 asks the second question, and the negative
       bottom margin is what keeps it from firing while the element is
       still a sliver below the fold — that pairing works at any element
       height, which 0.2 never did. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
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
