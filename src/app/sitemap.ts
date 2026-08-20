import type { MetadataRoute } from "next";

// Tracks SECONDARY_PAGES_LIVE. A sitemap entry for a path that 404s is
// worse than no entry — it's an explicit claim to crawlers that the page
// exists, and Search Console reports it as an error. /gift-card came out
// the same way when that route was deleted.
import { SECONDARY_PAGES_LIVE } from "@/lib/site";

// /story is BACK IN, 2026-08-19. It was dropped on 2026-08-12 because it
// redirected to "/" at the time, and a sitemap entry for a redirecting URL
// is the same problem described above for a 404ing one. That premise went
// stale when the page was reopened and nobody updated this list: /story now
// returns 200 with its own title and content, and it is linked from both
// Nav and Footer, so excluding it hid a real page from crawlers while the
// UI pointed at it.
//
// It is gated by SECONDARY_PAGES_LIVE like its two siblings, which is what
// keeps the three of them from drifting apart again — they are one flag and
// one list, not three separate decisions.
const ROUTES = SECONDARY_PAGES_LIVE
  ? ["/", "/locations", "/products", "/story"]
  : ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `https://vavva.xyz${path}`,
    lastModified,
  }));
}
