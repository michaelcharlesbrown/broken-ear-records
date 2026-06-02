import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artists, getArtistHeroSrc } from "@/data/artists"; // getArtistHeroSrc used in generateMetadata
import { releases } from "@/data/releases";
import ArtistLinksHub from "@/components/ArtistLinksHub";
import type { PlatformLink, SocialLink } from "@/components/ArtistLinksHub";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PRIMARY_DOMAIN = "https://brokenearrecords.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);
  if (!artist) return {};

  const firstRelease = releases.find((r) => r.artistSlug === slug);
  const ogImage = getArtistHeroSrc(artist);
  const releaseClause = firstRelease ? `"${firstRelease.title}" by ` : "";

  return {
    title: `${artist.name} — Listen Now`,
    description: `Stream and buy ${releaseClause}${artist.name} on Spotify, Bandcamp and more. An independent release on Broken Ear Records.`,
    alternates: {
      canonical: `${PRIMARY_DOMAIN}/artists/${slug}/links`,
    },
    openGraph: {
      title: `${artist.name} — Listen Now`,
      description: `Stream and buy ${releaseClause}${artist.name} on Spotify, Bandcamp and more.`,
      url: `${PRIMARY_DOMAIN}/artists/${slug}/links`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: artist.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${artist.name} — Listen Now`,
      description: `Stream and buy ${releaseClause}${artist.name} on Spotify, Bandcamp and more.`,
      images: [ogImage],
    },
  };
}

export default async function ArtistLinks({ params }: PageProps) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);
  if (!artist) notFound();

  const firstRelease = releases.find((r) => r.artistSlug === slug);
  const coverImage = firstRelease?.coverImage ?? artist.heroImage;
  const releaseTitle = firstRelease?.title ?? artist.name;

  const bandcampBuyLink = firstRelease?.buyLinks.find((l) => l.label === "Bandcamp");

  const links: PlatformLink[] = [
    artist.socials.spotify
      ? { href: artist.socials.spotify, label: "Spotify" }
      : null,
    artist.socials.appleMusic
      ? { href: artist.socials.appleMusic, label: "Apple Music" }
      : null,
    bandcampBuyLink
      ? { href: bandcampBuyLink.href, label: "Bandcamp" }
      : null,
    artist.socials.youtube
      ? { href: artist.socials.youtube, label: "YouTube Music" }
      : null,
  ].filter((l): l is PlatformLink => l !== null);

  const socialLinks: SocialLink[] = [
    artist.socials.instagram
      ? { href: artist.socials.instagram, platform: "instagram" as const }
      : null,
    artist.socials.youtube
      ? { href: artist.socials.youtube, platform: "youtube" as const }
      : null,
    artist.socials.tiktok
      ? { href: artist.socials.tiktok, platform: "tiktok" as const }
      : null,
  ].filter((s): s is SocialLink => s !== null);

  return (
    <div
      data-links-page
      style={{ "--links-hero": `url(${coverImage})` } as React.CSSProperties}
    >
      <div data-links-bg />
      <ArtistLinksHub
        artistName={artist.name}
        releaseTitle={releaseTitle}
        coverImage={coverImage}
        links={links}
        socialLinks={socialLinks}
      />
    </div>
  );
}
