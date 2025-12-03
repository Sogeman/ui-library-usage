import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface CardDescriptionProps {
  children?: ReactNode;
  className?: string;
}

export function CardDescription({
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
