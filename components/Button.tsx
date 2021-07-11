import type * as Polymorphic from '@radix-ui/react-polymorphic';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Children, forwardRef } from 'react';

const baseStyles = [
    'inline-flex',
    'items-center',
    'justify-center',
    'icon-md',
    'space-x-2',
    'cursor-pointer',
    'disabled:opacity-50',
    'focus:outline-none'
];

const variantStyles = {
    solid: 'rounded-full text-light bg-highlight dark:bg-highlight-dark hover:bg-opacity-80 dark:hover:bg-opacity-80 focus:ring-2 focus:ring-inset focus:ring-dark dark:focus:ring-light',
    ghost: 'rounded-full ring-2 ring-inset ring-dark dark:ring-light hover:bg-dark dark:hover:bg-light hover:bg-opacity-20 dark:hover:bg-opacity-20 focus:ring-highlight dark:focus:ring-highlight-dark',
    link: 'hover:opacity-80'
};

const sizeStyles = {
    normal: 'px-8 py-4 font-bold',
    small: 'px-4 py-2'
};

interface Props {
    children: ReactNode;
    as?: 'button' | 'a';
    variant?: keyof typeof variantStyles;
    size?: keyof typeof sizeStyles;
    fullWidth?: boolean;
    className?: string;
}

export const Button = forwardRef(function Button(
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
    const styles = clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
    );
    return (
        <Element
            type={Element === 'button' ? type : undefined}
            className={styles}
            ref={ref}
            {...props}>
            {Children.map(children, (child, index) => (
                <span key={index}>{child}</span>
            ))}
        </Element>
    );
}) as Polymorphic.ForwardRefComponent<'button', Props>;
