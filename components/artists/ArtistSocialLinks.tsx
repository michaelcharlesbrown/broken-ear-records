"use client";

import { trackOutboundClick } from "@/lib/analytics";
import type { Artist } from "@/data/artists";

const SOCIAL_LINKS: Array<{
  key: keyof Artist["socials"];
  label: string;
}> = [
  { key: "instagram", label: "Instagram" },
  { key: "website", label: "Bandcamp" },
  { key: "spotify", label: "Spotify" },
  { key: "youtube", label: "YouTube" },
];

interface ArtistSocialLinksProps {
  artist: Artist;
}

export default function ArtistSocialLinks({ artist }: ArtistSocialLinksProps) {
  const links = SOCIAL_LINKS.flatMap(({ key, label }) => {
    const href = artist.socials[key];
    return href ? [{ href, label }] : [];
  });

  if (links.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="artist-social-links flex flex-wrap items-center">
        {links.map((link, index) => (
          <span key={link.label} className="inline-flex items-center">
            {index > 0 && (
              <span className="header-nav-separator px-2" aria-hidden="true">
                |
              </span>
            )}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-black focus-visible:text-black active:text-black visited:text-black"
              onClick={() =>
                trackOutboundClick({
                  artist: artist.name,
                  platform: link.label,
                  destination: link.href,
                })
              }
            >
              {link.label}
            </a>
          </span>
        ))}
      </div>
    </section>
  );
}
