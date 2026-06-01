"use client";

import { trackOutboundClick } from "@/lib/analytics";
import { cutVariant } from "@/lib/cutVariant";
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
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <span
          key={link.label}
          data-paper-nav
          data-cut={cutVariant(artist.slug + "-social-" + link.label)}
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="artist-social-link"
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
  );
}
