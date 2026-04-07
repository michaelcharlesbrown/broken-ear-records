import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

export default function Container({
  children,
  className = "",
  maxWidth = "max-w-none w-full",
}: ContainerProps) {
  return (
    <div className={`${maxWidth} mx-auto px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
}
