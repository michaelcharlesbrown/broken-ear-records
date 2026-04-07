"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { typography } from "@/components/ui/Typography";
import { useBrutalistTypography } from "@/components/hooks/useBrutalistTypography";

const LOGO_SRC = "/images/broken-ear-records-logo.png";
const LOGO_WIDTH = 804;
const LOGO_HEIGHT = 104;

export default function Header() {
  const pathname = usePathname();
  // Hero overlay: home + artist detail (full-bleed hero). Set in useEffect to avoid hydration mismatch.
  const [isHeroOverlay, setIsHeroOverlay] = useState(false);
  useEffect(() => {
    const isArtistDetail = /^\/artists\/[^/]+$/.test(pathname);
    const isArtistLinks = /^\/artists\/[^/]+\/links$/.test(pathname);
    setIsHeroOverlay(
      pathname === "/" ||
        pathname === "/about" ||
        isArtistDetail ||
        isArtistLinks
    );
  }, [pathname]);

  // Brutalist typography for mobile - navigation
  const {
    elementRef: navRef,
  } = useBrutalistTypography<HTMLDivElement>("ARTISTS | RELEASES | ABOUT", {
    padding: 10, // 5px padding on each side
    baseFontSize: 22,
    minFontSize: 10,
    maxFontSize: 140,
    safetyMargin: 0.99, // 99% of available width - aggressive edge-to-edge
    debug: true, // Enable debugging
  });

  return (
    <header
      className={
        isHeroOverlay
          ? "fixed top-0 left-0 right-0 z-50 bg-transparent border-0 mix-blend-difference text-white"
          : "bg-transparent border-0 text-black"
      }
    >
      <Container
        className={`pt-0 pb-[10px] md:py-4 flex flex-col md:flex-row md:justify-between md:items-center w-full max-w-none mx-0 !px-[5px] md:!px-6 ${
          isHeroOverlay ? "text-white" : "text-black"
        }`}
      >
        <Link
          href="/"
          className="relative inline-flex shrink-0 items-center self-start md:self-auto"
        >
          <Image
            src={LOGO_SRC}
            alt="Broken Ear Records"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            className={`h-[clamp(1.35rem,3.2vw,1.9rem)] w-auto md:h-[clamp(1.55rem,3.5vw,2.1rem)]${
              isHeroOverlay ? "" : " brightness-0"
            }`}
            sizes="(min-width: 768px) 220px, 180px"
          />
        </Link>
        <nav className="mt-0 md:mt-0 w-full md:w-auto">
          {/* Mobile nav - single line that fills width */}
          <div className="md:hidden w-full">
            <div
              ref={navRef}
              className={`${typography.navLink} whitespace-nowrap mobile-nav-link`}
            >
              <Link href="/artists">
                ARTISTS
              </Link>
              <span className="header-nav-separator" aria-hidden="true">
                {" "}
                |{" "}
              </span>
              <Link href="/releases">
                RELEASES
              </Link>
              <span className="header-nav-separator" aria-hidden="true">
                {" "}
                |{" "}
              </span>
              <Link href="/about">
                ABOUT
              </Link>
            </div>
          </div>
          {/* Desktop nav - unchanged */}
          <ul className="hidden list-none md:flex md:items-center md:gap-2">
            <li>
              <Link
                href="/artists"
                className={`${typography.navLink} whitespace-nowrap`}
              >
                ARTISTS
              </Link>
            </li>
            <li className="header-nav-separator" aria-hidden="true">
              |
            </li>
            <li>
              <Link
                href="/releases"
                className={`${typography.navLink} whitespace-nowrap`}
              >
                RELEASES
              </Link>
            </li>
            <li className="header-nav-separator" aria-hidden="true">
              |
            </li>
            <li>
              <Link
                href="/about"
                className={`${typography.navLink} whitespace-nowrap`}
              >
                ABOUT
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
