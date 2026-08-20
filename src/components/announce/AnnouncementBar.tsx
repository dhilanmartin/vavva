/* The top bar — and as of 2026-08-19 it is the HEADER'S GROUND rather than a
   message of its own.
   ===========================================================================

   D: "Place the current header components on the announcement bar and remove
   the current announcement bar copy ... keep the announcement bar how it is
   (same size) ... and just fit the buttons onto the announcement bar."

   So this file announces nothing. What it keeps is the CHROME the bar was
   carrying — shadowlion.com's white field and `0 2px 8px rgba(0,0,0,.1)`
   drop shadow, read out of their served CSS — and the nav now stands on it.
   One 43px bar at the top of every route instead of a 43px strip of copy
   above a 64px bar of links. The bar's own height did not change; see
   `.vv-announce` in globals.css for where the 43px now comes from.

   ---- what went with the copy, and why it could not stay ------------------

   THE DISMISS BUTTON, and this one is a consequence rather than a request.
   The close control wrote `vv-announce:v1` to localStorage and the inline
   script in layout.tsx stamped `announce-off` on <html> before first paint,
   which set `display: none` on this bar. With the nav living inside it, that
   is a button that permanently deletes the site's navigation — on every
   route, for that visitor, with no way back short of clearing storage. A
   dismissible header is not a header. The `announce-off` read is gone from
   layout.tsx's script too, so someone who dismissed the old bar on a
   previous visit does not load into a site with no nav.

   THE EXIT (`.vv-announce-shell`'s grid-rows collapse) went with the button
   that triggered it, since nothing dismisses the bar any more.

   THE ENTRANCE (`announceIn`). The bar used to fade and drop 8px into place
   at 0.02s, leading the header's `.home-rise` cascade. Nested, that is two
   entrances playing the same 420ms — the three header zones fading in inside
   a parent that is itself fading in. The bar is static now and those zones
   keep their own stagger, which is the motion that was always doing the work.

   DROPPING DISMISSAL IS WHAT MAKES THIS A SERVER COMPONENT AGAIN: no state,
   no effect, no localStorage, no client bundle. It was the only client
   component in the chrome.

   All of it is one `git revert` away if the announcement returns — and it
   would return BESIDE the nav rather than above it, which is a layout
   question this component would have to answer then, not now. */

export function AnnouncementBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="vv-announce">{children}</div>;
}
