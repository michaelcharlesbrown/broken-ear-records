import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

export default function Container({
  children,
  className = "",
  maxWidth = "max-w-[2000px]",
}: ContainerProps) {
  return (
    <div className={`${maxWidth} mx-auto px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
}
