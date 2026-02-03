import { NextResponse } from "next/server";

const PRIMARY_DOMAIN = "https://brokenearrecords.com";

export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${PRIMARY_DOMAIN}/sitemap.xml
`;

  return new NextResponse(robots, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
