import Image from "next/image";
import Container from "@/components/ui/Container";

export interface ArtistPageShellProps {
  heroSrc: string;
  artistName: string;
  children: React.ReactNode;
}

/**
 * Standard layout for artist routes: full-viewport hero + padded content area.
 * Use for `/artists/[slug]`, `/artists/[slug]/links`, and any future artist pages.
 */
export default function ArtistPageShell({
  heroSrc,
  artistName,
  children,
}: ArtistPageShellProps) {
  return (
    <>
      <section
        className="relative h-screen w-full overflow-hidden"
        aria-label={`${artistName} hero`}
      >
        <Image
          src={heroSrc}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </section>
      <Container className="py-8">{children}</Container>
    </>
  );
}
