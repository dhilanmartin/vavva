"use client";

// newsletter.spec.md: full-bleed dark section, centred 2-line heading above
// one pill-shaped combined input+button. The spec flags mimi's tiled
// background texture as an open question rather than a default ("could just
// as easily be flat --ink per DESIGN.md's restraint principle") — this
// build takes the flat option: paper + one accent is the whole point of the
// existing system, and a new texture is new surface area nobody asked for.
//
// Non-functional placeholder submit — no email endpoint exists for this
// band (distinct from AccessGate's access-request flow, which is untouched
// and unrelated to this structural pass).

import { useState } from "react";

export function Newsletter() {
  const [value, setValue] = useState("");

  return (
    <section className="bg-[var(--ink)] px-4 py-16 text-center md:px-5 tablet:py-20">
      <div className="mx-auto flex max-w-[420px] flex-col items-center gap-6">
        <h2 className="font-serif text-[24px] font-normal leading-[1.25] tracking-[-0.02em] text-[var(--paper)] desktop:text-[28px]">
          [VAVVA COPY TBD]
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full items-center gap-1 rounded-full bg-[var(--paper)] p-1.5"
        >
          <input
            type="email"
            inputMode="email"
            placeholder="[VAVVA COPY TBD]"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-9 flex-1 min-w-0 bg-transparent px-3 text-[14px] text-[var(--ink)] outline-none placeholder:text-[var(--mute)]"
          />
          <button
            type="submit"
            className="min-h-9 shrink-0 rounded-full bg-[var(--ink)] px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--paper)] transition-transform active:scale-[0.96]"
          >
            [VAVVA COPY TBD]
          </button>
        </form>
      </div>
    </section>
  );
}
