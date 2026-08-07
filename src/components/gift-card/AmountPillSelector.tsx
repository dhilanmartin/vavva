"use client";

// gift-card-page.spec.md: row of 4 fixed amounts + 1 "custom" pill, same
// filled/outline active pattern as the segmented tabs (radio semantics, not
// multi-select).

import { useState } from "react";

const AMOUNTS = ["$25", "$50", "$75", "$100", "Custom"];

export function AmountPillSelector() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {AMOUNTS.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => setActive(i)}
          aria-pressed={active === i}
          className={`min-h-10 rounded-full border px-5 text-[13px] font-semibold transition-colors ${
            active === i
              ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
              : "border-black/15 text-[var(--ink)]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
