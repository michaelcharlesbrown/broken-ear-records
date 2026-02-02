import LinkButton from "./LinkButton";

interface LinksHubProps {
  title: string;
  links: Array<{ href: string; label: string }>;
  backHref: string;
  backLabel: string;
  artist?: string;
}

export default function LinksHub({
  title,
  links,
  backHref,
  backLabel,
  artist,
}: LinksHubProps) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#2a2a2a] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">{title}</h1>
        <div className="space-y-3 mb-6">
          {links.map((link, index) => (
            <LinkButton
              key={index}
              href={link.href}
              label={link.label}
              external={true}
              artist={artist}
              className="w-full block text-center py-4 px-6 border border-gray-600 rounded text-white hover:bg-gray-700 hover:border-gray-500 transition-colors"
            />
          ))}
        </div>
        <div className="border-t border-gray-700 pt-4">
          <LinkButton
            href={backHref}
            label={backLabel}
            external={false}
            className="w-full block text-center py-4 px-6 border border-gray-600 rounded text-white hover:bg-gray-700 hover:border-gray-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
