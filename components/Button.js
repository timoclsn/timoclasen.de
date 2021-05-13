import clsx from 'clsx';
import { Children } from 'react';
import React from 'react';

export default React.forwardRef(function Button(
    {
        children,
        as = 'button',
        type = 'button',
        variant = 'solid',
        fullWidth,
        className,
        ...props
    },
    ref
) {
    const Element = props.href ? 'a' : as;

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
        {
            'px-8 py-4 rounded-full text-light bg-highlight dark:bg-highlight-dark hover:bg-opacity-80 dark:hover:bg-opacity-80 focus:ring-2 focus:ring-inset focus:ring-dark dark:focus:ring-light':
                variant === 'solid',
            'px-8 py-4 rounded-full ring-2 ring-inset ring-dark dark:ring-light hover:bg-dark dark:hover:bg-light hover:bg-opacity-20 dark:hover:bg-opacity-20 focus:ring-highlight dark:focus:ring-highlight-dark':
                variant === 'ghost',
            'hover:opacity-80': variant === 'link'
        },

        { 'w-full': fullWidth },

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
});
