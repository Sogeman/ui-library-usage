import { cn } from "@/lib/utils";
import * as React from "react";

const alertVariants = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
  success:
    "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
  warning:
    "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
  destructive:
    "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
} as const;

export type AlertVariant = keyof typeof alertVariants;

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

function Alert({ className, variant = "info", ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4 transition-colors",
        alertVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { AlertDescription } from "@/components/ui/alert/components/alert-description";
export { AlertTitle } from "@/components/ui/alert/components/alert-title";
export { Alert };
