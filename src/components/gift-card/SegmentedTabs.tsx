"use client";

// gift-card-page.spec.md: 2-tab pill-bordered control, active tab filled
// black, inactive outline-only. Used twice on the page (buy/reload,
// send-now/schedule) — same component, different option pairs.

import { useState } from "react";

export function SegmentedTabs({
  options,
  defaultIndex = 0,
}: {
  options: [string, string];
  defaultIndex?: number;
}) {
  const [active, setActive] = useState(defaultIndex);

  return (
    <div className="inline-flex rounded-full border border-black/15 p-1">
      {options.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => setActive(i)}
          aria-pressed={active === i}
          className={`min-h-11 rounded-full px-5 text-[12px] font-semibold uppercase tracking-[0.06em] transition-[transform,background-color,color] ease-[var(--ease-out)] active:scale-[0.96] ${
            active === i
              ? "bg-[var(--ink)] text-[var(--paper)]"
              : "text-[var(--ink)]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
