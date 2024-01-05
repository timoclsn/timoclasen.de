"use client";

import { cva } from "cva";
import { ReactNode, useRef, useState } from "react";
import { useHover } from "react-aria";

const styles = cva({
  base: "transition absolute bottom-2 left-2 right-2 rounded-md border-[1px] border-dark/30 bg-light/30 text-[10px] leading-none backdrop-blur-md dark:bg-dark/30 2xl:text-sm ease-in-out",
  variants: {
    isVisible: {
      true: "opacity-100 translate-y-0 scale-100",
      false: "opacity-0 translate-y-2 scale-90",
    },
  },
});

interface Props {
  children: ReactNode;
}

export const PhotoGridItemOverlay = ({ children }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleOverlay = () => setIsVisible((prev) => !prev);
  const showOverlay = () => setIsVisible(true);
  const hideOverlay = () => setIsVisible(false);

  const { hoverProps, isHovered } = useHover({
    onHoverStart: () => {
      showOverlay();
    },
    onHoverEnd: () => {
      hideOverlay();
    },
  });

  return (
    <>
      <div ref={overlayRef} className={styles({ isVisible })}>
        {children}
      </div>
      <button
        ref={buttonRef}
        {...hoverProps}
        className="absolute left-0 top-0 h-full w-full outline-offset-4 outline-highlight focus-visible:outline-2 dark:outline-highlight-dark"
        aria-label={isVisible ? "Hide overlay" : "Show Overlay"}
        onClick={() => {
          buttonRef.current?.focus();
          if (!isVisible && !isHovered) {
            overlayRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
          toggleOverlay();
        }}
        onBlur={() => {
          hideOverlay();
        }}
      />
    </>
  );
};
