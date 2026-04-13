import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/theme";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/how-it-works", "/order", "/contact"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
