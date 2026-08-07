// Ported 1:1 from the live vavva.xyz landing (git history: main's
// src/app/page.tsx, pre-clone-structure) per D's 2026-08-06 instruction —
// "the only difference being the header and footer." Every measurement,
// class, and comment below is preserved from that original; only the
// wrapper changed, since Nav/Footer now live in the root layout instead of
// this page owning the whole viewport itself.
//
// Two logos now render on this route (Nav's 88px mark + this h1's 136/152px
// mark) — DESIGN.md's Anti-patterns section calls a second VAVVA "at any
// scale" out by name. Shipped as instructed rather than silently resolved;
// flag this at sign-off if the header mark should suppress on "/" instead.

import { VavvaMark } from "@/components/brand/VavvaMark";
import { AccessGate } from "@/components/gate/AccessGate";

export function Hero() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[248px] flex-1 flex-col px-4 pb-28 pt-13 md:max-w-[432px] md:px-5 md:pt-24 [@media(min-height:1000px)]:md:pt-36">
      {/* The house logo. Centred over ragged-left copy: a menu masthead. The
          mark is the only centred object on the page, which is what makes it
          read as a head rather than as the first line of the block. */}
      <h1
        className="home-rise m-0 mb-10 flex justify-center md:mb-11"
        style={{ ["--i" as string]: 0 }}
      >
        <VavvaMark className="h-auto w-[136px] md:w-[152px]" />
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
