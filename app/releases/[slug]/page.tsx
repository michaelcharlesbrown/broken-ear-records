import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { releases } from "@/data/releases";
import { artists } from "@/data/artists";
import Container from "@/components/ui/Container";
import ArtistBio from "@/components/artists/ArtistBio";
import ArtistSocialLinks from "@/components/artists/ArtistSocialLinks";
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
  const release = releases.find((r) => r.slug === slug);

  if (!release) {
    return {};
  }

  const artist = artists.find((a) => a.slug === release.artistSlug);
  const description = artist
    ? `${release.title} by ${artist.name} — ${release.blurb}`
    : release.blurb;

  return {
    title: release.title,
    description,
    alternates: {
      canonical: `${PRIMARY_DOMAIN}/releases/${slug}`,
    },
    openGraph: {
      title: `${release.title} | Broken Ear Records`,
      description,
      url: `${PRIMARY_DOMAIN}/releases/${slug}`,
      images: [
        {
          url: release.coverImage,
          width: 1200,
          height: 1200,
          alt: `${release.title} — Broken Ear Records`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${release.title} | Broken Ear Records`,
      description,
      images: [release.coverImage],
    },
  };
}

export default async function ReleaseDetail({ params }: PageProps) {
  const { slug } = await params;
  const release = releases.find((r) => r.slug === slug);

  if (!release) {
    notFound();
  }

  const artist = artists.find((a) => a.slug === release.artistSlug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicAlbum",
        "@id": `${PRIMARY_DOMAIN}/releases/${release.slug}#album`,
        name: release.title,
        url: `${PRIMARY_DOMAIN}/releases/${release.slug}`,
        description: release.blurb,
        datePublished: String(release.year),
        image: `${PRIMARY_DOMAIN}${release.coverImage}`,
        albumReleaseType: "https://schema.org/StudioAlbum",
        byArtist: {
          "@type": "MusicGroup",
          "@id": `${PRIMARY_DOMAIN}/artists/${release.artistSlug}#musicgroup`,
          name: artist?.name ?? release.artistSlug,
        },
        recordLabel: {
          "@type": "Organization",
          "@id": `${PRIMARY_DOMAIN}/#organization`,
        },
        ...(release.review && {
          review: {
            "@type": "Review",
            url: release.review.url,
            ...(release.review.designation && { name: release.review.designation }),
            reviewBody: release.review.body,
            author: {
              "@type": "Person",
              name: release.review.author,
            },
            publisher: {
              "@type": "Organization",
              name: release.review.publication,
              url: release.review.publicationUrl,
            },
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: PRIMARY_DOMAIN },
          { "@type": "ListItem", position: 2, name: "Releases", item: `${PRIMARY_DOMAIN}/releases` },
          { "@type": "ListItem", position: 3, name: release.title, item: `${PRIMARY_DOMAIN}/releases/${release.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    <div data-artist-page>
      <Container className="pt-12 pb-24 md:pb-32" maxWidth="w-full max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">

          {/* Cover — mobile: 1st | desktop: left col */}
          <div data-paper-block data-cut={cutVariant(release.slug)} className="order-1 md:col-start-1 md:row-start-1 overflow-hidden">
            <Image
              src={release.coverImage}
              alt={release.title}
              width={800}
              height={800}
              className="w-full h-auto object-cover rounded-none"
              priority
            />
          </div>

          {/* Right column: title+artist row, bio, links, social */}
          <div className="order-2 md:col-start-2 md:row-start-1 flex flex-col gap-4 md:gap-6">

            {/* Title + Artist — stacked, each spanning full column width */}
            <div className="flex flex-col gap-4 md:gap-6">
              <div data-paper-block data-cut={cutVariant(release.slug + "-heading")}>
                <h1>{release.title}</h1>
              </div>
              <div data-paper-block data-cut={cutVariant(release.slug + "-artist-label")}>
                {artist ? (
                  <h2><Link href={`/artists/${artist.slug}`}>{artist.name}</Link></h2>
                ) : (
                  <h2>{release.artistSlug}</h2>
                )}
              </div>
            </div>

            {/* Bio */}
            <div data-paper-block data-cut={cutVariant(release.slug + "-bio")} className="[&_.artist-bio]:mb-0">
              <ArtistBio paragraphs={release.blurbParagraphs} />
            </div>

            {/* Stream/Buy */}
            <div>
              <ReleaseLinks
                buyLinks={release.buyLinks}
                streamLinks={release.streamLinks}
                slug={release.slug}
              />
            </div>

            {/* Social */}
            {artist && (
              <div>
                <ArtistSocialLinks artist={artist} />
              </div>
            )}

          </div>
        </div>
      </Container>
    </div>
    </>
  );
}
