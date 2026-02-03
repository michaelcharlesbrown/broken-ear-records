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
  },
  twitter: {
    title: "Broken Ear Records",
    description: "Independent record label based in Los Angeles.",
  },
};

export default function Home() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <HeroVideo />
    </section>
  );
}
