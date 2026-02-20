import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  clickAnimationClass?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    {
      className,
      activeClassName,
      pendingClassName,
      clickAnimationClass,
      to,
      onClick,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLAnchorElement | null>(null);

    const setRefs = (node: HTMLAnchorElement) => {
      localRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as any).current = node;
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = localRef.current;

      if (el && clickAnimationClass) {
        el.classList.remove(clickAnimationClass);

        // 👇 Force reflow (VERY IMPORTANT)
        void el.offsetWidth;

        el.classList.add(clickAnimationClass);
      }

      onClick?.(e);
    };

    return (
      <RouterNavLink
        ref={setRefs}
        to={to}
        onClick={handleClick}
        className={({ isActive, isPending }) =>
          cn(
            className,
            clickAnimationClass,
            isActive && activeClassName,
            isPending && pendingClassName
          )
        }
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
