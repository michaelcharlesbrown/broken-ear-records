import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { artists } from "@/data/artists";
import { releases } from "@/data/releases";

const PRIMARY_DOMAIN = "https://brokenearrecords.com";

const latestRelease = releases.find(
  (release) => release.slug === "red-moon-apostles-debut",
);

export const metadata: Metadata = {
  title: "Home",
  description: "Independent record label based in Los Angeles.",
  alternates: {
    canonical: PRIMARY_DOMAIN,
  },
  openGraph: {
    title: "Broken Ear Records",
    description: "Independent record label based in Los Angeles.",
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
    description: "Independent record label based in Los Angeles.",
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
      <section data-home-hero>
        <div data-home-hero-inner>
          <p data-home-hero-label>Latest Releases</p>
          <Link
            href={`/releases/${latestRelease.slug}`}
            data-home-hero-release
            className="text-black hover:text-black focus-visible:text-black active:text-black visited:text-black"
          >
            <div data-home-hero-cover>
              <Image
                src={latestRelease.coverImage}
                alt={latestRelease.title}
                width={800}
                height={800}
                className="h-full w-full object-cover rounded-none"
                priority
              />
            </div>
            <p data-home-hero-title>{latestRelease.title}</p>
            <p data-home-hero-artist>
              {artist?.name ?? latestRelease.artistSlug}
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
