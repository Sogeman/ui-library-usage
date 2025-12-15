import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface AlertTitleProps {
  children?: ReactNode;
  className?: string;
}

export function AlertTitle({ className, children, ...props }: AlertTitleProps) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h5>
  );
}
