"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { typography } from "@/components/ui/Typography";
import { useBrutalistTypography } from "@/components/hooks/useBrutalistTypography";

export default function Header() {
  const pathname = usePathname();
  // Set overlay only in useEffect so pathname is never used during initial render (avoids hydration mismatch)
  const [isHomepageOverlay, setIsHomepageOverlay] = useState(false);
  useEffect(() => {
    setIsHomepageOverlay(pathname === "/");
  }, [pathname]);

  // Brutalist typography for mobile - site title
  const {
    elementRef: titleRef,
  } = useBrutalistTypography<HTMLHeadingElement>("BROKEN EAR RECORDS", {
    padding: 10, // 5px padding on each side
    baseFontSize: 16,
    minFontSize: 12,
    maxFontSize: 200,
    safetyMargin: 0.99, // 99% of available width - aggressive edge-to-edge
    debug: true, // Enable debugging
  });

  // Brutalist typography for mobile - navigation
  const {
    elementRef: navRef,
  } = useBrutalistTypography<HTMLDivElement>("ARTISTS | RELEASES | ABOUT", {
    padding: 10, // 5px padding on each side
    baseFontSize: 14,
    minFontSize: 10,
    maxFontSize: 200,
    safetyMargin: 0.99, // 99% of available width - aggressive edge-to-edge
    debug: true, // Enable debugging
  });

  return (
    <header
      className={
        isHomepageOverlay
          ? "fixed top-0 left-0 right-0 z-50 bg-transparent border-0 mix-blend-difference"
          : "border-b"
      }
    >
      <Container
        className={
          isHomepageOverlay
            ? "pt-0 pb-0 md:py-4 flex flex-col md:flex-row md:justify-between md:items-center text-white w-full max-w-none mx-0 !px-[5px] md:!px-6 md:max-w-[2000px] md:mx-auto"
            : "pt-0 pb-0 md:py-4 flex flex-col md:flex-row md:justify-between md:items-center w-full max-w-none mx-0 !px-[5px] md:!px-6 md:max-w-[2000px] md:mx-auto"
        }
      >
        <Link href="/" className="w-full md:w-auto">
          <h1
            ref={titleRef}
            className={`${typography.siteTitle} whitespace-nowrap mobile-site-title`}
          >
            BROKEN EAR RECORDS
          </h1>
        </Link>
        <nav className="mt-0 md:mt-0 w-full md:w-auto">
          {/* Mobile nav - single line that fills width */}
          <div className="md:hidden w-full">
            <div
              ref={navRef}
              className={`${typography.navLink} whitespace-nowrap mobile-nav-link`}
            >
              <Link href="/artists" className="hover:underline">
                ARTISTS
              </Link>
              {" | "}
              <Link href="/releases" className="hover:underline">
                RELEASES
              </Link>
              {" | "}
              <Link href="/about" className="hover:underline">
                ABOUT
              </Link>
            </div>
          </div>
          {/* Desktop nav - unchanged */}
          <ul className="hidden md:flex gap-2">
            <li>
              <Link
                href="/artists"
                className={`${typography.navLink} whitespace-nowrap`}
              >
                ARTISTS
              </Link>
            </li>
            <li>|</li>
            <li>
              <Link
                href="/releases"
                className={`${typography.navLink} whitespace-nowrap`}
              >
                RELEASES
              </Link>
            </li>
            <li>|</li>
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
