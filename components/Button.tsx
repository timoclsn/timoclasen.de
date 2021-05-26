import type * as Polymorphic from '@radix-ui/react-polymorphic';
import clsx from 'clsx';
import { Children, forwardRef, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    type?: 'button' | 'submit';
    variant?: 'solid' | 'ghost' | 'link';
    fullWidth?: boolean;
    className?: string;
}

const Button = forwardRef(function Button(
    {
        children,
        as: Element = 'button',
        type = 'button',
        variant = 'solid',
        fullWidth,
        className,
        ...props
    },
    ref
) {
    const styles = clsx(
        'inline-flex',
        'items-center',
        'justify-center',
        'icon-md',
        'font-bold',
        'space-x-2',
        'cursor-pointer',
        'disabled:opacity-50',
        'focus:outline-none',

        // Variant
        variant === 'solid' &&
            'px-8 py-4 rounded-full text-light bg-highlight dark:bg-highlight-dark hover:bg-opacity-80 dark:hover:bg-opacity-80 focus:ring-2 focus:ring-inset focus:ring-dark dark:focus:ring-light',
        variant === 'ghost' &&
            'px-8 py-4 rounded-full ring-2 ring-inset ring-dark dark:ring-light hover:bg-dark dark:hover:bg-light hover:bg-opacity-20 dark:hover:bg-opacity-20 focus:ring-highlight dark:focus:ring-highlight-dark',
        variant === 'link' && 'hover:opacity-80',

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

export default Button;
