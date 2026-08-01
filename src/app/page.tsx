import { VavvaMark } from "@/components/brand/VavvaMark";
import { DiaGradient } from "@/components/dia/DiaGradient";
import { AccessGate } from "@/components/gate/AccessGate";

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-[#E8E8E8] antialiased">
      {/* Top-anchored: 3.25rem mobile / 6rem desktop / 9rem on a tall frame.

          Two measures, and this is the one place the page deliberately sets a
          different one per breakpoint.

          216 on a phone. The statement is 386px set on one line, and it splits
          into the same two lines — 169 and 214 — at every width from 240 to
          360, so above 240 the column was not buying a different break, only an
          ever-growing strip of bare paper to the right of those two lines. At
          308 that strip put the fill at 62%; at 216 it is 89%.

          392 on desktop, where the whole statement lands on ONE line at 386px
          (98%) and the gloss settles from four lines to two (327 / 306). That
          is the strongest setting this copy can make, and it is unreachable on
          a phone: 375px of viewport clears 343, so mobile would fall back to
          the 169/214 pair inside a column half again too wide for it. Hence
          both, rather than a compromise that is second-best twice.

          This overrides the old "one measure at every width" rule, knowingly.
          That rule existed to stop a widening column pulling an accent phrase
          up onto the previous line and splitting it in half — which is why the
          phrase it protected used to be white-space:nowrap. `.place` sits at
          the end of the sentence now: at 216 it lands whole on line two, at 392
          it lands whole on the single line. Checked at both. Nothing else in
          the copy can straddle the break.

          max-w is the measure plus the padding: 248 − 32 below md, 432 − 40
          above. At 216 the column is still wider than the mark it sits under
          (136), which is the proportion that matters.

          The third padding step is keyed to viewport *height*, not width. The
          aurora is 44dvh, so the paper the column actually sits on is the top
          56% of the frame, and the block is now ~266px tall on desktop — the
          one-line statement and two-line gloss took 66px out of it. True
          optical centring in that band, (0.56H − 266) / 2, would want 119px at
          900 and 169px at 1080, and both steps here sit about 24px above that
          on purpose: the page is top-anchored, not centred, and the aim of the
          tall-frame step was only to stop the block stranding over a dead
          stripe of paper, not to pull it to the middle. Deliberately a static
          breakpoint rather than a dvh calc — dvh arithmetic here is what
          produced the iOS seam this page has already been through once. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[248px] flex-1 flex-col px-4 pb-28 pt-13 md:max-w-[432px] md:px-5 md:pt-24 [@media(min-height:1000px)]:md:pt-36">
        {/* The house logo, and now the only VAVVA on the page at all.
            It is an h1 because it is the page's title — the mark carries the
            name, so without this the document has no heading at all.

            Centred over ragged-left copy: a menu masthead. The mark is the only
            centred object on the page, which is what makes it read as a head
            rather than as the first line of the block.

            Centring is safe to do geometrically here because the asset is
            alpha-trimmed and its glyph extents are symmetric — ink spans
            x=2..1023 of 1026, midpoint 512.5 against a frame centre of 513.0.
            The ink *mass* is left-heavy (59.9/40.1, centroid 6.68% left of
            centre) because the V is the tallest, heaviest stroke, but for a word
            the eye tracks extents, not density. Correcting to the centroid would
            visibly shove it right. */}
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
            {/* The city carries the accent, and it is not a link. Sending a
                visitor to a Wikipedia article about New York is a leak off a
                one-page site, and a red link would have collided twice over:
                .bio-link resolved its hover to #000, so a red link would have
                *darkened* on hover, and .social-link already answers in red. */}
            Casa Vavva is a creative studio based in{" "}
            <span className="place">New York City</span>.
          </p>

          {/* The gloss stays at the statement's 15px/1.4, and that is a
              measured decision rather than inertia — it was briefly set to 13
              and put back.

              Size here is a fill control, not a hierarchy control, because the
              line count is pinned by word boundaries: four lines at the phone
              measure for anything from 12 to 16px, two lines on desktop from 12
              to 15. Inside a fixed line count, smaller type does not fit more
              words, it just draws the same words narrower — so shrinking the
              gloss strands it in the middle of the column and pulls the whole
              block off centre. Fill by size, phone / desktop: 13px 73/81,
              14px 78/87, 15px 84/93.

              16px fills the phone better still (89%), and is rejected: it
              overflows desktop to three lines at 66%, and it would set the
              gloss larger than the statement it glosses. 15 is the largest size
              that is neither.

              Hierarchy is carried by colour instead — --mute against the
              statement's black/90 — and by .ipa's weight inside this line.
              Colour is the cheaper lever here because it costs no fill at all. */}
          <p
            className="home-rise mt-6 mb-0 text-[color:var(--mute)]"
            style={{ ["--i" as string]: 2 }}
          >
            Vavva{" "}
            {/* No lang="el" here. It used to claim this was Greek, and it is
                not: the brackets hold IPA — Latin letters plus the IPA
                modifiers ˈ ˌ ː — not Greek script. The attribute told a screen
                reader to switch to a Greek voice and apply Greek pronunciation
                rules to characters Greek does not have. The etymology this
                glosses is Greek; the notation is not. */}
            <span className="ipa">[vaˈvˌvːa]</span>
            ; evokes a sense of beauty, peace, and abundance according to ancient
            Greek philosophy.
          </p>
        </header>

        {/* mt-6, not mt-9. The CTA is an inline-flex with a 2.75rem tap-target
            floor, so its 21px line box centres inside a 44px box and donates
            ~11.5px of invisible padding above the glyphs. At mt-9 the gap
            measured 36px and read as 47px. */}
        <footer
          className="home-rise mt-6"
          style={{ ["--i" as string]: 3 }}
        >
          <AccessGate />
        </footer>
      </div>

      <div className="dia-stage" aria-hidden>
        <DiaGradient reveal="mount" />
      </div>
    </main>
  );
}
