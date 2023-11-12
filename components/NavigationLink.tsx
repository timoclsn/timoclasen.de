"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { forwardRef } from "react";

type Props = {
  children: ReactNode;
  target?: "_blank";
  rel?: "noopener noreferrer" | "noopener" | "noreferrer";
} & JSX.IntrinsicElements["a"];

export const NavigationLink = forwardRef<HTMLAnchorElement, Props>(
  function NavigationLink({ children, href, ...props }, ref) {
    const pathname = usePathname();
    return (
      <a
        href={href}
        ref={ref}
        className={`hover:text-highlight dark:hover:text-highlight-dark ${
          href && pathname.includes(href)
            ? "text-highlight hover:opacity-80 dark:text-highlight-dark"
            : ""
        }`}
        {...props}
      >
        {children}
      </a>
    );
  }
);
