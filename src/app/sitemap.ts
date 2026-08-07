import type { MetadataRoute } from "next";

const ROUTES = ["/", "/locations", "/shop", "/story", "/gift-card"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((path) => ({
    url: `https://vavva.xyz${path}`,
    lastModified,
  }));
}
