"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ElementType, ReactNode } from "react";

interface Props {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export const AutoAnimate = ({
  as: Element = "div",
  children,
  className,
}: Props) => {
  const [ref] = useAutoAnimate<HTMLElement>();
  return (
    <Element ref={ref} className={className}>
      {children}
    </Element>
  );
};
