import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Children, forwardRef } from 'react';

import buttonStyles from './Button.module.css';

const baseStyles = [
  'inline-flex',
  'items-center',
  'justify-center',
  'icon-md',
  'space-x-2',
  'cursor-pointer',
  'group-disabled:opacity-50',
];

const variantStyles = {
  solid:
    'rounded-full text-light bg-highlight dark:bg-highlight-dark group-focus:ring-2 group-focus:ring-inset group-focus:ring-dark dark:group-focus:ring-light',
  ghost:
    'rounded-full ring-2 ring-inset ring-dark dark:ring-light group-hover:bg-dark dark:group-hover:bg-light group-hover:bg-opacity-20 dark:group-hover:bg-opacity-20 group-focus:ring-highlight dark:group-focus:ring-highlight-dark',
  link: 'group-hover:opacity-80 group-focus:underline !p-0',
};

const sizeStyles = {
  normal: 'px-8 py-4 font-bold',
  small: 'px-4 py-2',
};

interface CommmonProps {
  children: ReactNode;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  fullWidth?: boolean;
  className?: string;
}

type ElementProps =
  | {
      as?: 'button';
      type?: 'button' | 'submit' | 'reset';
      onClick?: () => void;
      disabled?: boolean;
      href?: never;
      target?: never;
      rel?: never;
    }
  | {
      as?: 'a';
      href?: string;
      target?: '_blank';
      rel?: 'noopener noreferrer' | 'noopener';
      type?: never;
      onClick?: never;
      disabled?: never;
    };

type Props = CommmonProps & ElementProps;

export const Button = forwardRef<HTMLButtonElement & HTMLAnchorElement, Props>(
  function Button(
    {
      children,
      as: Element = 'button',
      type = 'button',
      variant = 'solid',
      size = 'normal',
      fullWidth,
      className,
      ...props
    },
    ref
  ) {
    const wrapperStyles = clsx(
      'group',
      'focus:outline-none',
      fullWidth && 'w-full',
      variant === 'solid' && buttonStyles.solidAnimation,
      variant === 'link' && buttonStyles.linkAnimation
    );
    const contentStyles = clsx(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    );
    return (
      <Element
        type={Element === 'button' ? type : undefined}
        ref={ref}
        className={wrapperStyles}
        {...props}
      >
        <span className={contentStyles}>
          {Children.map(children, (child, index) => (
            <span key={index}>{child}</span>
          ))}
        </span>
      </Element>
    );
  }
);
