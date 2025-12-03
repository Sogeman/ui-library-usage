import { CardDescription } from "@/components/ui/card/components/card-description";
import { CardFooter } from "@/components/ui/card/components/card-footer";
import { CardHeader } from "@/components/ui/card/components/card-header";
import { CardTitle } from "@/components/ui/card/components/card-title";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface CardProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: ReactNode;
}

export function Card({
  className,
  children,
  title,
  description,
  footer,
  ...props
}: CardProps) {
  const hasHeader = title || description;

  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col justify-between",
        className
      )}
      {...props}
    >
      {hasHeader && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      {children && (
        <div className={cn("p-6", hasHeader && "pt-0")}>{children}</div>
      )}
      {footer && <CardFooter>{footer}</CardFooter>}
    </div>
  );
}

export { CardContent } from "@/components/ui/card/components/card-content";
export { CardDescription } from "@/components/ui/card/components/card-description";
export { CardFooter } from "@/components/ui/card/components/card-footer";
export { CardHeader } from "@/components/ui/card/components/card-header";
export { CardTitle } from "@/components/ui/card/components/card-title";
