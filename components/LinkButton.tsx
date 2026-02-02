"use client";

import Link from "next/link";
import { trackOutboundClick } from "@/lib/analytics";

interface LinkButtonProps {
  href: string;
  label: string;
  external?: boolean;
  artist?: string;
  className?: string;
}

export default function LinkButton({
  href,
  label,
  external = true,
  artist,
  className,
}: LinkButtonProps) {
  const defaultClassName =
    "w-full block text-center py-4 px-6 border rounded hover:bg-gray-50 transition-colors";
  const finalClassName = className || defaultClassName;

  const handleClick = () => {
    if (external && artist) {
      trackOutboundClick({
        artist,
        platform: label,
        destination: href,
      });
    }
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={finalClassName}
        onClick={handleClick}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={finalClassName}>
      {label}
    </Link>
  );
}
