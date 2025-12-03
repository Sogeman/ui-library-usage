import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface GridProps {
  children?: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
}

const gridVariants = {
  cols: {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    12: "grid-cols-12",
  },
  gap: {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  },
};

export function Grid({
  children,
  className,
  cols = 3,
  gap = "md",
  responsive = true,
  ...props
}: GridProps) {
  const responsiveClasses = responsive
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    : gridVariants.cols[cols];

  return (
    <div
      className={cn(
        "grid",
        responsiveClasses,
        gridVariants.gap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
