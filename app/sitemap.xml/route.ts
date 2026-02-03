import { NextResponse } from "next/server";
import { artists } from "@/data/artists";
import { releases } from "@/data/releases";

const PRIMARY_DOMAIN = "https://brokenearrecords.com";

export async function GET() {
  const siteUrl = PRIMARY_DOMAIN;

  // Static routes
  const staticRoutes = [
    { url: `${siteUrl}/`, changefreq: "weekly", priority: 1.0 },
    { url: `${siteUrl}/artists`, changefreq: "weekly", priority: 0.8 },
    { url: `${siteUrl}/releases`, changefreq: "weekly", priority: 0.8 },
    { url: `${siteUrl}/about`, changefreq: "monthly", priority: 0.5 },
  ];

  // Dynamic artist routes
  const artistRoutes = artists.map((artist) => ({
    url: `${siteUrl}/artists/${artist.slug}`,
    changefreq: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic artist links routes
  const artistLinksRoutes = artists.map((artist) => ({
    url: `${siteUrl}/artists/${artist.slug}/links`,
    changefreq: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic release routes
  const releaseRoutes = releases.map((release) => ({
    url: `${siteUrl}/releases/${release.slug}`,
    changefreq: "weekly" as const,
    priority: 0.8,
  }));

  // Combine all routes
  const allRoutes = [
    ...staticRoutes,
    ...artistRoutes,
    ...artistLinksRoutes,
    ...releaseRoutes,
  ];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
