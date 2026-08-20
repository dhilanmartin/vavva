/* The Story page, in the document-reader shape.
   ===========================================================================

   Rebuilt 2026-08-19 against the Prismarine site's `/about`, at D's
   instruction: "the same formatting fo rthe about page as well".

   The move is from PAGE to DOCUMENT. What was here — a 48px centred serif
   title over a centred prose column — treated the studio's own account of
   itself as a landing page. This treats it as something to read: a 580px
   column, left-set, 16px throughout, with headings separated from body by
   weight alone (576 against 440) rather than by size.

   THE CENTRAL PARAGRAPH IS STILL D'S TO WRITE. The section below marked
   "why the studio exists" is deliberately absent rather than filled with
   generated prose — that is the whole reason he asked for this page to be
   redone: "make it a denser writeup not ai slop." Something invented here
   that sounds like a founder's note would be exactly that, and harder to
   spot than a gap. When it arrives it goes in as a `.doc-section` with a
   `.doc-heading` and `.doc-text` paragraphs, and this note goes with it. */

export function LeadBlock() {
  return (
    <>
      <div className="doc-head">
        <h1 className="doc-title">Our Story</h1>
        <p className="doc-subtitle">
          Casa Vavva is a studio on Mercer Street in SoHo, New York. It opens in
          fall 2026.
        </p>
      </div>

      <div className="doc-body">
        <section className="doc-section">
          <h2 className="doc-heading">What we make</h2>
          <p className="doc-text">
            We are making a small number of things and finishing each one before
            starting the next. The first is a sandwich bar — peanut butter,
            jelly, and both at once — wrapped in foil and stacked three high.
            The second is a run of cotton tees, printed one colour at a time.
          </p>
        </section>

        <section className="doc-section">
          <h2 className="doc-heading">Where things stand</h2>
          <p className="doc-text">
            Nothing is for sale yet. The prices on the products page are real.
            The sizes are not, and the shop opens when the first run does, not
            before.
          </p>
        </section>
      </div>
    </>
  );
}
