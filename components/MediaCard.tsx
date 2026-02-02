import Image from "next/image";
import Link from "next/link";

export interface MediaCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description?: string;
  variant?: "artist" | "release";
  metadata?: React.ReactNode;
}

export default function MediaCard({
  href,
  imageSrc,
  imageAlt,
  title,
  description,
  variant = "artist",
  metadata,
}: MediaCardProps) {
  // Consistent card styling across all variants
  const cardClasses = "block border-0 !p-0 hover:shadow-none";

  return (
    <Link href={href} className={`${cardClasses} group`}>
      <div className="aspect-square bg-gray-200 mb-4 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      {description && (
        <p className={`text-sm text-gray-600 ${metadata ? "mb-1" : ""}`}>
          {description}
        </p>
      )}
      {metadata && <div>{metadata}</div>}
    </Link>
  );
}
