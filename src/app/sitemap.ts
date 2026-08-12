import type { MetadataRoute } from "next";

// Tracks SECONDARY_PAGES_LIVE. A sitemap entry for a path that 404s is
// worse than no entry — it's an explicit claim to crawlers that the page
// exists, and Search Console reports it as an error. /gift-card came out
// the same way when that route was deleted.
import { SECONDARY_PAGES_LIVE } from "@/lib/site";

// /story dropped 2026-08-12 regardless of SECONDARY_PAGES_LIVE — it now
// always redirects to "/" (see story/page.tsx), and a sitemap entry for a
// redirecting URL is the same problem this comment already describes for a
// 404ing one: an explicit claim to crawlers that a distinct page lives
// there.
const ROUTES = SECONDARY_PAGES_LIVE ? ["/", "/locations", "/products"] : ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `https://vavva.xyz${path}`,
    lastModified,
  }));
}
