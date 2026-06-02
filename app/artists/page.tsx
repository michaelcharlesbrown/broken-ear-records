import type { Metadata } from "next";
import { artists } from "@/data/artists";
import Container from "@/components/ui/Container";
import { typography } from "@/components/ui/Typography";
import MediaCard from "@/components/MediaCard";

const PRIMARY_DOMAIN = "https://brokenearrecords.com";

const DESCRIPTION =
  "Explore artists on Broken Ear Records — Red Moon Apostles, Mad Denizen, and Booming Dunes. Independent label based in Los Angeles.";

export const metadata: Metadata = {
  title: "Artists",
  description: DESCRIPTION,
  alternates: {
    canonical: `${PRIMARY_DOMAIN}/artists`,
  },
  openGraph: {
    title: "Artists | Broken Ear Records",
    description: DESCRIPTION,
    url: `${PRIMARY_DOMAIN}/artists`,
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Broken Ear Records — Artists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artists | Broken Ear Records",
    description: DESCRIPTION,
    images: ["/og/og-default.png"],
  },
};

export default function Artists() {
  return (
    <Container className="px-5 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20">
      <h1 className={`${typography.h1} mb-6 sr-only`}>Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-14">
        {artists.map((artist) => (
          <MediaCard
            key={artist.slug}
            href={`/artists/${artist.slug}`}
            imageSrc={artist.images.portrait || artist.heroImage}
            imageAlt={artist.name}
            title={artist.name}
            variant="artist"
          />
        ))}
      </div>
    </Container>
  );
}
