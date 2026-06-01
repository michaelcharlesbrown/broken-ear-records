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
      <Container className="pt-12 pb-24 md:pb-32" maxWidth="w-full max-w-[1400px]">
        {children}
      </Container>
    </div>
  );
}
