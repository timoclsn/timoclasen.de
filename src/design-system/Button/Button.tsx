import { VariantProps, cva } from "cva";
import type { ReactNode, RefObject } from "react";
import { Children } from "react";
import buttonStyles from "./Button.module.css";

const buttonWrapper = cva({
  base: "group focus-visible:outline-none active:scale-[0.98] transition-transform duration-100",
  variants: {
    variant: {
      solid: buttonStyles.solidAnimation,
      link: buttonStyles.linkAnimation,
      ghost: null,
    },
    size: {
      normal: null,
      small: null,
    },
    fullWidth: {
      true: "w-full",
    },
  },
});

const buttonContent = cva({
  base: "inline-flex items-center justify-center icon-md gap-2 cursor-pointer group-disabled:opacity-50",
  variants: {
    variant: {
      solid:
        "rounded-full text-light bg-highlight dark:bg-highlight-dark group-focus-visible:ring-2 group-focus-visible:ring-inset group-focus-visible:ring-dark dark:group-focus-visible:ring-light",
      ghost:
        "rounded-full ring-2 ring-inset ring-dark dark:ring-light group-hover:bg-dark dark:group-hover:bg-light group-hover:bg-opacity-20 dark:group-hover:bg-opacity-20 group-focus-visible:ring-highlight dark:group-focus-visible:ring-highlight-dark",
      link: "group-hover:opacity-80 group-focus-visible:underline !p-0",
    },
    size: {
      normal: "px-8 py-4 font-bold",
      small: "px-4 py-2",
    },
    fullWidth: {
      true: "w-full",
    },
  },
});

type ButtonVariantProps = VariantProps<typeof buttonContent>;

interface CommmonProps {
  children: ReactNode;
  ref?: RefObject<HTMLButtonElement & HTMLAnchorElement>;
  title?: string;
  className?: string;
}

type ElementProps =
  | {
      as?: "button";
      type?: "button" | "submit" | "reset";
      onClick?: () => void;
      disabled?: boolean;
      href?: never;
      target?: never;
      rel?: never;
    }
  | {
      as?: "a";
      href?: string;
      target?: "_blank";
      rel?: "noopener noreferrer" | "noopener";
      type?: never;
      onClick?: never;
      disabled?: never;
    };

export type ButtonProps = CommmonProps & ElementProps & ButtonVariantProps;

export const Button = ({
  children,
  ref,
  as: Element = "button",
  type = "button",
  variant = "solid",
  size = "normal",
  fullWidth,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Element
      type={Element === "button" ? type : undefined}
      ref={ref}
      className={buttonWrapper({ variant, fullWidth })}
      {...props}
    >
      <span
        className={buttonContent({
          variant,
          size,
          fullWidth,
          class: className,
        })}
      >
        {Children.map(children, (child, index) => (
          <span key={index}>{child}</span>
        ))}
      </span>
    </Element>
  );
};
