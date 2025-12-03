import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
}
