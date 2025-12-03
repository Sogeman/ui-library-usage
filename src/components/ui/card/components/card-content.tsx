import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface CardContentProps {
  children?: ReactNode;
  className?: string;
}

export function CardContent({
  className,
  children,
  ...props
}: CardContentProps) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}
