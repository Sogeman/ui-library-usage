import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface CardTitleProps {
  children?: ReactNode;
  className?: string;
}

export function CardTitle({ className, children, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
