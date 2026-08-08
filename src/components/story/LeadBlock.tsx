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
//   rhythm    h1 sits 40px below the 64px header; the lead block starts
//             68px below the h1
//
// The sizes are fixed, not fluid: their /locations h1 measured identically
// at 1280 and 375, so the `desktop:` size jump this file used to carry is
// gone. The serif itself is GT Alpina where a licence is installed and
// Newsreader otherwise — see globals.css.
//
// The words are Vavva's own. Their story paragraph is their copy, and the
// one thing on this branch that is never reproduced; what is reproduced is
// its shape — bold opening claim running straight into the regular-weight
// account behind it, one block, one measure.

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
export function LeadBlock() {
  return (
    <div className="px-6">
      <div className="mimi-measure flex flex-col gap-[68px]">
        <h1 className="mimi-display">The Vavva Story</h1>

        <p className="mimi-lead">
          <strong>
            Vavva was built to make fewer things, and to make them properly.
          </strong>{" "}
          It started with a mark, drawn once by hand, and a question: what
          would a studio feel like if it slowed down. Everything since has been
          in service of that same idea — work that holds up when you look at it
          twice, made at the pace that takes.
        </p>
      </div>
    </div>
  );
}
