/* The Story writeup.
   ===========================================================================

   Two roles only: one statement, then body. The title moved out to PageOpen
   when the shared opening gesture landed (2026-08-19), so this file is the
   words and nothing else.

   ---- what is deliberately missing ----------------------------------------

   The paragraph between these two — why the studio exists — is D's to write.
   It is absent rather than filled with generated prose, which is the whole
   reason he asked for this page to be rebuilt: "make it a denser writeup not
   ai slop." A placeholder that sounds like a founder's note but was invented
   here would be exactly that, and it would be harder to notice than a gap.

   When it arrives it goes between the statement and the closing paragraph,
   as .vv-body, and this comment goes with it. */

export function LeadBlock() {
  return (
    <div className="flex flex-col gap-8">
      <p className="vv-statement">
        Casa Vavva is a studio on Mercer Street. It opens in fall 2026.
      </p>

      <div>
        <p className="vv-body">
          We are making a small number of things and finishing each one before
          starting the next. The first is a sandwich bar — peanut butter,
          jelly, and both at once — wrapped in foil and stacked three high.
          The second is a run of cotton tees, printed one colour at a time.
        </p>
        <p className="vv-body">
          Nothing is for sale yet. The prices on the products page are real.
          The sizes are not, and the shop opens when the first run does, not
          before.
        </p>
      </div>
    </div>
  );
}
