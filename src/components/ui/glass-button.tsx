import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";



const glassButtonVariants = cva(
  "relative isolate all-unset cursor-pointer rounded-full transition-all",
  {
    variants: {
      size: {
        default: "text-base font-medium",
        sm: "text-sm font-medium",
        lg: "text-lg font-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-tighter",
  {
    variants: {
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2",
        lg: "px-8 py-4",
        icon: "flex h-10 w-10 items-center justify-center",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof glassButtonVariants> & {
    contentClassName?: string;
    as?: React.ElementType;
  };

const GlassButton = React.forwardRef<HTMLElement, GlassButtonProps>(
  ({ className, children, size, contentClassName, as, href, ...props }, ref) => {
    const Component = (as || (href ? "a" : "button")) as React.ElementType;
    return (
      <>
        
        <div
          className={cn(
            "glass-button-wrap cursor-pointer rounded-full inline-block",
            className,
          )}
        >
          <Component
            className={cn("glass-button w-full h-full block no-underline", glassButtonVariants({ size }))}
            ref={ref as any}
            href={href}
            {...props}
          >
            <span
              className={cn(
                glassButtonTextVariants({ size }),
                contentClassName,
              )}
            >
              {children}
            </span>
          </Component>
          <div className="glass-button-shadow rounded-full"></div>
        </div>
      </>
    );
  },
);
GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };

export default GlassButton;
