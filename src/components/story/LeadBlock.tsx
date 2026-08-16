// story-page.spec.md: centred single column — one bold lead sentence
// immediately followed, same block, by regular-weight text, both serif.
// Rendered as the page's <h1> + lead block: the reference site's own
// page-structure breakdown doesn't list a separate title heading ahead of
// this block, so this doubles as both rather than inventing an extra
// heading the spec didn't document.
//
// ---- 2026-08-07: type now matches mimis.nyc/story exactly ----
//
// Earlier passes sized this from spec notes and a screenshot. It is now read
// off their live computed styles, and every value is reproduced rather than
// approximated (.mimi-display / .mimi-lead in globals.css):
//
//   h1        48px / 56px leading / -0.96px tracking / weight 400 / centred
//   lead      26px / 36.4px leading / -1.04px tracking / weight 400
//   run-in    the opening sentence is <strong> at 700 inside the same
//             paragraph — not a separate standout block above it
//   measure   716px
//   rhythm    h1 sits 40px below the header (mimis' own measured rhythm,
//             independent of Vavva's own header height); the lead block
//             starts 68px below the h1
//
// The sizes are fixed, not fluid: their /locations h1 measured identically
// at 1280 and 375, so the `desktop:` size jump this file used to carry is
// gone. The serif itself is GT Alpina where a licence is installed and
// Newsreader otherwise — see globals.css.
//
// The words are Vavva's own. The reference's story paragraph is their copy
// and is never reproduced; what is reproduced is its shape and its
// measurements — bold opening claim running straight into the
// regular-weight account behind it, one block, one measure.
//
// Length is deliberate, 2026-08-07. The block was running 5 lines against
// the reference's 9, which is what made it read as a different design at
// the same numbers: half the mass in the same column. The copy was extended
// (Vavva's own material — the mark, New York, the studio's stated ethos)
// and measured until the block landed at 327.6px, the reference's own
// height to the decimal. If this copy is rewritten, keep an eye on that
// height rather than on word count.
//
// The other half of that fix was a wrapping bug, not copy: the global
// `p { text-wrap: balance }` was splitting the 682px bold sentence across
// two lines even though it fits the 716px measure on one. .mimi-lead now
// wraps greedily like the reference — see globals.css.

// The 24px gutter sits on an outer wrapper, not on .mimi-measure itself:
// box-sizing is border-box globally, so padding inside a max-width:716px box
// would have made the actual measure 668px — 48px narrower than the
// reference, which is exactly the kind of near-miss this pass exists to
// avoid.
//
// The 68px h1→lead gap is a flex gap rather than a margin utility, because
// .mimi-* sets `margin: 0` and that rule is authored after Tailwind's
// utilities in globals.css — an `mt-[68px]` alongside it loses on source
// order at equal specificity and silently collapses to zero. (It did.)
// Copy rewritten again 2026-08-11 at D's instruction — simpler, and
// deliberately non-revealing this time: no product mention, no health/
// nutrition specifics. Generic "creative studio, coming soon" teaser
// register, on purpose — the actual product isn't ready to be public (see
// plans/002-house-pbj-product.md's outstanding gates). Home page hero copy
// is untouched — this rewrite is scoped to the Story page only. The block
// was previously hand-measured to a specific height against a reference
// site (see git history) — that measurement doesn't apply to new copy;
// re-check height at both breakpoints rather than assuming it lines up.
export function LeadBlock() {
  return (
    <div className="px-6">
      <div className="mimi-measure flex flex-col gap-[68px]">
        <h1 className="mimi-display">The Vavva Story</h1>

        <p className="mimi-lead">
          <strong>Casa Vavva is a creative studio, coming soon.</strong> We
          build products worth waiting for, working with a small set of
          frontier brands doing something genuinely new. Everything we make
          is in service of one idea — a better future, built properly.
        </p>
      </div>
    </div>
  );
}
