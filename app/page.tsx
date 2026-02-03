import type { Metadata } from "next";
import { typography } from "@/components/ui/Typography";
import HeroVideo from "@/components/HeroVideo";

const PRIMARY_DOMAIN = "https://brokenearrecords.com";

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
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <HeroVideo />
    </section>
  );
}
