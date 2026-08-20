// Instagram. Promoted from a private const in layout.tsx to this file on
// 2026-08-14, when the landing was rebuilt around it (see app/page.tsx): it
// is the JSON-LD `sameAs` entry AND WaitlistForm's fallback target, and
// copies of a URL are how one of them goes stale. The handle is stored
// separately because it gets printed as visible copy — deriving it by
// slicing the URL would be a clever way to make a display string fragile.
export const INSTAGRAM_HANDLE = "@casavavva";
export const INSTAGRAM_HREF = "https://instagram.com/casavavva";

/* Contact. Instagram as of 2026-08-18, at D's instruction, replacing an
   email that was never real.

   WHAT WAS WRONG WITH THE OLD ONE, because "it was a placeholder" undersells
   it: `hello@vavva.xyz` had carried a comment saying "swap before this
   branch ships past a test build" since the file was written, and no mailbox
   was ever stood up. Meanwhile the footer was removed site-wide, which made
   this link THE ONLY WAY to reach the studio from anywhere on the site. So
   the single contact route on a public, indexed site was an address that
   bounces — which is worse than having no contact link at all, because it
   costs the sender a message they think they sent.

   Instagram is not a compromise pick: it is the one destination this repo
   already treats as real. It is the JSON-LD `sameAs` the site publishes to
   Google, it is what WaitlistForm actually opened when no endpoint was
   configured, and DMs are where a studio at this stage gets reached anyway.

   IT IS AN EXTERNAL HTTPS LINK NOW, NOT A `mailto:`, and call sites have to
   know that — a mailto hands off to a mail client and leaves the page where
   it is, where this one navigates away. Every consumer therefore carries
   `target="_blank" rel="noopener noreferrer"`, which preserves the old
   behaviour of not losing the visitor's place. There are three: Nav's header
   row, Nav's mobile panel, and Footer (unmounted).

   To go back to email: put CONTACT_EMAIL back, set this to
   `mailto:${CONTACT_EMAIL}`, and drop the target/rel at those three call
   sites — an external-link target on a mailto is not harmful but it is a
   lie about what the link does. */
export const CONTACT_HREF = INSTAGRAM_HREF;

/* Every primary nav destination points at `/` instead of its own route.
   D, 2026-08-18: "disable the header buttons. (make them clickable and
   hoverable) but just link to the same home page coming soon."

   NOT `SECONDARY_PAGES_LIVE` ON ITS OWN, which is the other lever in this
   file and would look like the obvious one. That flag 404s the routes, and
   with nothing else set it renders Nav as inert <span>s — no href, no hover,
   aria-disabled. D asked for the opposite of that second half: the links
   stay real links, they still hover and still press, they just all arrive at
   the coming-soon landing. A visitor gets a working header that happens to
   have one destination, not a row of dead labels.

   THIS FLAG SAYS NOTHING ABOUT WHETHER THE ROUTES EXIST, which is the whole
   reason there are two of them. Parked + live is a header that skips past
   pages still reachable by URL and still in sitemap.xml (the state through
   2026-08-18). Parked + dark is the pre-launch front door, and is what is
   set now. Unparked + dark is the row of dead labels. The two flags compose;
   neither is a stronger version of the other.

   Contact is untouched by either. It is not a placeholder: it goes to
   Instagram, which is a real destination (see CONTACT_HREF). */
export const NAV_DESTINATIONS_PARKED = true;

/* ^ TRUE again as of 2026-08-19. It went false the day before ("enable a dev
   server with all the pages working"), because a header that always goes
   home makes pages under construction unreachable by clicking. That work is
   parked now — D: "disable the locations/products/our story pages for now" —
   so the pre-launch front door is back and so is this.

   IT IS SET ALONGSIDE `SECONDARY_PAGES_LIVE = false`, AND THE PAIR IS THE
   POINT. Dark routes on their own would render the header as three inert
   labels, which is the thing D ruled out in as many words the last time this
   came up. Parked destinations on their own would leave three public pages
   nothing points at. Together they are the state he has actually asked for
   twice: a header that looks and feels alive, every button arriving at the
   coming-soon landing, and nothing behind them to find.

   Nav.tsx checks THIS flag first for that reason — a parked link's href is
   `/`, never the dark route, so it cannot hand anyone a 404. See NavItem.

   THIS IS A PRODUCTION-FACING FLAG, not a dev-only one. */

// The whole site is the landing page again as of 2026-08-19. D: "disable the
// locations/products/our story pages for now." Same instruction as
// 2026-08-07 ("disable every page but the home page"), same flag; it was
// true for one day while those pages were being worked on.
//
// One boolean, consulted everywhere it matters — the routes themselves
// (notFound()), the nav, the footer and the sitemap — so there is exactly
// one thing to flip when these come back. Deliberately NOT env-derived: an
// env gate would 404 in production while still rendering locally, which is
// the setup that lets a broken page sit unnoticed for a week. This behaves
// the same everywhere.
//
// /story's notFound() gate was ADDED on the way to flipping this, not
// assumed — it had been reopened separately on 2026-08-19 and never got the
// gate its two siblings carry, so this flag would have de-listed it while
// leaving it answering 200. All three are gated now.
//
// Flip to true and Locations / Products / Our Story return, links and
// sitemap entries included. Nothing else needs touching — though consider
// NAV_DESTINATIONS_PARKED above at the same time, since a live page the
// header parks past is reachable only by URL.
export const SECONDARY_PAGES_LIVE = false;

// GATED_ROUTES_LIVE removed 2026-08-07.
//
// It existed for a specific situation: the landing was the finished public
// page, and Shop/Story/Gift Cards were half-built rooms behind it, so
// production hid them and left the front door open. D asked to reopen Story
// ("open back up the Our Story page") and to keep Shop's placeholders
// visible, which retires that arrangement — and the landing is now a
// waitlist, so the whole site reads as pre-launch rather than as a live
// storefront with three doors locked.
//
// A flag that no route consults is worse than no flag: it reads as
// protection that isn't there. The notFound() calls it drove are gone from
// /shop and /story with it.
//
// The one route that went the other way is /gift-card: it was reachable
// only from the footer, the footer was removed site-wide the same day, and
// D's call on the orphan was to delete it ("remove the gift card page for
// now"). src/app/gift-card/ and its sitemap entry are gone. Its four
// components stay under src/components/gift-card/ — unreferenced but
// building, same paused-not-gone convention as the rest of this branch —
// so restoring the page is a matter of putting the route file back.
