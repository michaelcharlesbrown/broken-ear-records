import type { Metadata } from "next";
import { artists } from "@/data/artists";
import Container from "@/components/ui/Container";
import { typography } from "@/components/ui/Typography";
import MediaCard from "@/components/MediaCard";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  title: "Artists",
  description: "Discover artists on Broken Ear Records.",
  alternates: {
    canonical: `${siteUrl}/artists`,
  },
  openGraph: {
    title: "Artists | Broken Ear Records",
    description: "Discover artists on Broken Ear Records.",
    url: `${siteUrl}/artists`,
  },
  twitter: {
    title: "Artists | Broken Ear Records",
    description: "Discover artists on Broken Ear Records.",
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
