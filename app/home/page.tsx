import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { artists } from "@/data/artists";
import { releases } from "@/data/releases";
import Container from "@/components/ui/Container";
import { cutVariant } from "@/lib/cutVariant";

const latestRelease = releases.find(
  (release) => release.slug === "beneath-the-burning-sands",
);

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function HomeHero() {
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

            {/* Album title + band name — single button below image */}
            {artist && (
              <Link
                href={`/artists/${artist.slug}`}
                data-paper-block
                data-cut={cutVariant("home-title")}
                className="block w-fit mx-auto text-black text-center"
              >
                <h2>{latestRelease.title}</h2>
                <p>By {artist.name}</p>
              </Link>
            )}

          </div>
        </Container>
      </div>
    </>
  );
}
