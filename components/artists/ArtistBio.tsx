import type { BioParagraph } from "@/data/artists";

interface ArtistBioProps {
  paragraphs: BioParagraph[];
}

export default function ArtistBio({ paragraphs }: ArtistBioProps) {
  return (
    <section className="artist-bio mb-8 space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={paragraph.italic ? "italic" : undefined}>
          {paragraph.text}
        </p>
      ))}
    </section>
  );
}
