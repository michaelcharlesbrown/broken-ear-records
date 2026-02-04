"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { typography } from "@/components/ui/Typography";

export default function Header() {
  const pathname = usePathname();
  // Set overlay only in useEffect so pathname is never used during initial render (avoids hydration mismatch)
  const [isHomepageOverlay, setIsHomepageOverlay] = useState(false);
  useEffect(() => {
    setIsHomepageOverlay(pathname === "/");
  }, [pathname]);

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
            ? "py-4 flex flex-col md:flex-row md:justify-between md:items-center text-white w-full max-w-none mx-0 px-3 md:max-w-[2000px] md:mx-auto md:px-6"
            : "py-4 flex flex-col md:flex-row md:justify-between md:items-center w-full max-w-none mx-0 px-3 md:max-w-[2000px] md:mx-auto md:px-6"
        }
      >
        <Link href="/" className="w-full md:w-auto">
          <h1 className={`${typography.siteTitle} whitespace-nowrap mobile-site-title`}>
            BROKEN EAR RECORDS
          </h1>
        </Link>
        <nav className="mt-2 md:mt-0 w-full md:w-auto">
          <ul className="flex gap-2">
            <li>
              <Link
                href="/artists"
                className="hover:underline whitespace-nowrap mobile-nav-link"
              >
                ARTISTS
              </Link>
            </li>
            <li>|</li>
            <li>
              <Link
                href="/releases"
                className="hover:underline whitespace-nowrap mobile-nav-link"
              >
                RELEASES
              </Link>
            </li>
            <li>|</li>
            <li>
              <Link
                href="/about"
                className="hover:underline whitespace-nowrap mobile-nav-link"
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
