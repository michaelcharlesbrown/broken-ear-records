import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { artists, getArtistHeroSrc } from "@/data/artists";
import { releases } from "@/data/releases";
import ArtistBio from "@/components/artists/ArtistBio";
import ArtistSocialLinks from "@/components/artists/ArtistSocialLinks";
import ArtistPageShell from "@/components/artists/ArtistPageShell";
import ReleaseLinks from "@/components/releases/ReleaseLinks";
import { typography } from "@/components/ui/Typography";
import { cutVariant } from "@/lib/cutVariant";

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

  return (
    <ArtistPageShell
      artistName={artist.name}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">

        {/* Headline row — paper blocks sitting on dark background */}
        <div data-paper-block data-cut={cutVariant(artist.slug + "-heading")} className="md:col-span-2">
          <h1>{artist.name}</h1>
        </div>
        {artistReleases.length > 0 && (
          <div data-paper-block data-cut={cutVariant(artist.slug + "-releases-label")} className="md:col-span-1 order-last md:order-none">
            <h2>Releases</h2>
          </div>
        )}

        {/* Left main column — spans 2 of 3 */}
        <div className="md:col-span-2 flex flex-col gap-4 md:gap-6">
          <div data-paper-block data-cut={cutVariant(artist.slug)} className="flex flex-col gap-6">
            <div className="overflow-hidden">
              <Image
                src={artist.images.portrait || artist.heroImage}
                alt={artist.name}
                width={1200}
                height={800}
                className="w-full h-auto object-cover rounded-none"
              />
            </div>

            <ArtistBio paragraphs={artist.bioParagraphs} />
          </div>
        </div>

        {/* Right sidebar — 1 of 3 */}
        {artistReleases.length > 0 && (
          <div className="md:col-span-1 flex flex-col gap-4 md:gap-6 order-last md:order-none">
            {artistReleases.map((release) => (
              <div key={release.slug} className="flex flex-col gap-3 md:gap-4">
                <div data-paper-block data-cut={cutVariant(artist.slug + "-sidebar-title-" + release.slug)}>
                  <Link href={`/releases/${release.slug}`} className="block">
                    <h3 className="text-black">{release.title}</h3>
                  </Link>
                </div>

                <div data-paper-block data-cut={cutVariant(artist.slug + "-sidebar-" + release.slug)} className="flex flex-col gap-3">
                  <Link href={`/releases/${release.slug}`}>
                    <Image
                      src={release.coverImage}
                      alt={release.title}
                      width={600}
                      height={600}
                      className="w-full h-auto object-cover rounded-none"
                    />
                  </Link>

                  {release.blurbParagraphs[0] && (
                    <p className={typography.body}>
                      {release.blurbParagraphs[0].text}
                    </p>
                  )}
                </div>

                <ReleaseLinks
                  buyLinks={release.buyLinks}
                  streamLinks={release.streamLinks}
                  slug={release.slug}
                />
              </div>
            ))}
          </div>
        )}

        {/* Social links — bottom of page on mobile, below bio on desktop */}
        <div className="md:col-span-2 order-last md:order-none">
          <ArtistSocialLinks artist={artist} />
        </div>
      </div>
    </ArtistPageShell>
  );
}
