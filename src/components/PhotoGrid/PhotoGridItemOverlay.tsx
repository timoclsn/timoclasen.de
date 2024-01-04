"use client";

import { cva } from "cva";
import { ReactNode, useState } from "react";

const styles = cva({
  base: "transition absolute bottom-2 left-2 right-2 rounded-md border-[1px] border-dark/30 bg-light/30 text-[10px] leading-none backdrop-blur-md dark:bg-dark/30 2xl:text-sm",
  variants: {
    isVisible: {
      true: "opacity-100 translate-y-0",
      false: "opacity-0 translate-y-2",
    },
  },
});

interface Props {
  children: ReactNode;
}

export const PhotoGridItemOverlay = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleOverlay = () => setIsVisible((prev) => !prev);
  const showOverlay = () => setIsVisible(true);
  const hideOverlay = () => setIsVisible(false);

  return (
    <>
      <div className={styles({ isVisible })}>{children}</div>
      <button
        className="absolute left-0 top-0 h-full w-full"
        aria-label={isVisible ? "Hide overlay" : "Show Overlay"}
        onClick={toggleOverlay}
        onMouseEnter={showOverlay}
        onMouseLeave={hideOverlay}
      />
    </>
  );
};
