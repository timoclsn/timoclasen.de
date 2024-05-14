"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ProgressLink } from "../ProgressLink/ProgressLink";

interface Props {
  children: ReactNode;
  href: string;
  onClick?: () => void;
  target?: "_blank";
  rel?: "noopener noreferrer" | "noopener" | "noreferrer";
}

export const NavigationLink = ({
  children,
  href,
  onClick,
  rel,
  target,
}: Props) => {
  const pathname = usePathname();
  return (
    <ProgressLink
      href={href}
      onClick={onClick}
      rel={rel}
      target={target}
      className={`hover:text-highlight dark:hover:text-highlight-dark ${
        href && pathname.includes(href)
          ? "text-highlight hover:opacity-80 dark:text-highlight-dark"
          : ""
      }`}
    >
      {children}
    </ProgressLink>
  );
};
