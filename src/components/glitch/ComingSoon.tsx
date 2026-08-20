"use client";

/* The landing's coming-soon sign.
   ===========================================================================

   An MUTCD regulatory sign — Vavva-red panel, white rule set in from the
   edge, white Title Case legend — that tears itself apart in bursts. As of
   2026-08-18 it is the ONLY thing on the landing. The tearing mechanism is in engine.ts and the sign's material is
   `.gw-badge` in globals.css; this file is the STRUCTURE the mechanism needs,
   and the structure is most of what makes it work. Read engine.ts's header
   before changing any of the nesting below.

   WHY A ROAD SIGN, beyond D asking for one: it is the rare found object that
   is ALREADY a display of text, which is what lets the glitch read as this
   thing malfunctioning rather than as an effect applied to a shape.

   It went green (guide), then yellow (warning), then red (regulatory) inside
   one day. Red is where it stops: it is the sign class that means you may not
   proceed, it is the most accurate of the three for a door with nothing
   behind it, and it is the only one that is also the house accent — so the
   landing stops carrying a second colour by exception. globals.css has the
   full argument and the contrast figures.

   THERE IS NO ARROW ANY MORE. It pointed down at the studio's one sentence,
   then up at it when D flipped the order, and then the sentence itself was
   replaced by this component — so it was pointing at empty page. An arrow
   with nothing to point at is the one detail here that reads as decoration
   rather than as sign language, so it went with the copy.

   Under reduced motion it renders the plain legend and nothing runs — no
   engine, no timers, no clones animating. */

import { useEffect, useRef } from "react";
import { ACTIVE, GlitchWord, IDLE } from "./engine";

const WORD = "Coming Soon";

// 10 is plenty. The IDLE preset only ever animates its first 7 (sliceCount),
// so the extra three exist for the hover preset without being rebuilt on the
// transition.
const LAYERS = 10;

export function ComingSoon() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const base = host.querySelector<HTMLElement>("[data-glitch-base]");
    const layers = Array.from(
      host.querySelectorAll<HTMLElement>("[data-glitch-layer]"),
    );
    if (!base) return;

    const engine = new GlitchWord(base, layers, WORD, reduced);

    /* START OPTIMISTICALLY, PAUSE ON SIGNAL — `onScreen` begins TRUE.

       It began false, which meant the engine could not run until an
       IntersectionObserver callback said the element was visible. That reads
       as careful and is the wrong default for this element: the sign is the
       only thing on the landing, it is centred in the viewport, and it is
       therefore visible on essentially every load. Gating it on an observer
       callback buys nothing and risks everything — if that callback is
       delayed, throttled, or never delivered, the page's entire content sits
       permanently static with no way to recover.

       That is not hypothetical. It is exactly what happens in this repo's
       headless capture path, where the observer never delivers and the sign
       renders dead every time; the same shape as the ResizeObserver bug that
       once left the lamp strip stretched, and the rule this repo already
       settled on there — the most reliable version of "no load-in bug" is
       "no load-in".

       The observer still runs and still pauses the engine when the sign
       genuinely scrolls away. It just no longer holds the keys. */
    let onScreen = true;
    let hidden = document.hidden;
    let hovered = false;

    const sync = () => {
      if (onScreen && !hidden) engine.start();
      else engine.stop();
    };
    sync();

    // Pauses offscreen and when the tab is hidden. Not an optimisation for
    // its own sake: the cycle chains off `finished`, and a throttled tab
    // resolves those promises in a burst when it comes forward.
    const io = new IntersectionObserver(
      (es) => {
        onScreen = es.some((e) => e.isIntersecting);
        sync();
      },
      { rootMargin: "200px" },
    );
    io.observe(host);

    const onVis = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    /* MAGNETISM, fine pointers only. The unit translates a fraction of the
       pointer's offset from its centre, with a falloff that SQUARES the
       normalised distance so the pull only exists near the word rather than
       reaching across the page.

       It gets its own wrapper element. The base already has two writers on
       `transform` — the shake and the resting drift — and a third fighting
       them on the same element would mean whichever wrote last won. Nesting
       composes for free. */
    const magnet = host.querySelector<HTMLElement>("[data-glitch-magnet]");
    const PULL = 0.18;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (!magnet) return;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = host.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const reach = Math.hypot(r.width, r.height) / 2;
        const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / reach);
        const k = PULL * falloff * falloff;
        magnet.style.transition = "none";
        magnet.style.transform = `translate3d(${(dx * k).toFixed(2)}px,${(dy * k).toFixed(2)}px,0)`;
      });
    };

    // Eased release with a little overshoot — a magnet that snaps back
    // linearly reads as a bug rather than as elasticity.
    const onLeaveMagnet = () => {
      if (!magnet) return;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      magnet.style.transition = "transform 620ms var(--ease-out)";
      magnet.style.transform = "translate3d(0,0,0)";
    };

    const fine = window.matchMedia("(pointer: fine)").matches;
    const onEnter = () => {
      if (hovered) return;
      hovered = true;
      engine.setOptions(ACTIVE);
    };
    const onLeave = () => {
      if (!hovered) return;
      hovered = false;
      engine.setOptions(IDLE);
    };
    if (fine) {
      host.addEventListener("pointerenter", onEnter);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeaveMagnet);
    }

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (fine) {
        host.removeEventListener("pointerenter", onEnter);
        host.removeEventListener("pointerleave", onLeave);
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeaveMagnet);
      }
      if (raf) cancelAnimationFrame(raf);
      engine.destroy();
    };
  }, []);

  // Every copy lands in the SAME grid cell, which is what keeps them
  // registered on each other at any size with no absolute positioning and
  // nothing to measure.
  const CELL = "col-start-1 row-start-1";

  /* Highway legend, as close as Inter gets. The real face is FHWA Series
     (Highway Gothic) and it is not a webfont this site can have, so what is
     reproduced is its BEHAVIOUR rather than its shapes: Title Case, a medium
     weight rather than a bold, and near-zero tracking. 15px because a sign
     that has to be squinted at is not a sign. */
  /* 15px -> 22/30px (2026-08-19). D: keep the words, make it bigger.
     At 15px this was a badge, not a sign — a green pill the size of a
     browser chip floating in an open sky, which is why it read as UI rather
     than as an object in the picture. A street sign is legible from across a
     street; that is the whole reference. The badge insets below scale with
     it, and so does the keyline in .gw-badge. */
  const TEXT =
    "font-sans text-[22px] font-semibold leading-none tracking-[0.005em] whitespace-pre text-white tablet:text-[30px]";

  /* The panel. The insets are the sign's padding, and they have to clear the
     white rule: it sits 3px in and is 2px thick, so 20px/11px leaves 15px of
     green beside the legend and 6px above it. */
  const PANEL =
    "gw-badge absolute -inset-x-8 -top-[16px] -bottom-[16px] rounded-[10px] tablet:-inset-x-11 tablet:-top-[22px] tablet:-bottom-[22px] tablet:rounded-[14px]";


  return (
    <div
      ref={hostRef}
      // role="img" over the whole unit: the base element's text is REWRITTEN
      // by the scramble, so anything reading the DOM directly would announce
      // "ccming sccn". The label is the word this is supposed to say.
      role="img"
      aria-label="Coming soon"
      className="relative inline-flex select-none items-center justify-center px-3 py-2"
    >
      <span data-glitch-magnet className="relative inline-block will-change-transform">
        <span className="relative grid place-items-center">
          {/* THE ANCHOR. Inter is proportional, so every substituted letter is
              a different width — without an invisible copy of the RESTING
              legend holding the cell open, the grid resizes on every scramble
              tick and the sign visibly breathes. A monospace face would not
              need this. */}
          <span aria-hidden="true" className={`${CELL} ${TEXT} invisible`}>
            {WORD}
          </span>

          {/* The original. It carries the real text, so the scramble writes
              here and the shake moves it.

              `data-glitch-base` is on the WRAPPER, not on the text: the engine
              translates this element for the shake, and with the attribute on
              the inner span it would move the glyphs alone and leave the badge
              — its own sibling — perfectly still. The text slot is marked
              separately so the scramble still knows where to write. */}
          <span data-glitch-base className={`${CELL} relative z-10`}>
            <span data-glitch-badge className={PANEL} />
            <span data-glitch-text className={`${TEXT} relative`}>
              {WORD}
            </span>
          </span>

          {/* The clones. Each is a copy of the WHOLE unit — badge and word
              together — so a slice clips and shoves the panel and the legend
              as one thing, and the sign appears to move while carrying no
              animation of its own.

              The negative `animationDelay` puts every copy at a different
              point in the panel's hue drift, so a tear reveals a SEAM: the
              surface disagrees with itself. */}
          {Array.from({ length: LAYERS }).map((_, i) => (
            <span
              key={i}
              data-glitch-layer
              aria-hidden="true"
              style={{ opacity: 0 }}
              className={`${CELL} pointer-events-none relative z-10`}
            >
              <span
                className={PANEL}
                style={{ animationDelay: `${-(i * 2.4).toFixed(1)}s` }}
              />
              <span data-glitch-text className={`${TEXT} relative`}>
                {WORD}
              </span>
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}
