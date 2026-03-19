import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-static";

function isProductionHost(url: string): boolean {
  return /^https:\/\/(www\.)?mach2\.cloud$/i.test(url.replace(/\/$/, ""));
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  const allowIndexing =
    isProductionHost(baseUrl) && process.env.VERCEL_ENV !== "preview";

  if (!allowIndexing) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${baseUrl}/sitemap.xml`,
      host: baseUrl,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
