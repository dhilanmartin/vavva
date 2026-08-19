/* The Story page's opening block.
   ===========================================================================

   ---- 2026-08-18: rebuilt as a writeup, not a statement ------------------

   D: "make it a denser writeup not ai slop."

   What was here was one 26px sentence floating in a 68px gap, and it said
   very little in a lot of space: "products worth waiting for", "frontier
   brands doing something genuinely new", "a better future, built properly".
   Every clause of that is unfalsifiable — it would be true of any studio,
   which means it identifies none. That is the actual definition of the slop,
   not the formatting.

   The replacement is concrete or it is not here: a street, a season, the two
   things being made, and what is and is not for sale. Where a fact is only
   D's to supply, this page says less rather than inventing a founding story
   for a real business.

   THE PROSE TURNS LEFT while the h1 stays centred. See `.vv-prose` in
   globals.css for why: centred running text is fine for two lines and
   punishing for four.

   Copy still to come from D — the paragraph that says WHY the studio
   exists. It is deliberately absent rather than filled with something that
   sounds like it. */

export function LeadBlock() {
  return (
    <div className="px-6">
      <div className="mimi-measure flex flex-col gap-10">
        <h1 className="mimi-display">The Vavva Story</h1>

        {/* The lead and the body share ONE column so their left edges line
            up — see `.vv-story-col` in globals.css. */}
        <div className="vv-story-col flex flex-col gap-10">
        <p className="mimi-lead vv-story-lead">
          <strong>Casa Vavva is a studio on Mercer Street.</strong> It opens in
          fall 2026.
        </p>

        <div className="vv-prose vv-prose-stack">
          <p>
            We are making a small number of things and finishing each one
            before starting the next. The first is a sandwich bar — peanut
            butter, jelly, and both at once — wrapped in foil and stacked
            three high. The second is a run of cotton tees, printed one colour
            at a time.
          </p>
          <p>
            Nothing is for sale yet. The prices on the products page are real.
            The sizes are not, and the shop opens when the first run does,
            not before.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
