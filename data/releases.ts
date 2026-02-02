export interface Release {
  title: string;
  slug: string;
  artistSlug: "red-moon-apostles" | "mad-denizen" | "booming-dunes";
  year: number;
  type: "Album" | "EP" | "Single";
  coverImage: string;
  blurb: string;
  buyLinks: Array<{ label: string; href: string }>;
  streamLinks: Array<{ label: string; href: string }>;
}

export const releases: Release[] = [
  {
    title: "Beneath the Burning Sands",
    slug: "red-moon-apostles-debut",
    artistSlug: "red-moon-apostles",
    year: 2023,
    type: "Album",
    coverImage: "/images/rma/beneath-the-burning-sands.jpg",
    blurb: "A groundbreaking debut that showcases the innovative sound of Red Moon Apostles.",
    buyLinks: [
      { label: "Bandcamp", href: "https://example.com/buy" },
      { label: "Vinyl", href: "https://example.com/vinyl" },
    ],
    streamLinks: [
      { label: "Spotify", href: "https://example.com/spotify" },
      { label: "Apple Music", href: "https://example.com/apple" },
    ],
  },
  {
    title: "Starved",
    slug: "mad-denizen-first-album",
    artistSlug: "mad-denizen",
    year: 2024,
    type: "Album",
    coverImage: "/images/md/starved.jpg",
    blurb: "Mad Denizen's first full-length album explores new sonic territories.",
    buyLinks: [
      { label: "Bandcamp", href: "https://example.com/buy" },
    ],
    streamLinks: [
      { label: "Spotify", href: "https://example.com/spotify" },
      { label: "YouTube Music", href: "https://example.com/youtube" },
    ],
  },
  {
    title: "Dark Patterns",
    slug: "booming-dunes-first-ep",
    artistSlug: "booming-dunes",
    year: 2023,
    type: "EP",
    coverImage: "/images/bd/dark-patterns.jpg",
    blurb: "Booming Dunes delivers a powerful EP that captures their raw energy.",
    buyLinks: [
      { label: "Bandcamp", href: "https://example.com/buy" },
      { label: "CD", href: "https://example.com/cd" },
    ],
    streamLinks: [
      { label: "Spotify", href: "https://example.com/spotify" },
      { label: "Apple Music", href: "https://example.com/apple" },
      { label: "SoundCloud", href: "https://example.com/soundcloud" },
    ],
  },
];
