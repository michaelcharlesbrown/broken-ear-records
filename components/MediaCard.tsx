import Image from "next/image";
import Link from "next/link";
import { typography } from "@/components/ui/Typography";

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
    <Link href={href} className={cardClasses}>
      <div className="aspect-square bg-gray-200 mb-4 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={400}
          className="w-full h-full object-cover rounded-none"
        />
      </div>
      <h2 className={`${typography.h2} mb-2`}>{title}</h2>
      {description && (
        <p className={`text-sm text-gray-600 ${metadata ? "mb-1" : ""}`}>
          {description}
        </p>
      )}
      {metadata && <div>{metadata}</div>}
    </Link>
  );
}
