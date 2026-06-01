import Image from "next/image";
import Link from "next/link";
import { typography } from "@/components/ui/Typography";
import { cutVariant } from "@/lib/cutVariant";

export interface MediaCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description?: string;
  variant?: "artist" | "release";
  metadata?: React.ReactNode;
  cutSeed?: string | number;
}

export default function MediaCard({
  href,
  imageSrc,
  imageAlt,
  title,
  description,
  variant = "artist",
  metadata,
  cutSeed = href,
}: MediaCardProps) {
  const cardClasses =
    "block border-0 hover:shadow-none text-black hover:text-black visited:text-black active:text-black";

  return (
    <Link href={href} className={cardClasses} data-paper-block data-cut={cutVariant(cutSeed)}>
      <div className="aspect-square bg-gray-200 mb-5 md:mb-6 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={400}
          className="w-full h-full object-cover rounded-none"
        />
      </div>
      <h2 className={`${typography.h2} mb-3`}>{title}</h2>
      {description && (
        <p className={`text-inherit text-black ${metadata ? "mb-2" : ""}`}>
          {description}
        </p>
      )}
      {metadata && <div className="mt-1">{metadata}</div>}
    </Link>
  );
}
