export interface BioParagraph {
  text: string;
  italic?: boolean;
}

export interface Artist {
  name: string;
  slug: string;
  heroImage: string;
  shortBio: string;
  bioParagraphs: BioParagraph[];
  genre: string[];
  /** Custom OG image for this artist's pages. Falls back to hero if not set. */
  ogImage?: string;
  images: {
    /** Full-bleed hero at top of artist detail page */
    pageHero?: string;
    hero?: string;
    portrait?: string;
    /** Stamp/cutout headline image replacing the h1 text */
    title?: string;
  };
  socials: {
    subvert?: string;
    website?: string;
    spotify?: string;
    appleMusic?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  /** External database URLs for schema sameAs: MusicBrainz, Discogs, AllMusic, etc. */
  sameAs?: string[];
  releases: string[];
}

/** Full-bleed hero used by all artist routes (detail, links, metadata). */
export function getArtistHeroSrc(artist: Artist): string {
  return artist.images.pageHero ?? artist.images.hero ?? artist.heroImage;
}

export const artists: Artist[] = [
  {
    name: "Red Moon Apostles",
    slug: "red-moon-apostles",
    heroImage: "/images/rma/red-moon-apostles.jpg",
    shortBio:
      "Bow down to your algorithmic overlords and embark a harrowing journey across the dusty redsand wasteland of the future past.",
    genre: ["Experimental", "Electronic", "Ambient"],
    ogImage: "/og/og-red-moon-apostles.jpg",
    bioParagraphs: [
      {
        text: "Bow down to your algorithmic overlords and embark a harrowing journey across the dusty redsand wasteland of the future past, where time loops in ghostly incantations on magnetic tape and the whispers of a forgotten civilization drift across the barren landscape.",
      },
      {
        text: "As technology becomes indistinguishable from magic, stone faces float in the shadowy void, warm in the glow of dark reflection, hovering between human longing and mechanical inevitability. Rituals of slumber endlessly reflected across tiny screens blur the line between progress and entropy, fate and free will — a world unraveling under the weight of its own artifice.",
      },
    ],
    images: {
      pageHero: "/images/rma/hero-rma.jpg",
      hero: "/images/rma/red-moon-apostles.jpg",
      portrait: "/images/rma/card-rma.jpg",
      title: "/images/rma.jpg",
    },
    socials: {
      subvert: "https://www.subvert.fm/red-moon-apostles",
      website: "https://redmoonapostles.bandcamp.com",
      spotify: "https://open.spotify.com/artist/3IXgCsALnK7snY68rFwwe9",
      appleMusic: "https://music.apple.com/us/artist/red-moon-apostles/1792943559",
      instagram: "https://instagram.com/redmoonapostles",
      youtube: "https://www.youtube.com/@redmoonapostles",
    },
    sameAs: [],
    releases: ["beneath-the-burning-sands"],
  },
  {
    name: "Mad Denizen",
    slug: "mad-denizen",
    heroImage: "/images/md/mad-denizen.jpg",
    shortBio:
      "Men are so necessarily mad that not to be mad would appear mad, through another trick madness played.",
    genre: ["Folk", "Indie Folk", "Lo-Fi"],
    ogImage: "/og/og-mad-denizen.jpg",
    bioParagraphs: [
      {
        text: "Men are so necessarily mad that not to be mad would appear mad, through another trick madness played.",
        italic: true,
      },
      {
        text: "Discovering the debut LP from Mad Denizen, Starved, is kinda like putting on Springsteen's Nebraska for the first time. It's one of those records that encourages late-night listening, preferably with cigarettes smoldering in the ashtray, whiskey close at hand.",
      },
      {
        text: "Starved is primarily the work of Michael Charles, an after-hours LP that, intentional or not, is haunting as all get out (but in a good way). Armed mostly with an acoustic guitar and his voice, Charles tracked the record to tape using a TASCAM 388 reel-to-reel machine. The audio quality of the vinyl is striking in its immediacy and clarity, likely due to the tape medium, attention to detail in the recording process and top-notch mastering/cutting job. Starved is a winner for both the listener and even the most discerning audiophile.",
      },
      {
        text: 'The lead single "Invisible City" is like a modern update of Nirvana\'s "Polly" (complete with tasteful cello).',
      },
      {
        text: "The tunes are moody and a great Smiths alternative for when you're feeling mad at the world and just want a comforting record to turn to. Couple that with the high-quality audio experience and killer album art, and this album definitely deserves a spot on your ever-expanding LP shelf. — Benjamin Ricci, Performer Magazine",
      },
    ],
    images: {
      pageHero: "/images/md/hero-md.jpg",
      hero: "/images/md/mad-denizen.jpg",
      portrait: "/images/md/card-md.jpg",
      title: "/images/md.jpg",
    },
    socials: {
      website: "https://maddenizen.bandcamp.com",
      spotify: "https://open.spotify.com/artist/3WJymJTqfpwT0iybktxqQh",
      appleMusic: "https://music.apple.com/us/artist/mad-denizen/1713797479",
      instagram: "https://instagram.com/maddenizen",
      youtube: "https://www.youtube.com/@maddenizen",
    },
    sameAs: [
      "https://performermag.com/new-music-and-video/reviews/indie-rock-reviews/mad-denizen-starved-vinyl-review/",
    ],
    releases: ["starved"],
  },
  {
    name: "Booming Dunes",
    slug: "booming-dunes",
    heroImage: "/images/bd/booming-dunes.jpg",
    shortBio:
      "Weird gadgets and analog synthesizers moaning and howling in reverse, echoing from handmade tape loops dangling from whirring reel-to-reel tape machines in a dark studio in the middle of the night.",
    genre: ["Ambient", "Experimental", "Electronic"],
    ogImage: "/og/og-booming-dunes.jpg",
    bioParagraphs: [
      {
        text: "Weird gadgets and analog synthesizers moaning and howling in reverse, echoing from handmade tape loops dangling from whirring reel-to-reel tape machines in a dark studio in the middle of the night.",
      },
      {
        text: "A cinematic, hallucinatory journey through a soft, warm, saturated dreamworld of sound and emotion.",
      },
    ],
    images: {
      pageHero: "/images/bd/hero-bd.jpg",
      hero: "/images/bd/booming-dunes.jpg",
      portrait: "/images/bd/card-bd.jpg",
      title: "/images/bd.jpg",
    },
    socials: {
      website: "https://boomingdunes.bandcamp.com",
      spotify: "https://open.spotify.com/artist/6Gur5AyvODlXA3mvKSHcOP",
      appleMusic: "https://music.apple.com/us/artist/booming-dunes/1758819143",
      instagram: "https://instagram.com/boomingdunes",
      youtube: "https://www.youtube.com/@boomingdunes",
    },
    sameAs: [],
    releases: ["dark-patterns"],
  },
];
