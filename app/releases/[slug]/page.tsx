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

  return {
    title: release.title,
    description: release.blurb,
    alternates: {
      canonical: `${PRIMARY_DOMAIN}/releases/${slug}`,
    },
    openGraph: {
      title: `${release.title} | Broken Ear Records`,
      description: release.blurb,
      url: `${PRIMARY_DOMAIN}/releases/${slug}`,
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
      title: `${release.title} | Broken Ear Records`,
      description: release.blurb,
      images: ["/og/og-default.png"],
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
  return (
    <div data-artist-page>
      <Container className="py-24 md:py-32" maxWidth="w-full max-w-[1400px]">
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

            {/* Title + Artist — side by side on desktop, stacked on mobile */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div data-paper-block data-cut={cutVariant(release.slug + "-heading")} className="flex-1">
                <h1>{release.title}</h1>
              </div>
              <div data-paper-block data-cut={cutVariant(release.slug + "-artist-label")} className="flex-1">
                {artist ? (
                  <h2>By <Link href={`/artists/${artist.slug}`}>{artist.name}</Link></h2>
                ) : (
                  <h2>By {release.artistSlug}</h2>
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
  );
}
