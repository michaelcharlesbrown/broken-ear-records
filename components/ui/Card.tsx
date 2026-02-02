import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export default function Card({ children, href, className = "" }: CardProps) {
  const cardClasses = "border rounded p-4 hover:shadow-md transition-shadow";
  const finalClassName = `${cardClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={finalClassName}>
        {children}
      </Link>
    );
  }

  return <div className={finalClassName}>{children}</div>;
}
