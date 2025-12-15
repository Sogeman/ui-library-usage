import { cn } from "@/lib/utils";
import * as React from "react";
import { createPortal } from "react-dom";

// Menu Context
interface MenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  anchorOrigin?: AnchorOrigin;
  transformOrigin?: TransformOrigin;
  closeMenuScrollThreshold: number;
}

const MenuContext = React.createContext<MenuContextValue | undefined>(
  undefined
);

function useMenu() {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error("Menu components must be used within a Menu");
  }
  return context;
}

// Types
interface AnchorOrigin {
  vertical: "top" | "center" | "bottom";
  horizontal: "left" | "center" | "right";
}

interface TransformOrigin {
  vertical: "top" | "center" | "bottom";
  horizontal: "left" | "center" | "right";
}

export interface MenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  anchorOrigin?: AnchorOrigin;
  transformOrigin?: TransformOrigin;
  closeMenuScrollThreshold?: number;
}

export interface MenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface MenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface MenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  destructive?: boolean;
}

export type MenuSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

// Menu Root Component
function Menu({
  children,
  open: controlledOpen,
  onOpenChange,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  transformOrigin = { vertical: "top", horizontal: "right" },
  closeMenuScrollThreshold = 50,
}: MenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [controlledOpen, onOpenChange]
  );

  const value = React.useMemo(
    () => ({
      open,
      setOpen,
      anchorEl,
      setAnchorEl,
      anchorOrigin,
      transformOrigin,
      closeMenuScrollThreshold,
    }),
    [
      open,
      setOpen,
      anchorEl,
      anchorOrigin,
      transformOrigin,
      closeMenuScrollThreshold,
    ]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

// Menu Trigger Component
const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ children, asChild, onClick, ...props }, ref) => {
    const { setOpen, setAnchorEl } = useMenu();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
      setOpen(true);
      onClick?.(e);
    };

    if (asChild) {
      // Clone the child element and add our props
      const child = React.Children.only(children) as React.ReactElement<
        React.ComponentPropsWithRef<"button">
      >;
      return React.cloneElement(child, {
        ...props,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          handleClick(e);
          child.props?.onClick?.(e);
        },
      });
    }

    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);

MenuTrigger.displayName = "MenuTrigger";

// Menu Content Component
const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, className, ...props }, ref) => {
    const {
      open,
      setOpen,
      anchorEl,
      anchorOrigin,
      transformOrigin,
      closeMenuScrollThreshold,
    } = useMenu();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState<{
      top: number;
      left: number;
    } | null>(null);
    const [scrollOffset, setScrollOffset] = React.useState({ x: 0, y: 0 });
    const [isPositioned, setIsPositioned] = React.useState(false);
    const [renderKey, setRenderKey] = React.useState(0);

    // Merge refs
    React.useImperativeHandle(ref, () => contentRef.current!);

    // Calculate position based on anchor
    React.useLayoutEffect(() => {
      if (open && anchorEl && contentRef.current) {
        const anchorRect = anchorEl.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();

        // Don't position if content hasn't been laid out yet
        if (contentRect.width === 0 || contentRect.height === 0) {
          // Force a re-render to try again
          if (renderKey < 3) {
            requestAnimationFrame(() => setRenderKey((k) => k + 1));
          }
          return;
        }

        let top = 0;
        let left = 0;

        // Calculate vertical position
        switch (anchorOrigin?.vertical) {
          case "top":
            top = anchorRect.top;
            break;
          case "center":
            top = anchorRect.top + anchorRect.height / 2;
            break;
          case "bottom":
          default:
            top = anchorRect.bottom;
            break;
        }

        // Calculate horizontal position
        switch (anchorOrigin?.horizontal) {
          case "left":
            left = anchorRect.left;
            break;
          case "center":
            left = anchorRect.left + anchorRect.width / 2;
            break;
          case "right":
          default:
            left = anchorRect.right;
            break;
        }

        // Adjust for transform origin
        switch (transformOrigin?.horizontal) {
          case "left":
            // no adjustment needed
            break;
          case "center":
            left -= contentRect.width / 2;
            break;
          case "right":
          default:
            left -= contentRect.width;
            break;
        }

        switch (transformOrigin?.vertical) {
          case "top":
            // no adjustment needed
            break;
          case "center":
            top -= contentRect.height / 2;
            break;
          case "bottom":
            top -= contentRect.height;
            break;
        }

        // Add spacing
        const spacing = 4;
        if (anchorOrigin?.vertical === "bottom") {
          top += spacing;
        } else if (anchorOrigin?.vertical === "top") {
          top -= spacing;
        }

        // Ensure menu stays within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 8;

        // Handle vertical overflow by flipping if needed
        const wouldOverflowBottom =
          top + contentRect.height > viewportHeight - padding;
        const wouldOverflowTop = top < padding;

        if (wouldOverflowBottom && anchorOrigin?.vertical === "bottom") {
          // Try flipping to top
          const topPosition = anchorRect.top - contentRect.height - spacing;
          if (topPosition >= padding) {
            top = topPosition;
          } else {
            // Can't flip, just constrain
            top = Math.max(
              padding,
              Math.min(top, viewportHeight - contentRect.height - padding)
            );
          }
        } else if (wouldOverflowTop && anchorOrigin?.vertical === "top") {
          // Try flipping to bottom
          const bottomPosition = anchorRect.bottom + spacing;
          if (bottomPosition + contentRect.height <= viewportHeight - padding) {
            top = bottomPosition;
          } else {
            // Can't flip, just constrain
            top = Math.max(
              padding,
              Math.min(top, viewportHeight - contentRect.height - padding)
            );
          }
        } else if (wouldOverflowBottom || wouldOverflowTop) {
          // Constrain to viewport
          top = Math.max(
            padding,
            Math.min(top, viewportHeight - contentRect.height - padding)
          );
        }

        // Handle horizontal overflow
        const wouldOverflowRight =
          left + contentRect.width > viewportWidth - padding;
        const wouldOverflowLeft = left < padding;

        if (wouldOverflowRight && anchorOrigin?.horizontal === "right") {
          // Try flipping to left
          const leftPosition = anchorRect.left - contentRect.width;
          if (leftPosition >= padding) {
            left = leftPosition;
          } else {
            // Can't flip, just constrain
            left = Math.max(
              padding,
              Math.min(left, viewportWidth - contentRect.width - padding)
            );
          }
        } else if (wouldOverflowLeft && anchorOrigin?.horizontal === "left") {
          // Try flipping to right
          const rightPosition = anchorRect.right;
          if (rightPosition + contentRect.width <= viewportWidth - padding) {
            left = rightPosition;
          } else {
            // Can't flip, just constrain
            left = Math.max(
              padding,
              Math.min(left, viewportWidth - contentRect.width - padding)
            );
          }
        } else if (wouldOverflowRight || wouldOverflowLeft) {
          // Constrain to viewport
          left = Math.max(
            padding,
            Math.min(left, viewportWidth - contentRect.width - padding)
          );
        }

        setPosition({ top, left });
        setIsPositioned(true);
      }
    }, [open, anchorEl, anchorOrigin, transformOrigin, renderKey]);

    // Reset positioned state when menu closes
    React.useEffect(() => {
      if (!open) {
        setIsPositioned(false);
        setPosition(null);
        setScrollOffset({ x: 0, y: 0 });
        setRenderKey(0);
      }
    }, [open]);

    // Handle click outside
    React.useEffect(() => {
      if (!open) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          anchorEl &&
          !anchorEl.contains(target)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [open, setOpen, anchorEl]);

    // Handle escape key
    React.useEffect(() => {
      if (!open) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, setOpen]);

    // Handle scroll - move menu with button until threshold, then close
    React.useEffect(() => {
      if (!open) return;

      const scrollThreshold = closeMenuScrollThreshold;
      const initialScrollY = window.scrollY;
      const initialScrollX = window.scrollX;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const currentScrollX = window.scrollX;
        const deltaY = currentScrollY - initialScrollY;
        const deltaX = currentScrollX - initialScrollX;
        const scrollDistance = Math.sqrt(
          Math.pow(deltaY, 2) + Math.pow(deltaX, 2)
        );

        if (scrollDistance > scrollThreshold) {
          setOpen(false);
        } else {
          // Move menu opposite to scroll direction to stay attached to button
          setScrollOffset({ x: -deltaX, y: -deltaY });
        }
      };

      // Listen for scroll on window and all scrollable ancestors
      window.addEventListener("scroll", handleScroll, true);
      return () => window.removeEventListener("scroll", handleScroll, true);
    }, [open, setOpen]);

    if (!open) return null;

    const menuContent = (
      <>
        {/* Backdrop for mobile */}
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
        {/* Menu Content */}
        <div
          ref={contentRef}
          role="menu"
          aria-orientation="vertical"
          className={cn(
            "fixed z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            isPositioned && "animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            !isPositioned && "opacity-0",
            className
          )}
          style={
            position
              ? {
                  top: `${position.top + scrollOffset.y}px`,
                  left: `${position.left + scrollOffset.x}px`,
                }
              : {
                  top: 0,
                  left: 0,
                }
          }
          {...props}
        >
          {children}
        </div>
      </>
    );

    return createPortal(menuContent, document.body);
  }
);

MenuContent.displayName = "MenuContent";

// Menu Item Component
const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ children, className, destructive, onClick, ...props }, ref) => {
    const { setOpen } = useMenu();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      setOpen(false);
    };

    return (
      <button
        ref={ref}
        role="menuitem"
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
          "focus:bg-accent focus:text-accent-foreground",
          "hover:bg-accent hover:text-accent-foreground",
          "disabled:pointer-events-none disabled:opacity-50",
          destructive && "text-destructive focus:text-destructive",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MenuItem.displayName = "MenuItem";

// Menu Separator Component
const MenuSeparator = React.forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn("-mx-1 my-1 h-px bg-border", className)}
        {...props}
      />
    );
  }
);

MenuSeparator.displayName = "MenuSeparator";

export { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger };
