import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artists, getArtistHeroSrc } from "@/data/artists";
import { releases } from "@/data/releases";
import ArtistLinksHub from "@/components/ArtistLinksHub";
import ArtistPageShell from "@/components/artists/ArtistPageShell";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PRIMARY_DOMAIN = "https://brokenearrecords.com";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) {
    return {};
  }

  const ogImage = getArtistHeroSrc(artist);

  return {
    title: `${artist.name} - Links`,
    description: `Links for ${artist.name} on Broken Ear Records.`,
    alternates: {
      canonical: `${PRIMARY_DOMAIN}/artists/${slug}/links`,
    },
    openGraph: {
      title: `${artist.name} - Links | Broken Ear Records`,
      description: `Links for ${artist.name} on Broken Ear Records.`,
      url: `${PRIMARY_DOMAIN}/artists/${slug}/links`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: artist.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${artist.name} - Links | Broken Ear Records`,
      description: `Links for ${artist.name} on Broken Ear Records.`,
      images: [ogImage],
    },
  };
}

export default async function ArtistLinks({ params }: PageProps) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) {
    notFound();
  }

  const artistReleases = releases.filter((r) => r.artistSlug === slug);
  const firstRelease = artistReleases[0];

  const coverImage = firstRelease?.coverImage || artist.heroImage;
  const releaseTitle = firstRelease?.title || "Latest Release";

  const links = [
    { href: artist.socials.spotify || "#", label: "Spotify" },
    { href: artist.socials.website || "#", label: "Bandcamp" },
    { href: artist.socials.appleMusic || "#", label: "Apple Music" },
    { href: artist.socials.youtube || "#", label: "YouTube Music" },
  ];

  const socialLinks = [
    { href: artist.socials.instagram || "#", platform: "instagram" as const },
    { href: artist.socials.youtube || "#", platform: "youtube" as const },
    { href: artist.socials.tiktok || "#", platform: "tiktok" as const },
  ];

  return (
    <ArtistPageShell
      heroSrc={getArtistHeroSrc(artist)}
      artistName={artist.name}
    >
      <ArtistLinksHub
        artistName={artist.name}
        releaseTitle={releaseTitle}
        coverImage={coverImage}
        links={links}
        socialLinks={socialLinks}
        backHref={`/artists/${artist.slug}`}
        backLabel="Back to artist"
      />
    </ArtistPageShell>
  );
}
