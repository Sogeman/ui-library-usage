import { cn } from "@/lib/utils";
import * as React from "react";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  size?: "sm" | "default" | "lg";
}

const switchSizes = {
  sm: {
    container: "h-4 w-8",
    thumb: "h-3 w-3 data-[state=checked]:translate-x-4",
  },
  default: {
    container: "h-5 w-10",
    thumb: "h-4 w-4 data-[state=checked]:translate-x-5",
  },
  lg: {
    container: "h-6 w-12",
    thumb: "h-5 w-5 data-[state=checked]:translate-x-6",
  },
};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      id,
      size = "default",
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const switchId = id || `switch-${generatedId}`;
    const sizeClasses = switchSizes[size];

    // Handle uncontrolled mode
    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked || false
    );

    // Determine if controlled or uncontrolled
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <div className="flex items-center space-x-2">
        <label
          htmlFor={switchId}
          className={cn(
            "relative inline-flex cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            isChecked ? "bg-primary" : "bg-input",
            sizeClasses.container,
            className
          )}
        >
          <input
            type="checkbox"
            role="switch"
            aria-checked={isChecked ? "true" : "false"}
            id={switchId}
            ref={ref}
            checked={isControlled ? checked : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            onChange={handleChange}
            className="sr-only"
            {...props}
          />
          <span
            data-state={isChecked ? "checked" : "unchecked"}
            aria-hidden="true"
            className={cn(
              "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
              sizeClasses.thumb
            )}
          />
        </label>
        {label && (
          <label
            htmlFor={switchId}
            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {props.required && (
              <span className="text-destructive ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
