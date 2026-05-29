"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { typography } from "@/components/ui/Typography";

const LOGO_SRC = "/images/broken-ear-records-logo.png";
const LOGO_WIDTH = 804;
const LOGO_HEIGHT = 104;

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
          className="relative flex w-[calc(100%+10px)] -mx-[5px] shrink-0 items-center md:mx-0 md:inline-flex md:w-auto md:self-auto"
        >
          <Image
            src={LOGO_SRC}
            alt="Broken Ear Records"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            className={`site-logo${isHeroOverlay ? "" : " brightness-0"}`}
            sizes="(min-width: 768px) 220px, 100vw"
          />
        </Link>
        <nav className="mt-0 w-auto md:w-auto">
          {/* Mobile nav — compact, centered */}
          <div className="md:hidden">
            <div
              className={`${typography.navLink} mobile-nav-link whitespace-nowrap text-center`}
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
          </ul>
        </nav>
      </Container>
    </header>
  );
}
