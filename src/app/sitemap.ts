import type { MetadataRoute } from "next";

// /gift-card removed 2026-08-07 with the route itself — a sitemap entry for
// a path that 404s is worse than no entry, since it's an explicit claim to
// crawlers that the page exists.
const ROUTES = ["/", "/locations", "/shop", "/story"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `https://vavva.xyz${path}`,
    lastModified,
  }));
}
