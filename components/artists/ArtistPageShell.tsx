import Container from "@/components/ui/Container";

export interface ArtistPageShellProps {
  artistName: string;
  children: React.ReactNode;
}

export default function ArtistPageShell({
  children,
}: ArtistPageShellProps) {
  return (
    <div data-artist-page>
      <Container className="py-24 md:py-32" maxWidth="w-full max-w-[1400px]">
        {children}
      </Container>
    </div>
  );
}
