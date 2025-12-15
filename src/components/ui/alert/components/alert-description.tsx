import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface AlertDescriptionProps {
  children?: ReactNode;
  className?: string;
}

export function AlertDescription({
  className,
  children,
  ...props
}: AlertDescriptionProps) {
  return (
    <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props}>
      {children}
    </div>
  );
}
