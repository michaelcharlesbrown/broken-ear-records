import type { Metadata } from "next";
import { artists } from "@/data/artists";
import Container from "@/components/ui/Container";
import { typography } from "@/components/ui/Typography";
import MediaCard from "@/components/MediaCard";

const PRIMARY_DOMAIN = "https://brokenearrecords.com";

export const metadata: Metadata = {
  title: "Artists",
  description: "Discover artists on Broken Ear Records.",
  alternates: {
    canonical: `${PRIMARY_DOMAIN}/artists`,
  },
  openGraph: {
    title: "Artists | Broken Ear Records",
    description: "Discover artists on Broken Ear Records.",
    url: `${PRIMARY_DOMAIN}/artists`,
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
    title: "Artists | Broken Ear Records",
    description: "Discover artists on Broken Ear Records.",
    images: ["/og/og-default.png"],
  },
};

export default function Artists() {
  return (
    <Container className="py-8">
      <h2 className={`${typography.h2} mb-6`}>Artists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <MediaCard
            key={artist.slug}
            href={`/artists/${artist.slug}`}
            imageSrc={artist.images.portrait || artist.heroImage}
            imageAlt={artist.name}
            title={artist.name}
            description={artist.shortBio}
            variant="artist"
          />
        ))}
      </div>
    </Container>
  );
}
