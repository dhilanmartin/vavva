// Placeholder inbox — no real address has been confirmed yet; swap before
// this branch ships past a test build. Single source so Nav and the waitlist
// copy can't drift from each other while it's still a placeholder.
export const CONTACT_EMAIL = "hello@vavva.xyz";
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;

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
