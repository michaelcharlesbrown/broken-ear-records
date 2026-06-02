import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { artists } from "@/data/artists";
import { releases } from "@/data/releases";
import Container from "@/components/ui/Container";
import { cutVariant } from "@/lib/cutVariant";

const PRIMARY_DOMAIN = "https://brokenearrecords.com";

const latestRelease = releases.find(
  (release) => release.slug === "beneath-the-burning-sands",
);

const DESCRIPTION =
  "Broken Ear Records is an independent record label based in Los Angeles. Home to Red Moon Apostles, Mad Denizen, and Booming Dunes.";

export const metadata: Metadata = {
  title: { absolute: "Broken Ear Records" },
  description: DESCRIPTION,
  alternates: {
    canonical: PRIMARY_DOMAIN,
  },
  openGraph: {
    title: "Broken Ear Records",
    description: DESCRIPTION,
    url: PRIMARY_DOMAIN,
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
    title: "Broken Ear Records",
    description: DESCRIPTION,
    images: ["/og/og-default.png"],
  },
};

export default function Home() {
  if (!latestRelease) {
    return <h1 className="sr-only">Broken Ear Records</h1>;
  }

  const artist = artists.find(
    (entry) => entry.slug === latestRelease.artistSlug,
  );

  return (
    <>
      <h1 className="sr-only">Broken Ear Records</h1>
      <div data-artist-page>
        <Container className="pt-12 pb-24 md:pb-32" maxWidth="w-full max-w-[1400px]">
          <div className="flex flex-col gap-4 md:gap-6">

            {/* Latest Releases — content-width headline */}
            <div>
              <div data-paper-nav data-cut={cutVariant("home-label")}>
                <p className="eyebrow">Latest Releases</p>
              </div>
            </div>

            {/* Hero image — full width */}
            <Link
              href={`/releases/${latestRelease.slug}`}
              data-paper-block
              data-cut={cutVariant("home-image")}
              className="block overflow-hidden"
            >
              <Image
                src="/images/rma/hero-rma.jpg"
                alt={latestRelease.title}
                width={1400}
                height={800}
                className="w-full h-auto object-cover rounded-none"
                priority
              />
            </Link>

            {/* Album title + band name — side by side below image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Link
                href={`/releases/${latestRelease.slug}`}
                data-paper-block
                data-cut={cutVariant("home-title")}
                className="block text-black"
              >
                <h2>{latestRelease.title}</h2>
              </Link>
              {artist && (
                <Link
                  href={`/artists/${artist.slug}`}
                  data-paper-block
                  data-cut={cutVariant("home-artist")}
                  className="block text-black"
                >
                  <h3>{artist.name}</h3>

                </Link>
              )}
            </div>

          </div>
        </Container>
      </div>
    </>
  );
}
