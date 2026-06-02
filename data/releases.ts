import type { BioParagraph } from "@/data/artists";

export interface ReleaseReview {
  url: string;
  author: string;
  publication: string;
  publicationUrl: string;
  body: string;
  designation?: string;
}

export interface Release {
  title: string;
  titleImage?: string;
  slug: string;
  artistSlug: "red-moon-apostles" | "mad-denizen" | "booming-dunes";
  year: number;
  type: "Album" | "EP" | "Single";
  coverImage: string;
  blurb: string;
  blurbParagraphs: BioParagraph[];
  buyLinks: Array<{ label: string; href: string }>;
  streamLinks: Array<{ label: string; href: string }>;
  review?: ReleaseReview;
}

export const releases: Release[] = [
  {
    title: "Beneath the Burning Sands",
    titleImage: "/images/beneath.jpg",
    slug: "beneath-the-burning-sands",
    artistSlug: "red-moon-apostles",
    year: 2023,
    type: "Album",
    coverImage: "/images/rma/beneath-the-burning-sands.jpg",
    blurb:
      "Bow down to your algorithmic overlords and embark a harrowing journey across the dusty redsand wasteland of the future past, where time loops in ghostly incantations on magnetic tape and the whispers of a forgotten civilization drift across the barren landscape. As technology becomes indistinguishable from magic, stone faces float in the shadowy void, warm in the glow of dark reflection, hovering between human longing and mechanical inevitability. Rituals of slumber endlessly reflected across tiny screens blur the line between progress and entropy, fate and free will — a world unraveling under the weight of its own artifice.",
    blurbParagraphs: [
      {
        text: "Bow down to your algorithmic overlords and embark a harrowing journey across the dusty redsand wasteland of the future past, where time loops in ghostly incantations on magnetic tape and the whispers of a forgotten civilization drift across the barren landscape.",
      },
      {
        text: "As technology becomes indistinguishable from magic, stone faces float in the shadowy void, warm in the glow of dark reflection, hovering between human longing and mechanical inevitability. Rituals of slumber endlessly reflected across tiny screens blur the line between progress and entropy, fate and free will — a world unraveling under the weight of its own artifice.",
      },
    ],
    buyLinks: [
      {
        label: "Bandcamp",
        href: "https://redmoonapostles.bandcamp.com/album/beneath-the-burning-sands",
      },
    ],
    streamLinks: [
      {
        label: "Spotify",
        href: "https://open.spotify.com/artist/3IXgCsALnK7snY68rFwwe9",
      },
    ],
  },
  {
    title: "Starved",
    titleImage: "/images/starved.jpg",
    slug: "starved",
    artistSlug: "mad-denizen",
    year: 2024,
    type: "Album",
    coverImage: "/images/md/starved.jpg",
    blurb:
      "Men are so necessarily mad that not to be mad would appear mad, through another trick madness played. Discovering the debut LP from Mad Denizen, Starved, is kinda like putting on Springsteen's Nebraska for the first time.",
    blurbParagraphs: [
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
    buyLinks: [
      {
        label: "Bandcamp",
        href: "https://maddenizen.bandcamp.com/album/starved",
      },
    ],
    streamLinks: [
      {
        label: "Spotify",
        href: "https://open.spotify.com/artist/3WJymJTqfpwT0iybktxqQh",
      },
    ],
    review: {
      url: "https://performermag.com/new-music-and-video/reviews/indie-rock-reviews/mad-denizen-starved-vinyl-review/",
      author: "Benjamin Ricci",
      publication: "Performer Magazine",
      publicationUrl: "https://performermag.com",
      body: "Starved is a winner for both the listener and even the most discerning audiophile. The tunes are moody and a great Smiths alternative for when you're feeling mad at the world and just want a comforting record to turn to.",
      designation: "Vinyl of the Month",
    },
  },
  {
    title: "Dark Patterns",
    titleImage: "/images/dark-patterns.jpg",
    slug: "dark-patterns",
    artistSlug: "booming-dunes",
    year: 2023,
    type: "Album",
    coverImage: "/images/bd/dark-patterns.jpg",
    blurb:
      "Weird gadgets and analog synthesizers moaning and howling in reverse, echoing from handmade tape loops dangling from whirring reel-to-reel tape machines in a dark studio in the middle of the night. A cinematic, hallucinatory journey through a soft, warm, saturated dreamworld of sound and emotion.",
    blurbParagraphs: [
      {
        text: "Weird gadgets and analog synthesizers moaning and howling in reverse, echoing from handmade tape loops dangling from whirring reel-to-reel tape machines in a dark studio in the middle of the night.",
      },
      {
        text: "A cinematic, hallucinatory journey through a soft, warm, saturated dreamworld of sound and emotion.",
      },
    ],
    buyLinks: [
      {
        label: "Bandcamp",
        href: "https://boomingdunes.bandcamp.com/album/dark-patterns",
      },
    ],
    streamLinks: [
      {
        label: "Spotify",
        href: "https://open.spotify.com/artist/6Gur5AyvODlXA3mvKSHcOP",
      },
    ],
  },
];
