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
          url: artist.ogImage ?? getArtistHeroSrc(artist),
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
      images: [artist.ogImage ?? getArtistHeroSrc(artist)],
    },
  };
}

function buildArtistSchema(artist: (typeof artists)[0], artistReleases: typeof releases) {
  const socialSameAs = Object.values(artist.socials).filter((v): v is string => Boolean(v));
  const allSameAs = [...socialSameAs, ...(artist.sameAs ?? [])];

  const musicGroup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicGroup",
        "@id": `${PRIMARY_DOMAIN}/artists/${artist.slug}#musicgroup`,
        name: artist.name,
        url: `${PRIMARY_DOMAIN}/artists/${artist.slug}`,
        description: artist.bioParagraphs[0]?.text ?? artist.shortBio,
        genre: artist.genre,
        member: {
          "@type": "Person",
          "@id": "https://michaelcharlesbrown.com/#person",
          name: "Michael Charles Brown",
        },
        recordLabel: {
          "@type": "Organization",
          "@id": `${PRIMARY_DOMAIN}/#organization`,
        },
        ...(allSameAs.length > 0 && { sameAs: allSameAs }),
        ...(artistReleases.length > 0 && {
          album: artistReleases.map((r) => ({
            "@type": "MusicAlbum",
            "@id": `${PRIMARY_DOMAIN}/releases/${r.slug}#album`,
            name: r.title,
          })),
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: PRIMARY_DOMAIN },
          { "@type": "ListItem", position: 2, name: "Artists", item: `${PRIMARY_DOMAIN}/artists` },
          { "@type": "ListItem", position: 3, name: artist.name, item: `${PRIMARY_DOMAIN}/artists/${artist.slug}` },
        ],
      },
    ],
  };

  return musicGroup;
}

export default async function ArtistDetail({ params }: PageProps) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) {
    notFound();
  }

  const artistReleases = releases.filter((r) => artist.releases.includes(r.slug));
  const schema = buildArtistSchema(artist, artistReleases);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    <ArtistPageShell
      artistName={artist.name}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">

        {/* Left column — photo, name, bio | mobile: 1st */}
        <div className="md:col-span-2 flex flex-col gap-4 md:gap-6 order-1 md:order-none">
          <div data-paper-block data-cut={cutVariant(artist.slug)} className="overflow-hidden">
            <Image
              src={getArtistHeroSrc(artist)}
              alt={artist.name}
              width={1200}
              height={800}
              unoptimized
              className="w-full h-auto object-cover rounded-none"
            />
          </div>
          <div data-paper-block data-cut={cutVariant(artist.slug + "-heading")}>
            <h1>{artist.name}</h1>
          </div>
          <div data-paper-block data-cut={cutVariant(artist.slug + "-bio")}>
            <ArtistBio paragraphs={artist.bioParagraphs} />
          </div>
        </div>

        {/* Right column — releases heading + list | mobile: 2nd */}
        {artistReleases.length > 0 && (
          <div className="md:col-span-1 flex flex-col gap-4 md:gap-6 order-2 md:order-none">
            <div data-paper-nav data-cut={cutVariant(artist.slug + "-releases-label")} className="self-start">
              <p className="eyebrow">Releases</p>
            </div>
            {artistReleases.map((release) => (
              <div key={release.slug} className="flex flex-col gap-3 md:gap-4">
                <div data-paper-block data-cut={cutVariant(artist.slug + "-sidebar-title-" + release.slug)}>
                  <Link href={`/releases/${release.slug}`} className="block">
                    <h2 className="text-black">{release.title}</h2>
                  </Link>
                </div>
                <div data-paper-block data-cut={cutVariant(artist.slug + "-sidebar-" + release.slug)}>
                  <Link href={`/releases/${release.slug}`}>
                    <Image
                      src={release.coverImage}
                      alt={release.title}
                      width={600}
                      height={600}
                      className="w-full h-auto object-cover rounded-none"
                    />
                  </Link>
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

        {/* Social links | mobile: last */}
        <div className="md:col-span-2 order-last md:order-none">
          <ArtistSocialLinks artist={artist} />
        </div>
      </div>
    </ArtistPageShell>
    </>
  );
}
