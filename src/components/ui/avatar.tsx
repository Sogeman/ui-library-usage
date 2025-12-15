import { cn } from "@/lib/utils";
import * as React from "react";

const avatarSizes = {
  sm: "h-8 w-8 text-xs",
  default: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
} as const;

export type AvatarSize = keyof typeof avatarSizes;

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
}

function Avatar({
  className,
  src,
  alt,
  fallback,
  size = "default",
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const showFallback = !src || imageError;
  const fallbackText = fallback || alt?.charAt(0).toUpperCase() || "?";
  const ariaLabel = alt || `Avatar with initials ${fallbackText}`;

  return (
    <div
      role="img"
      aria-label={showFallback ? ariaLabel : undefined}
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        avatarSizes[size],
        className
      )}
      {...props}
    >
      {!showFallback ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          onError={() => setImageError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-muted font-medium text-muted-foreground"
          aria-hidden="true"
        >
          {fallbackText}
        </div>
      )}
    </div>
  );
}

export { Avatar };
