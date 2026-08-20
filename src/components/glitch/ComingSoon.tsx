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

    /* PULL STAYS 0.18 THROUGH THE 2026-08-19 SIZE CHANGE, and here are the
       numbers so it does not get re-litigated. `reach` is derived from the
       host rect, so taking the legend 15px -> 22/30px moved reach 64px ->
       108.2px and the maximum throw 1.71px -> 2.88px (both measured in the
       browser, not estimated; the maximum of d*PULL*(1-d/reach)^2 sits at
       d = reach/3 and equals PULL*(4/27)*reach).

       That is 1.69x in absolute pixels and IDENTICAL in proportion: 2.88px
       against the 275px plate is the same 1% of its width that 1.71px was
       against 163px. A magnet's field scaling with the object it belongs to
       is the physically correct behaviour, so there is nothing to re-tune.
       Revisit only if the sign stops being the whole landing. */
    const PULL = 0.18;

    /* THE RECT IS CACHED, invalidated rather than re-read. It used to be
       measured inside every animation frame of every pointermove, which is a
       forced layout read per frame for a box that only changes on resize or
       scroll. */
    let rect: DOMRect | null = null;
    const invalidate = () => {
      rect = null;
    };

    /* A SPRING, NOT A DIRECT WRITE. The transform used to be assigned
       straight from the pointer offset with `transition: none`, which gives
       the unit no momentum: it is welded to the cursor, and welded motion
       reads as artificial rather than as attraction.

       Integrating instead means the sign lags slightly, carries velocity,
       and — because velocity survives a change of target — reverses smoothly
       when the pointer crosses back over it. It also gives the release its
       elasticity honestly. The old release was a 620ms CSS transition on
       `--ease-out`, commented as having "a little overshoot"; that curve is
       cubic-bezier(0.23, 1, 0.32, 1), whose control points both sit at y=1,
       so it mathematically cannot overshoot. This does, because it is a real
       spring: damping under 1 lets it pass the target and come back.

       STIFF/DAMP are tuned for a light, quick settle — roughly 300ms to rest
       from a full-throw release, with one small overshoot. */
    const STIFF = 0.16;
    const DAMP = 0.74;
    const REST = 0.05;

    let tx = 0;
    let ty = 0; // where the pointer wants it
    let cx = 0;
    let cy = 0; // where it is
    let vx = 0;
    let vy = 0; // how fast it is going
    let raf = 0;

    const tick = () => {
      raf = 0;
      if (!magnet) return;

      vx = (vx + (tx - cx) * STIFF) * DAMP;
      vy = (vy + (ty - cy) * STIFF) * DAMP;
      cx += vx;
      cy += vy;

      const settled =
        Math.abs(tx - cx) < REST &&
        Math.abs(ty - cy) < REST &&
        Math.abs(vx) < REST &&
        Math.abs(vy) < REST;

      if (settled) {
        cx = tx;
        cy = ty;
        vx = 0;
        vy = 0;
      }

      magnet.style.transform = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;

      if (settled) {
        /* Released the compositing layer. `will-change` used to be a static
           class on the element, which pinned a layer for the life of the
           page — including on touch, where this whole interaction is gated
           off and the layer bought nothing. globals.css makes the same
           argument about the intro cascade. */
        if (cx === 0 && cy === 0) magnet.style.willChange = "";
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (!magnet) return;
      if (!rect) rect = host.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const reach = Math.hypot(rect.width, rect.height) / 2;
      const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / reach);
      const k = PULL * falloff * falloff;
      tx = dx * k;
      ty = dy * k;
      magnet.style.willChange = "transform";
      kick();
    };

    const onLeaveMagnet = () => {
      if (!magnet) return;
      tx = 0;
      ty = 0;
      kick();
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
      // Lazy invalidation: the next pointermove re-measures. Cheaper than
      // measuring here, since most resizes and scrolls never reach the sign.
      window.addEventListener("resize", invalidate, { passive: true });
      window.addEventListener("scroll", invalidate, { passive: true });
    }

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (fine) {
        host.removeEventListener("pointerenter", onEnter);
        host.removeEventListener("pointerleave", onLeave);
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeaveMagnet);
        window.removeEventListener("resize", invalidate);
        window.removeEventListener("scroll", invalidate);
      }
      if (raf) cancelAnimationFrame(raf);
      if (magnet) magnet.style.willChange = "";
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
  /* 15px -> 22/30px -> 18/24px. Three sizes in two days, and the last one is
     D's: "make the coming soon sign smaller" (2026-08-19).

     15px was too small and the reason is worth keeping: it was a badge, not a
     sign — a green pill about the size of a browser chip, floating in an open
     sky, reading as UI sitting on top of the picture rather than as an object
     inside it. A street sign is legible from across a street, which is the
     entire reference. 22/30 fixed that and overshot: on a 375px phone the
     plate was 204px wide, 54% of the viewport, which is a sign held up to
     your face rather than seen across a street.

     18/24 is a flat 0.8 of the pass before it, which takes the phone plate to
     about 44% of the viewport and still reads as signage rather than as a
     chip. Everything below scales with it by the same 0.8 so the proportions
     the sign is built on do not shift — see the panel note. */
  const TEXT =
    "font-sans text-[18px] font-semibold leading-none tracking-[0.005em] whitespace-pre text-white tablet:text-[24px]";

  /* The panel. The insets are the sign's padding, and they have to clear the
     white keyline, which is 4px in and 3px thick at both sizes now (see
     .gw-badge — it stopped stepping when the sign shrank).

     HELD AS RATIOS OF THE LEGEND, not scaled blindly. What a sign shop is
     actually setting is the clear green between the legend and the rule, in
     multiples of letter height: this keeps it at ~0.4x above and below and
     ~1.2x either side, which is what the 22/30 pass worked out to.

       mobile   27px in  ->  20px clear beside the legend, 7px above it
       tablet   36px in  ->  29px clear beside the legend, 10px above it

     The radius holds its own ratio too — ~0.19 of the plate's height, which
     is what keeps the corner reading as a stamped plate at either size. */
  const PANEL =
    "gw-badge absolute -inset-x-[27px] -top-[14px] -bottom-[14px] rounded-[8px] tablet:-inset-x-9 tablet:-top-[17px] tablet:-bottom-[17px] tablet:rounded-[11px]";


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
      <span data-glitch-magnet className="relative inline-block">
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
