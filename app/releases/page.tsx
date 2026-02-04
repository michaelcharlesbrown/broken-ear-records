import type { Metadata } from "next";
import { releases } from "@/data/releases";
import { artists } from "@/data/artists";
import Container from "@/components/ui/Container";
import { typography } from "@/components/ui/Typography";
import MediaCard from "@/components/MediaCard";

const PRIMARY_DOMAIN = "https://brokenearrecords.com";

export const metadata: Metadata = {
  title: "Releases",
  description: "Discover releases on Broken Ear Records.",
  alternates: {
    canonical: `${PRIMARY_DOMAIN}/releases`,
  },
  openGraph: {
    title: "Releases | Broken Ear Records",
    description: "Discover releases on Broken Ear Records.",
    url: `${PRIMARY_DOMAIN}/releases`,
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Broken Ear Records",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Releases | Broken Ear Records",
    description: "Discover releases on Broken Ear Records.",
    images: ["/og/og-default.png"],
  },
};

export default function Releases() {
  return (
    <Container className="py-8">
      <h1 className={`${typography.h1} mb-6`}>Releases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {releases.map((release) => {
          const artist = artists.find((a) => a.slug === release.artistSlug);
          return (
            <MediaCard
              key={release.slug}
              href={`/releases/${release.slug}`}
              imageSrc={release.coverImage}
              imageAlt={release.title}
              title={release.title}
              description={artist?.name || release.artistSlug}
              variant="release"
              metadata={
                <p className="text-sm text-gray-500">
                  {release.type} · {release.year}
                </p>
              }
            />
          );
        })}
      </div>
    </Container>
  );
}
