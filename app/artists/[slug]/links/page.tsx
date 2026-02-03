import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artists } from "@/data/artists";
import { releases } from "@/data/releases";
import ArtistLinksHub from "@/components/ArtistLinksHub";

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
    },
    twitter: {
      title: `${artist.name} - Links | Broken Ear Records`,
      description: `Links for ${artist.name} on Broken Ear Records.`,
    },
  };
}

export default async function ArtistLinks({ params }: PageProps) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) {
    notFound();
  }

  // Get the first release for this artist to use as the cover image
  const artistReleases = releases.filter((r) => r.artistSlug === slug);
  const firstRelease = artistReleases[0];
  
  // Use the first release's cover image, or fall back to artist hero image
  const coverImage = firstRelease?.coverImage || artist.heroImage;
  const releaseTitle = firstRelease?.title || "Latest Release";

  // Build consistent streaming platform links - always show these four platforms in this exact order
  // All four platforms will always be present, using artist socials URLs
  const links = [
    { href: artist.socials.spotify || "#", label: "Spotify" },
    { href: artist.socials.website || "#", label: "Bandcamp" },
    { href: artist.socials.appleMusic || "#", label: "Apple Music" },
    { href: artist.socials.youtube || "#", label: "YouTube Music" },
  ];

  // Build social links for bottom icons - always show these three platforms in this order
  // All three platforms will always be present, using artist socials URLs
  const socialLinks = [
    { href: artist.socials.instagram || "#", platform: "instagram" as const },
    { href: artist.socials.youtube || "#", platform: "youtube" as const },
    { href: artist.socials.tiktok || "#", platform: "tiktok" as const },
  ];

  return (
    <ArtistLinksHub
      artistName={artist.name}
      releaseTitle={releaseTitle}
      coverImage={coverImage}
      links={links}
      socialLinks={socialLinks}
      backHref={`/artists/${artist.slug}`}
      backLabel="BROKEN EAR RECORDS"
    />
  );
}
