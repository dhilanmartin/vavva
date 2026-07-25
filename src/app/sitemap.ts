import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://vavva.xyz", lastModified: new Date() }];
}
