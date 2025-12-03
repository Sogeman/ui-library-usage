import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface CardFooterProps {
  children?: ReactNode;
  className?: string;
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}
