import { cutVariant } from "@/lib/cutVariant";

interface ReleaseLinksProps {
  buyLinks: Array<{ label: string; href: string }>;
  streamLinks: Array<{ label: string; href: string }>;
  slug: string;
}

export default function ReleaseLinks({ buyLinks, streamLinks, slug }: ReleaseLinksProps) {
  const links = [
    ...streamLinks.map((l) => ({ ...l, cta: "Stream the Album" })),
    ...buyLinks.map((l) => ({ ...l, cta: "Buy the Album" })),
  ];

  if (links.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3">
      {links.map((link) => (
        <span
          key={link.label}
          data-paper-nav
          data-cut={cutVariant(slug + "-link-" + link.label)}
          className="text-center"
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="release-link"
          >
            {link.cta}
          </a>
        </span>
      ))}
    </div>
  );
}
