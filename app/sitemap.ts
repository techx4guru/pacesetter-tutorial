import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = ["", "/about", "/services", "/resources", "/gallery", "/contact"].map((path) => ({
    url: `${site.url}${path || "/"}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  try {
    const posts = await listPosts();
    return [
      ...staticRoutes,
      ...posts.map((post) => ({
        url: `${site.url}/resources/${post.slug}`,
        lastModified: post.published_at,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    return staticRoutes;
  }
}
