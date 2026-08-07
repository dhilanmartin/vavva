// Placeholder inbox — no real address has been confirmed yet; swap before
// this branch ships past a test build. Single source so Nav and Footer
// can't drift from each other while it's still a placeholder.
export const CONTACT_EMAIL = "hello@vavva.xyz";
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;

// 2026-08-07: D asked to push live "despite the placeholder[s], but limit
// the pages available to just the ones without placeholders." Shop, Story,
// and Gift Cards still carry gray AssetPlaceholder boxes and/or an invented
// catalog — Home and Locations are the two pages with no placeholder
// content left. Gated on NEXT_PUBLIC_VERCEL_ENV (the client-exposed mirror
// Vercel auto-provides for Next.js projects — plain VERCEL_ENV is
// server-only and would silently read as undefined in Nav.tsx, a client
// component), so:
//   - local dev / `npm run dev`: unset -> everything stays reachable, keep iterating
//   - Vercel preview deploys (this PR's preview URL): "preview" -> everything reachable, keep reviewing
//   - the actual production deploy (vavva.xyz): "production" -> gated routes 404
// Nav/Footer filtering below is the visible layer; the notFound() calls on
// each gated page are the actual enforcement, since a visitor could still
// type the URL directly.
export const GATED_ROUTES_LIVE =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";
