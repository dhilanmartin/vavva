/* A word on a badge, tearing itself apart in bursts.
   ===========================================================================

   DOM and the Web Animations API — no canvas, no shader. The whole effect is
   N identical copies of one wrapper stacked in a single CSS grid cell, each
   clipped to a horizontal band and shoved sideways on stepped keyframes.

   THE STRUCTURE IS THE EFFECT, and it is the part that is easy to get wrong:
   the badge AND the word live inside one wrapper, and it is the WRAPPER that
   is cloned. Cloning only the text gives a word tearing in front of a
   perfectly static rectangle, which reads as two unrelated things rather than
   as one damaged object. Because the copies share a grid cell
   (col-start-1 row-start-1) they sit exactly on the original at any size,
   with no absolute positioning to keep in sync and no measurement anywhere.
   The same applies to the shake: it is applied to the wrapper, not to the
   inner text, or the letters jitter and leave the badge behind.

   PURE GEOMETRY, NO COLOUR. The slices are not tinted, hue-rotated or split
   into RGB channels. Displaced copies read as a bad decode precisely BECAUSE
   they are identical — colour turns a mis-registration into a rainbow, which
   is a different and much cheaper-looking effect. The only colour here is the
   badge's own fill.

   THE ENVELOPE drives everything: the layers, the shake, the corner jitter
   and the letter scramble all read the same function of cycle phase, so they
   are one event rather than four coincidences. */

const LOOKALIKE: Record<string, string> = {
  a: "eo", b: "hd", c: "eo", d: "bh", e: "ca", f: "tr", g: "qy",
  h: "bn", i: "lj", j: "il", k: "hx", l: "il", m: "nw", n: "mh",
  o: "ce", p: "qb", q: "pg", r: "nf", s: "z5", t: "fl", u: "vn",
  v: "uy", w: "vm", x: "kz", y: "vg", z: "sx",
};

const SCRAMBLE_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

/* NEAR-LOOKALIKES of similar width, not arbitrary punctuation. The word stays
   readable and feels subtly wrong, which is more unsettling than obvious
   symbol noise — a line of #@$% announces "this is a glitch effect", where
   "ccming sccn" makes you doubt your own reading.

   ASCII only, deliberately. The Unicode homoglyphs are better lookalikes but
   Inter's subset here is latin-only; a missing glyph renders as a tofu box,
   which is a far worse failure than a slightly-off letter. */
function swap(ch: string): string {
  const lower = ch.toLowerCase();
  const near = LOOKALIKE[lower];
  const out = near
    ? near[Math.floor(Math.random() * near.length)]
    : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  // CASE IS PRESERVED. The legend is Title Case now (highway destination
  // legends are), and a substitution that also flipped the case would change
  // the word's silhouette, not just a letter — "coming Soon" reads as a
  // different string rather than as a misread one.
  return ch === lower ? out : out.toUpperCase();
}

export interface GlitchOptions {
  duration: number;
  sliceCount: number;
  /** Steps per second. Sets how many discrete states a cycle renders. */
  velocity: number;
  /** Band height as a fraction of the unit's height. */
  minHeight: number;
  maxHeight: number;
  /** Peak horizontal shove, as a percentage of the unit's own width. */
  maxOffset: number;
  shakeAmplitude: number;
  /** Where in the cycle the burst starts and ends, 0..1. */
  spanStart: number;
  spanEnd: number;
  /** Where the envelope peaks WITHIN the span, 0..1. */
  peakAt: number;
  rogueMultiplier: number;
  cornerJitter: number;
  driftPx: number;
  scrambleRate: number;
  scrambleInterval: number;
}

/* TWO PRESETS, ONE ENGINE. At rest: a long cycle with the burst over about a
   third of it, so the word is legible most of the time and the tear is an
   event. On hover: a short cycle whose burst covers nearly all of it, so it
   barely resolves — the thing reacts to attention by getting worse. */
export const IDLE: GlitchOptions = {
  duration: 1800,
  sliceCount: 7,
  velocity: 15,
  minHeight: 0.02,
  maxHeight: 0.18,
  maxOffset: 20,
  shakeAmplitude: 0.13,
  spanStart: 0.5,
  spanEnd: 0.84,
  peakAt: 0.3,
  rogueMultiplier: 3,
  cornerJitter: 4,
  driftPx: 0.5,
  scrambleRate: 0.06,
  scrambleInterval: 50,
};

export const ACTIVE: GlitchOptions = {
  duration: 340,
  sliceCount: 10,
  velocity: 18,
  minHeight: 0.02,
  maxHeight: 0.2,
  maxOffset: 38,
  shakeAmplitude: 0.26,
  spanStart: 0.22,
  spanEnd: 0.9,
  peakAt: 0.3,
  rogueMultiplier: 3.5,
  cornerJitter: 6,
  driftPx: 0.5,
  scrambleRate: 0.14,
  scrambleInterval: 45,
};

/* MUTCD guide-sign green, ~Pantone 342 — the green of an Interstate
   destination panel. Kept as a literal because WAAPI keyframes cannot read a
   custom property. It appears TWICE: as the panel fill in `.gw-badge` and as
   the first inset ring below. The two must be the same literal or the sign's
   border develops a seam.

   THAT IS NOT HYPOTHETICAL — it happened on the way here. The colour moved
   four times in one day (green, warning yellow, Vavva red, back to green)
   and one of those passes updated `.gw-badge` but not these constants. The
   result was a sign that sat RED at rest and turned YELLOW-BORDERED for a
   third of a second every time it tore, because the CSS owns the resting
   frame and these constants own every frame of the burst. If the two ever
   disagree again, that is the symptom, and it is invisible until something
   glitches.

   White on #00693E is 6.24:1. The legend and the rule are white here; they
   were black for the yellow pass, and anything still black on this panel is
   a leftover. */
const PANEL = "#00693e";

/* THE KEYLINE IS BUILT FROM TWO INSET SHADOWS, and the trick is worth
   understanding before touching it. A road sign's border is a rule set IN
   from the panel edge, with panel colour on both sides of it. There is no
   CSS property for "stroke, inset by 3px". So:

     inset ... 3px PANEL   paints the outer 3px ring green, ON TOP
     inset ... 5px RULE    paints the outer 5px ring white, UNDERNEATH

   Earlier shadows paint over later ones, so what survives is green 0-3px and
   white 3-5px: a 2px rule floating 3px inside the edge. Both follow the
   padding box's border-radius for free, which is the whole reason it is done
   this way — the engine ANIMATES that radius during a burst, and a real
   `border` would be separate geometry that disagrees with it frame by frame.

   Restated in full here because of a WAAPI hazard: a keyframe that sets
   `box-shadow` replaces the WHOLE stack, so every static layer has to appear
   in every frame of the burst or the sign loses its border at exactly the
   moment it is being looked at hardest. Keep in sync with `.gw-badge`. */
const RULE = "#ffffff";

const REST_SHADOW = [
  `inset 0 0 0 3px ${PANEL}`,
  `inset 0 0 0 5px ${RULE}`,
  "0 1px 2px rgba(0,32,18,0.26)",
  "0 6px 14px -6px rgba(0,32,18,0.32)",
].join(", ");

// A full-frame drop every 8-12 bursts. COUNTED, not rolled per cycle: an
// independent 1-in-10 roll puts two drops back to back often enough to
// notice, and two in a row reads as a flicker rather than as a dropped frame.
const DROP_EVERY = 8;
const DROP_JITTER = 5;

// The contact shadow offsets OPPOSITE to the shove, as though the block moved
// and its shadow has not caught up.
const SHADOW_LAG = 7;

// The settle. Past the burst's end the envelope goes NEGATIVE for a short
// tail, which flips every displacement's direction — real hardware
// overcorrects, and returning cleanly to true is the one thing a decoder
// never does. Without it a burst STOPS; with it, it LANDS.
const OVERSHOOT_SPAN = 0.14;
const OVERSHOOT_PEAK = 0.22;

function envelope(o: GlitchOptions, t: number): number {
  if (t < o.spanStart) return 0;
  const span = o.spanEnd - o.spanStart;

  if (t > o.spanEnd) {
    const tail = (t - o.spanEnd) / (span * OVERSHOOT_SPAN);
    return tail < 1 ? -OVERSHOOT_PEAK * (1 - tail) : 0;
  }

  // Fast attack, long decay. A symmetric triangle reads as a deliberate fade
  // in and out; fast-in slow-out reads as a fault settling.
  const peak = o.spanStart + span * o.peakAt;
  return t < peak
    ? (t - o.spanStart) / (peak - o.spanStart)
    : (o.spanEnd - t) / (o.spanEnd - peak);
}

function jolt(o: GlitchOptions, t: number): number {
  return (Math.random() - 0.5) * 2 * envelope(o, t);
}

function band(o: GlitchOptions): { path: string; heightRatio: number } {
  const range = o.maxHeight - o.minHeight;
  const heightRatio = Math.random();
  const h = o.minHeight + heightRatio * range;
  const y = Math.random() * (1 - h);
  const top = (y * 100).toFixed(2);
  const bot = ((y + h) * 100).toFixed(2);
  return {
    path: `polygon(0% ${top}%, 100% ${top}%, 100% ${bot}%, 0% ${bot}%)`,
    heightRatio,
  };
}

function steps(o: GlitchOptions): number {
  return Math.max(1, Math.floor((o.velocity * o.duration) / 1000) + 1);
}

/* Does this engine honour `composite: "add"`?

   Two animations write `transform` on the base element — the per-cycle shake
   and the slow resting drift — and additive compositing is what lets both
   apply instead of the later one replacing the earlier. Browsers that do not
   support it vary in how they say so: some ignore the option, some throw
   from `animate()`. The second is the dangerous one, because the throw lands
   inside `run()`, which is called from an IntersectionObserver callback, and
   the whole engine dies before its first cycle with nothing in the DOM to
   show for it — a sign that simply never glitches.

   Detected once, lazily, on a detached element: at module scope this would
   run during SSR where there is no `document`. */
let addSupport: boolean | null = null;

function supportsAdditive(): boolean {
  if (addSupport !== null) return addSupport;
  if (typeof document === "undefined") return (addSupport = false);
  try {
    const probe = document.createElement("div");
    const a = probe.animate([{ transform: "translate3d(1px,0,0)" }], {
      duration: 1,
      composite: "add",
    });
    addSupport = (a.effect as KeyframeEffect)?.composite === "add";
    a.cancel();
  } catch {
    addSupport = false;
  }
  return addSupport;
}

function sliceFrames(o: GlitchOptions, index: number, rogue: number): Keyframe[] {
  const n = steps(o);

  // Each layer waits for its own share of the intensity before appearing, so
  // the burst BUILDS from one band to all of them instead of switching on at
  // full density.
  const threshold = ((index + 1) / (o.sliceCount + 1)) * 0.9;

  // One rogue slice per cycle takes ~3x the normal shove. Corruption is never
  // evenly distributed, and its absence is what makes uniform tearing look
  // synthetic.
  const push = index === rogue ? o.maxOffset * o.rogueMultiplier : o.maxOffset;

  const out: Keyframe[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const e = envelope(o, t);

    // ABSOLUTE envelope. The settle is negative, and testing the signed value
    // here would hide it — the one part of the burst that sells it would
    // never render.
    if (Math.abs(e) < threshold) {
      // Rare single-step micro-glitches OUTSIDE the burst, gated to one layer
      // only, so the quiet stretches are not empty.
      const flicker = index === 0 && Math.random() < 0.035;
      if (!flicker) {
        out.push({ opacity: "0", transform: "none", clipPath: "none" });
        continue;
      }
      const b = band(o);
      out.push({
        opacity: "1",
        transform: `translate3d(${((Math.random() - 0.5) * o.maxOffset * 0.3).toFixed(2)}%,0,0)`,
        clipPath: b.path,
      });
      continue;
    }
    const b = band(o);

    // Band HEIGHT is coupled to displacement — thin bands barely move, thick
    // ones fly. With independent randoms a hairline band can cross the whole
    // box, which reads as noise rather than as something physical.
    const scale = 0.35 + b.heightRatio * 0.65;
    out.push({
      opacity: "1",
      transform: `translate3d(${(jolt(o, t) * push * scale).toFixed(2)}%,0,0)`,
      clipPath: b.path,
    });
  }
  return out;
}

// ONE step invisible, not two. Two reads as a flicker; one reads as a frame
// that did not arrive.
function dropFrames(o: GlitchOptions): Keyframe[] {
  const n = steps(o);
  const peakStep = Math.round(
    n * (o.spanStart + (o.spanEnd - o.spanStart) * o.peakAt),
  );
  const out: Keyframe[] = [];
  for (let i = 0; i < n; i++) out.push({ opacity: i === peakStep ? "0" : "1" });
  return out;
}

function badgeFrames(o: GlitchOptions, radius: number): Keyframe[] {
  const n = steps(o);
  const out: Keyframe[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const e = envelope(o, t);
    if (e === 0) {
      out.push({ borderRadius: `${radius}px`, boxShadow: REST_SHADOW });
      continue;
    }
    const r = Math.max(0, radius + jolt(o, t) * o.cornerJitter);
    const lag = (-jolt(o, t) * SHADOW_LAG).toFixed(1);
    out.push({
      borderRadius: `${r.toFixed(2)}px`,
      // Only the CAST shadows lag. The two inset rings are the sign's own
      // border and travel with the panel — offsetting them would peel the
      // border off the sign instead of leaving its shadow behind.
      boxShadow: [
        `inset 0 0 0 3px ${PANEL}`,
        `inset 0 0 0 5px ${RULE}`,
        `${lag}px 1px 2px rgba(0,32,18,0.26)`,
        `${lag}px 6px 14px -6px rgba(0,32,18,0.32)`,
      ].join(", "),
    });
  }
  return out;
}

function shakeFrames(o: GlitchOptions): Keyframe[] {
  const n = steps(o);
  const out: Keyframe[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const x = jolt(o, t) * o.shakeAmplitude * 100;
    const y = jolt(o, t) * o.shakeAmplitude * 100;
    out.push({ transform: `translate3d(${x.toFixed(2)}%,${y.toFixed(2)}%,0)` });
  }
  return out;
}

export class GlitchWord {
  private base: HTMLElement;
  private layers: HTMLElement[];
  private badge: HTMLElement | null;
  private badgeRadius = 8;
  private drift: Animation | null = null;
  private unit: HTMLElement | null = null;
  private sinceDrop = 0;
  private word: string;

  private opts: GlitchOptions = IDLE;
  private anims: Animation[] = [];
  private scrambleTimer: number | null = null;
  private scrambleTick = 0;
  private cycleStart = 0;
  private running = false;
  private reduced: boolean;

  constructor(
    base: HTMLElement,
    layers: HTMLElement[],
    word: string,
    reduced = false,
  ) {
    this.unit = base.closest<HTMLElement>("[data-glitch-magnet]");
    this.badge = base.querySelector<HTMLElement>("[data-glitch-badge]");
    if (this.badge) {
      const r = parseFloat(getComputedStyle(this.badge).borderTopLeftRadius);
      if (!Number.isNaN(r)) this.badgeRadius = r;
    }
    this.base = base;
    this.layers = layers;
    this.word = word;
    this.reduced = reduced;
  }

  setOptions(o: GlitchOptions) {
    this.opts = o;
    if (this.running) {
      this.cancel();
      this.run();
    }
  }

  start() {
    if (this.running || this.reduced) return;
    this.running = true;
    this.run();
    this.startScramble();
    this.startDrift();
  }

  /* A slow resting drift, so the badge is never perfectly still between
     bursts. composite:'add' because the shake writes `transform` on the same
     element — see run(), where the shake is composited the same way for the
     same reason. Two 'replace' writers on one property means the later one
     wins outright and the earlier one silently does nothing. */
  private startDrift() {
    if (this.drift || this.reduced) return;
    /* No additive compositing, no drift. The alternative is worse than
       skipping it: without `add` this animation and the shake both write
       `transform` in replace mode, and since a new shake starts every cycle
       it would clobber the drift permanently anyway — leaving a paused
       animation holding a transform nobody can see, plus one more thing on
       the compositor. */
    if (!supportsAdditive()) return;
    const px = this.opts.driftPx;
    this.drift = this.base.animate(
      [
        { transform: "translate3d(0,0,0)" },
        { transform: `translate3d(${px}px,${-px * 0.6}px,0)` },
        { transform: `translate3d(${-px * 0.8}px,${px}px,0)` },
        { transform: `translate3d(${px * 0.5}px,${px * 0.7}px,0)` },
        { transform: "translate3d(0,0,0)" },
      ],
      {
        duration: 9400,
        iterations: Infinity,
        easing: "ease-in-out",
        composite: "add",
      },
    );
  }

  private stopDrift() {
    this.drift?.cancel();
    this.drift = null;
  }

  stop() {
    this.running = false;
    this.cancel();
    this.stopScramble();
    this.stopDrift();
  }

  private run() {
    const o = this.opts;
    const n = steps(o);

    /* STEPPED KEYFRAMES for anything displaced — steps(n, jump-start), never
       interpolated. Sliding between offsets reads as motion blur; snapping
       reads as digital corruption. `fill: "none"` so every element returns to
       its resting style the instant a cycle ends. */
    const timing: KeyframeAnimationOptions = {
      duration: o.duration,
      iterations: 1,
      easing: `steps(${n}, jump-start)`,
      fill: "none",
    };

    const rogue = Math.floor(Math.random() * o.sliceCount);

    if (
      this.unit &&
      ++this.sinceDrop >= DROP_EVERY + Math.floor(Math.random() * DROP_JITTER)
    ) {
      this.sinceDrop = 0;
      this.anims.push(this.unit.animate(dropFrames(o), timing));
    }

    this.anims = [
      this.base.animate(
        shakeFrames(o),
        supportsAdditive() ? { ...timing, composite: "add" } : timing,
      ),
      ...this.layers
        .slice(0, o.sliceCount)
        .map((el, i) => el.animate(sliceFrames(o, i, rogue), timing)),
    ];

    if (this.badge) {
      // The CORNER RADIUS is the exception to the stepping rule and EASES: a
      // radius is a continuous property of the shape, and stepping it makes
      // the block look randomly redrawn rather than flexing.
      this.anims.push(
        this.badge.animate(badgeFrames(o, this.badgeRadius), {
          duration: o.duration,
          iterations: 1,
          easing: "ease-in-out",
          fill: "none",
        }),
      );
    }

    this.cycleStart = performance.now();
    // RE-ROLL EVERY CYCLE, chained off the previous animation's finished
    // promise rather than a setInterval — an interval queues catch-up cycles
    // in a throttled tab and they all fire at once when it comes forward.
    this.anims[0]?.finished
      .then(() => {
        if (this.running) this.run();
      })
      .catch(() => {
        /* cancelled — expected on stop() and on a preset change */
      });
  }

  private cancel() {
    for (const a of this.anims) {
      try {
        a.cancel();
      } catch {}
    }
    this.anims = [];
    for (const el of this.layers) {
      el.style.opacity = "0";
      el.style.transform = "none";
      el.style.clipPath = "none";
    }
    this.base.style.transform = "none";
    if (this.unit) this.unit.style.removeProperty("opacity");
  }

  /* THE SCRAMBLE is independent of the layers but gated on the SAME envelope,
     or the letters keep flickering through the quiet stretch while nothing is
     torn. Every other tick restores the real word, so it strobes between
     clean and corrupt rather than sitting unreadable. */
  private startScramble() {
    this.stopScramble();
    this.cycleStart = performance.now();
    const tick = () => {
      const o = this.opts;
      const phase =
        ((performance.now() - this.cycleStart) % o.duration) / o.duration;
      if (envelope(o, phase) === 0) {
        this.setText(this.word);
        return;
      }
      if (++this.scrambleTick % 2 !== 0) {
        this.setText(this.word);
        return;
      }
      let out = this.word;
      for (let i = 0; i < out.length; i++) {
        // Letters only. Substituting the space would break the two words into
        // one and change the shape of the thing, which is a much bigger event
        // than a wrong letter.
        if (!/[a-z]/i.test(out[i])) continue;
        if (Math.random() < o.scrambleRate) {
          out = out.slice(0, i) + swap(out[i]) + out.slice(i + 1);
        }
      }
      this.setText(out);
    };
    tick();
    this.scrambleTimer = window.setInterval(tick, this.opts.scrambleInterval);
  }

  private stopScramble() {
    if (this.scrambleTimer !== null) window.clearInterval(this.scrambleTimer);
    this.scrambleTimer = null;
    this.setText(this.word);
  }

  private setText(s: string) {
    const baseSlot =
      this.base.querySelector<HTMLElement>("[data-glitch-text]") ?? this.base;
    baseSlot.textContent = s;
    for (const el of this.layers) {
      const slot = el.querySelector<HTMLElement>("[data-glitch-text]") ?? el;
      slot.textContent = s;
    }
  }

  destroy() {
    this.stop();
  }
}
