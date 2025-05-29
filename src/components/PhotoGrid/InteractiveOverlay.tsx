"use client";

import { cva, cx } from "cva";
import { ReactElement, cloneElement, useRef, useState } from "react";
import { useHover } from "react-aria";

const overlayStyles = cva({
  base: "transition ease-in-out",
  variants: {
    isVisible: {
      true: "opacity-100 translate-y-0 scale-100",
      false: "opacity-0 translate-y-2 scale-90",
    },
  },
});

interface Props {
  children: ReactElement<{ className?: string; ref?: any }>;
}

export const InteractiveOverlay = ({ children }: Props) => {
  const clickedRef = useRef(false);
  const overlayRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleOverlay = () => setIsVisible((prev) => !prev);
  const showOverlay = () => setIsVisible(true);
  const hideOverlay = () => setIsVisible(false);

  const { hoverProps, isHovered } = useHover({
    onHoverStart: showOverlay,
    onHoverEnd: hideOverlay,
  });

  const overlay = cloneElement(children, {
    ref: overlayRef,
    className: cx(children.props.className, overlayStyles({ isVisible })),
  });

  return (
    <>
      {overlay}
      <button
        ref={buttonRef}
        {...hoverProps}
        className="absolute left-0 top-0 h-full w-full cursor-default outline-offset-4 outline-highlight focus-visible:outline-2 dark:outline-highlight-dark"
        aria-label={isVisible ? "Hide overlay" : "Show Overlay"}
        onMouseDown={() => {
          // Workaround for iOS Safari issue
          // iOS doesn't focus the button on click
          // so we need to focus it manually in onClick
          // but this triggers the onBlur event as it blurs and than focuses again
          // so we need to set a flag to prevent the onBlur event
          // onMouseDown runs befor the onBlur event so we can set the flag here
          clickedRef.current = true;
        }}
        onBlur={() => {
          if (!clickedRef.current) {
            hideOverlay();
          }
        }}
        onClick={() => {
          // Scroll into view to display (not when hiding) the overlay
          // But only on touch devices
          if (!isVisible && !isHovered) {
            overlayRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }
          toggleOverlay();
          buttonRef.current?.focus(); // Workaround for iOS not focusing on click
          clickedRef.current = false;
        }}
      />
    </>
  );
};
