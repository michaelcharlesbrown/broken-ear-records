import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { artists } from "@/data/artists";
import { releases } from "@/data/releases";
import LinkButton from "@/components/LinkButton";
import Container from "@/components/ui/Container";
import { typography } from "@/components/ui/Typography";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

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
      canonical: `${siteUrl}/artists/${slug}`,
    },
    openGraph: {
      title: `${artist.name} | Broken Ear Records`,
      description: artist.shortBio,
      url: `${siteUrl}/artists/${slug}`,
    },
    twitter: {
      title: `${artist.name} | Broken Ear Records`,
      description: artist.shortBio,
    },
  };
}

export default async function ArtistDetail({ params }: PageProps) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) {
    notFound();
  }

  // Get releases for this artist
  const artistReleases = releases.filter((r) => artist.releases.includes(r.slug));

  // Build links from socials
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
    <Container className="py-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Left: Larger Image */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0 overflow-hidden group">
          <Image
            src={artist.images.portrait || artist.heroImage}
            alt={artist.name}
            width={800}
            height={800}
            className="w-full h-auto object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            priority
          />
        </div>

        {/* Right: All Content */}
        <div className="flex-1">
          <h1 className={`${typography.h1} mb-6`}>{artist.name}</h1>

          <section className="mb-8">
            <p>{artist.fullBio}</p>
          </section>

          {artistReleases.length > 0 && (
            <section className="mb-8">
              <h2 className={typography.h2}>Releases</h2>
              <ul>
                {artistReleases.map((release) => (
                  <li key={release.slug}>
                    <Link
                      href={`/releases/${release.slug}`}
                      className="text-blue-600 hover:underline"
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
              <h2 className={typography.h2}>Links</h2>
              <div className="flex gap-4">
                {links.map((link) => (
                  <LinkButton
                    key={link.label}
                    href={link.href}
                    label={link.label}
                    external={true}
                    artist={artist.name}
                    className="text-blue-600 hover:underline inline-block"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Container>
  );
}
