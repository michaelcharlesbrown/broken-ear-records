import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { releases } from "@/data/releases";
import { artists } from "@/data/artists";
import Container from "@/components/ui/Container";
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
    <Container className="py-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Left: Larger Image */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0 overflow-hidden">
          <Image
            src={release.coverImage}
            alt={release.title}
            width={800}
            height={800}
            className="w-full h-auto object-cover rounded-none"
            priority
          />
        </div>

        {/* Right: All Content */}
        <div className="flex-1">
          <h1 className={`${typography.h1} mb-2`}>{release.title}</h1>
          <p className="text-lg text-gray-600 mb-4">
            {release.type} · {release.year}
          </p>
          <p className="mb-6">
            By{" "}
            <Link
              href={`/artists/${release.artistSlug}`}
              className="text-blue-600 hover:underline"
            >
              {artist?.name || release.artistSlug}
            </Link>
          </p>

          <section className="mb-6">
            <p>{release.blurb}</p>
          </section>

          {release.streamLinks.length > 0 && (
            <section className="mb-6">
              <h2 className={`${typography.h2} mb-4`}>Stream Links</h2>
              <ul className="flex flex-col gap-2">
                {release.streamLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {release.buyLinks.length > 0 && (
            <section>
              <h2 className={`${typography.h2} mb-4`}>Buy Links</h2>
              <ul className="flex flex-col gap-2">
                {release.buyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </Container>
  );
}
