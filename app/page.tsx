import type { Metadata } from "next";
import { typography } from "@/components/ui/Typography";
import HeroVideo from "@/components/HeroVideo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Broken Ear Records - Independent music label.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Broken Ear Records",
    description: "Welcome to Broken Ear Records - Independent music label.",
    url: siteUrl,
  },
  twitter: {
    title: "Broken Ear Records",
    description: "Welcome to Broken Ear Records - Independent music label.",
  },
};

export default function Home() {
  return (
    <div>
      <section className="relative w-full h-screen overflow-hidden">
        <HeroVideo />
      </section>
    </div>
  );
}
