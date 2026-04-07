import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { artists, getArtistHeroSrc } from "@/data/artists";
import { releases } from "@/data/releases";
import LinkButton from "@/components/LinkButton";
import ArtistPageShell from "@/components/artists/ArtistPageShell";
import { typography } from "@/components/ui/Typography";

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
    title: artist.name,
    description: artist.shortBio,
    alternates: {
      canonical: `${PRIMARY_DOMAIN}/artists/${slug}`,
    },
    openGraph: {
      title: `${artist.name} | Broken Ear Records`,
      description: artist.shortBio,
      url: `${PRIMARY_DOMAIN}/artists/${slug}`,
      images: [
        {
          url: getArtistHeroSrc(artist),
          width: 1200,
          height: 630,
          alt: artist.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${artist.name} | Broken Ear Records`,
      description: artist.shortBio,
      images: [getArtistHeroSrc(artist)],
    },
  };
}

export default async function ArtistDetail({ params }: PageProps) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) {
    notFound();
  }

  const artistReleases = releases.filter((r) => artist.releases.includes(r.slug));

  const links = [
    artist.socials.website && { href: artist.socials.website, label: "Website" },
    artist.socials.spotify && { href: artist.socials.spotify, label: "Spotify" },
    artist.socials.instagram && {
      href: artist.socials.instagram,
      label: "Instagram",
    },
    artist.socials.youtube && { href: artist.socials.youtube, label: "YouTube" },
  ].filter(Boolean) as Array<{ href: string; label: string }>;

  return (
    <ArtistPageShell
      heroSrc={getArtistHeroSrc(artist)}
      artistName={artist.name}
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0 overflow-hidden">
          <Image
            src={artist.images.portrait || artist.heroImage}
            alt={artist.name}
            width={800}
            height={800}
            className="w-full h-auto object-cover rounded-none"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <h1 className={`${typography.h1} mb-6`}>{artist.name}</h1>

          <section className="mb-8">
            <p>{artist.fullBio}</p>
          </section>

          {artistReleases.length > 0 && (
            <section className="mb-8">
              <h2 className={`${typography.sectionLabel} mb-4`}>Releases</h2>
              <ul>
                {artistReleases.map((release) => (
                  <li key={release.slug}>
                    <Link
                      href={`/releases/${release.slug}`}
                      className={`${typography.h2} text-black hover:text-black focus-visible:text-black active:text-black visited:text-black`}
                    >
                      {release.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {links.length > 0 && (
            <section>
              <div className="flex flex-wrap gap-4">
                {links.map((link) => (
                  <LinkButton
                    key={link.label}
                    href={link.href}
                    label={link.label}
                    external={true}
                    artist={artist.name}
                    className="text-black hover:text-black focus-visible:text-black active:text-black visited:text-black inline-block"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </ArtistPageShell>
  );
}
