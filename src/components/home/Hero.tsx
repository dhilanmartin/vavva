// Ported from the live vavva.xyz landing (git history: main's
// src/app/page.tsx, pre-clone-structure), then revised 2026-08-06 per D:
// the h1 mark is replaced with a text headline to resolve the two-VAVVA
// duplication (Nav already carries the mark). Simplified same day to just
// "Casa Vavva" — a full sentence wrapped to two lines, and D's design
// system (dvault/00-system/context/design-system.md) is explicit that
// display type should be "confident and tightly controlled" and fit as a
// single deliberate mark, not a wrapped headline. Font-size uses that same
// file's fluid Hero scale token (clamp(2.3rem, 5vw, 4.5rem)) instead of
// this rebuild's earlier fixed mobile/desktop breakpoint jump — the vault's
// own rule is "never fixed px at display sizes."

import { AccessGate } from "@/components/gate/AccessGate";

export function Hero() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[248px] flex-1 flex-col px-4 pb-28 pt-13 md:max-w-[432px] md:px-5 md:pt-24 [@media(min-height:1000px)]:md:pt-36">
      {/* Text headline in place of the mark — see file header. Centred over
          ragged-left copy: a menu masthead. This is the only centred object
          on the page, which is what makes it read as a head rather than as
          the first line of the block. */}
      <h1
        className="home-rise m-0 mb-10 text-balance text-center font-serif text-[clamp(2.3rem,5vw,4.5rem)] font-normal leading-[1.17] tracking-[-0.02em] text-[var(--ink)] md:mb-11"
        style={{ ["--i" as string]: 0 }}
      >
        Casa Vavva
      </h1>

      <header className="text-[15px] font-medium leading-[1.4] tracking-[-0.015em]">
        <p
          className="home-rise m-0 text-black/90"
          style={{ ["--i" as string]: 1 }}
        >
          {/* The city carries the accent and is not a link — see DESIGN.md's
              Copy section for why. */}
          Casa Vavva is a creative studio based in{" "}
          <span className="place">New York City</span>.
        </p>

        <p
          className="home-rise mt-6 mb-0 text-[color:var(--mute)]"
          style={{ ["--i" as string]: 2 }}
        >
          Vavva{" "}
          <span className="ipa">[vaˈvˌvːa]</span>
          ; evokes a sense of beauty, peace, and abundance according to ancient
          Greek philosophy.
        </p>
      </header>

      <footer className="home-rise mt-6" style={{ ["--i" as string]: 3 }}>
        <AccessGate />
      </footer>
    </div>
  );
}
