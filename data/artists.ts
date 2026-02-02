export interface Artist {
  name: string;
  slug: string;
  heroImage: string;
  shortBio: string;
  fullBio: string;
  images: {
    hero?: string;
    portrait?: string;
  };
  socials: {
    website?: string;
    spotify?: string;
    appleMusic?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  releases: string[];
}

export const artists: Artist[] = [
  {
    name: "Red Moon Apostles",
    slug: "red-moon-apostles",
    heroImage: "/images/rma/red-moon-apostles.jpg",
    shortBio: "Red Moon Apostles is a dynamic musical ensemble known for their innovative sound.",
    fullBio: "Red Moon Apostles is a dynamic musical ensemble known for their innovative sound. With a unique blend of genres and a commitment to pushing creative boundaries, they have established themselves as a prominent force in the independent music scene. Their performances captivate audiences with powerful melodies and thought-provoking lyrics.",
    images: {
      hero: "/images/rma/red-moon-apostles.jpg",
      portrait: "/images/rma/red-moon-apostles.jpg",
    },
    socials: {
      website: "https://example.com/red-moon-apostles",
      spotify: "https://example.com/spotify/red-moon-apostles",
      instagram: "https://example.com/instagram/red-moon-apostles",
      youtube: "https://example.com/youtube/red-moon-apostles",
      tiktok: "https://example.com/tiktok/red-moon-apostles",
    },
    releases: ["red-moon-apostles-debut", "red-moon-apostles-ep"],
  },
  {
    name: "Mad Denizen",
    slug: "mad-denizen",
    heroImage: "/images/md/mad-denizen.jpg",
    shortBio: "Mad Denizen brings a unique blend of genres to create an unforgettable experience.",
    fullBio: "Mad Denizen brings a unique blend of genres to create an unforgettable experience. Their music defies categorization, seamlessly weaving together elements from various musical traditions. With each release, they continue to evolve and surprise listeners with their creative vision and technical prowess.",
    images: {
      hero: "/images/md/mad-denizen.jpg",
      portrait: "/images/md/mad-denizen.jpg",
    },
    socials: {
      website: "https://example.com/mad-denizen",
      spotify: "https://example.com/spotify/mad-denizen",
      instagram: "https://example.com/instagram/mad-denizen",
    },
    releases: ["mad-denizen-first-album"],
  },
  {
    name: "Booming Dunes",
    slug: "booming-dunes",
    heroImage: "/images/bd/booming-dunes.jpg",
    shortBio: "Booming Dunes delivers powerful performances that resonate with audiences worldwide.",
    fullBio: "Booming Dunes delivers powerful performances that resonate with audiences worldwide. Their music combines raw energy with sophisticated arrangements, creating a sound that is both accessible and deeply meaningful. They have built a dedicated following through their authentic approach and compelling live shows.",
    images: {
      hero: "/images/bd/booming-dunes.jpg",
      portrait: "/images/bd/booming-dunes.jpg",
    },
    socials: {
      website: "https://example.com/booming-dunes",
      spotify: "https://example.com/spotify/booming-dunes",
      instagram: "https://example.com/instagram/booming-dunes",
      youtube: "https://example.com/youtube/booming-dunes",
    },
    releases: ["booming-dunes-single", "booming-dunes-album"],
  },
];
