/* Blossom falling over the artwork.
   ===========================================================================

   D: "could mayb b animated too." This is the animation the audit argued
   for, and the reasoning is worth keeping: the sign already glitches, so
   anything moving beside it competes. The motion belongs IN THE SCENE, and
   the scene already has petals on the ground — so the one thing that can be
   added without inventing a new idea is the petals still falling.

   CSS KEYFRAMES ON N ELEMENTS, NOT A CANVAS OR requestAnimationFrame. There
   are fourteen of them. A canvas would mean a rAF loop running forever on
   the front door, a resize observer, a device-pixel-ratio dance and a second
   thing to pause when the tab hides — for fourteen 6px squares. CSS
   animations are composited off the main thread, survive a backgrounded tab
   with none of that bookkeeping, and stop dead under
   `prefers-reduced-motion` with one media query.

   NO "use client". This renders identical markup on the server and never
   touches an effect, a ref or state — so it stays a server component and
   ships no JavaScript at all.

   EACH PETAL IS A DIV, NOT AN IMAGE. At the size these render (5-9px) a
   photographic petal is indistinguishable from a rounded rectangle, and a
   sprite would be a request plus a decode for something the browser can
   already draw. The shape is one `border-radius` with mismatched corners.

   THE SPREAD IS DERIVED, NOT RANDOM. `Math.random()` here would give the
   server one set of positions and the client another — a hydration mismatch
   and a visible jump. These come from the index via the golden angle, which
   scatters without clustering and is identical in both places. */

const COUNT = 14;

const petals = Array.from({ length: COUNT }, (_, i) => ({
  left: (i * 137.508) % 100,
  size: 5 + ((i * 7) % 5),
  fall: 13 + ((i * 5) % 9),
  sway: 3 + ((i * 3) % 4),
  delay: -((i * 4.3) % 16),
  drift: 18 + ((i * 11) % 26),
  tint: i % 3,
}));

export function Petals() {
  return (
    <div aria-hidden className="vv-petals">
      {petals.map((p, i) => (
        <span
          key={i}
          className={`vv-petal vv-petal--${p.tint}`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size - 1}px`,
            animationDuration: `${p.fall}s, ${p.sway}s`,
            animationDelay: `${p.delay}s, ${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
