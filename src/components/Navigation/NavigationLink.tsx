"use client";

import { usePathname } from "next/navigation";
import type { JSX, ReactNode, RefObject } from "react";

type Props = {
  children: ReactNode;
  ref?: RefObject<HTMLAnchorElement>;
  target?: "_blank";
  rel?: "noopener noreferrer" | "noopener" | "noreferrer";
} & JSX.IntrinsicElements["a"];

export const NavigationLink = ({ children, ref, href, ...props }: Props) => {
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
};
