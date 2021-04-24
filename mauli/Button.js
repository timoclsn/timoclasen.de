import clsx from 'clsx';
import { Children } from 'react';

export default function Button({
    children,
    as = 'button',
    variant = 'solid',
    fullWidth,
    className,
    ...props
}) {
    const Element = props.href ? 'a' : as;

    const styles = clsx(
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'px-8',
        'py-4',
        'icon-md',
        'font-bold',
        'space-x-2',
        'disabled:opacity-50',
        'focus:outline-none',

        // Variant
        {
            'text-light bg-highlight dark:bg-highlight-dark hover:bg-opacity-80 dark:hover:bg-opacity-80 focus:ring-2 focus:ring-inset focus:ring-dark dark:focus:ring-light':
                variant === 'solid',
            'ring-2 ring-inset ring-dark dark:ring-light hover:bg-dark dark:hover:bg-light hover:bg-opacity-20 dark:hover:bg-opacity-20 focus:ring-highlight dark:focus:ring-highlight-dark':
                variant === 'ghost'
        },

        { 'w-full': fullWidth },

        className
    );
    return (
        <Element className={styles} {...props}>
            {Children.map(children, (child, index) => (
                <span key={index}>{child}</span>
            ))}
        </Element>
    );
}
