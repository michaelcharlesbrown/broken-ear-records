"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { cutVariant } from "@/lib/cutVariant";

const LOGO_SRC = "/images/title.jpg";
const LOGO_WIDTH = 2500;
const LOGO_HEIGHT = 284;

export default function Header() {
  const pathname = usePathname();
  // Hero overlay: home + artist detail (full-bleed hero). Set in useEffect to avoid hydration mismatch.
  const [isHeroOverlay, setIsHeroOverlay] = useState(false);
  useEffect(() => {
    setIsHeroOverlay(false);
  }, [pathname]);

  return (
    <header
      className={
        isHeroOverlay
          ? "sticky top-0 z-50 bg-transparent border-0 mix-blend-difference text-white"
          : "bg-transparent border-0 text-black"
      }
    >
      <Container
        className={`pt-0 pb-[10px] md:py-4 flex flex-col items-center gap-2 md:flex-row md:justify-between md:items-center md:gap-0 w-full max-w-none mx-0 !px-[5px] md:!px-6 ${
          isHeroOverlay ? "text-white" : "text-black"
        }`}
      >
        <Link
          href="/"
          className="relative flex w-[calc(100%+10px)] -mx-[5px] items-center md:mx-0 md:inline-flex md:w-auto md:self-auto"
        >
          <Image
            src={LOGO_SRC}
            alt="Broken Ear Records"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            className="site-logo"
            sizes="(min-width: 768px) 700px, 100vw"
          />
        </Link>
        <nav data-nav-headlines className="mt-0 w-auto md:w-auto">
          {/* Mobile nav */}
          <div className="md:hidden flex items-center gap-3">
            <span data-paper-nav data-cut={cutVariant("nav-artists")}>
              <Link href="/artists" className="header-nav-link">Artists</Link>
            </span>
            <span data-paper-nav data-cut={cutVariant("nav-releases")}>
              <Link href="/releases" className="header-nav-link">Releases</Link>
            </span>
          </div>
          {/* Desktop nav */}
          <ul className="hidden list-none md:flex md:items-center md:gap-3">
            <li data-paper-nav data-cut={cutVariant("nav-artists")}>
              <Link href="/artists" className="header-nav-link">Artists</Link>
            </li>
            <li data-paper-nav data-cut={cutVariant("nav-releases")}>
              <Link href="/releases" className="header-nav-link">Releases</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
