// Ported from the live vavva.xyz landing (git history: main's
// src/app/page.tsx, pre-clone-structure), then revised 2026-08-06 per D:
// the h1 mark is replaced with a text headline to resolve the two-VAVVA
// duplication (Nav already carries the mark). Sizing matches mimi's H1/hero
// heading type-scale fact from COMPONENT_INVENTORY.md (48px/400/1.17
// line-height/-0.02em serif desktop, stepped down for mobile per this
// rebuild's own convention) — but the words are Vavva's own. "Meet me at
// Mimi's" is their tagline; swapping a couple of words for "Casa Vavva"
// would still be their line, not a new one, so this is an original
// invitational headline instead, calibrated to the same word count/register.

import { AccessGate } from "@/components/gate/AccessGate";

export function Hero() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[248px] flex-1 flex-col px-4 pb-28 pt-13 md:max-w-[432px] md:px-5 md:pt-24 [@media(min-height:1000px)]:md:pt-36">
      {/* Text headline in place of the mark — see file header. Centred over
          ragged-left copy: a menu masthead. This is the only centred object
          on the page, which is what makes it read as a head rather than as
          the first line of the block. */}
      <h1
        className="home-rise m-0 mb-10 text-center font-serif text-[36px] font-normal leading-[1.17] tracking-[-0.02em] text-[var(--ink)] md:mb-11 desktop:text-[48px]"
        style={{ ["--i" as string]: 0 }}
      >
        Welcome to Casa Vavva
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
