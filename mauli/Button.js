import clsx from 'clsx';

export default function Button({
    children,
    as = 'button',
    variant = 'solid',
    size = 'medium',
    className,
    ...props
}) {
    const Element = as;

    const styles = clsx(
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'space-x-2',
        'disabled:opacity-50',
        'focus:outline-none',

        // Variant
        {
            [`
                text-light 
                bg-highlight dark:bg-highlight-dark 
                hover:bg-opacity-80 dark:hover:bg-opacity-80 
                focus:ring-2 focus:ring-inset focus:ring-dark dark:focus:ring-light
            `]: variant === 'solid',
            [`
                ring-2 ring-inset ring-dark dark:ring-light 
                hover:bg-dark dark:hover:bg-light hover:bg-opacity-20 dark:hover:bg-opacity-20 
                focus:ring-highlight dark:focus:ring-highlight-dark
            `]: variant === 'ghost'
        },

        // Size
        {
            'px-4 py-2 icon-sm text-sm': size === 'small',
            'px-8 py-4 icon-md font-bold text-base': size === 'medium'
        },

        className
    );
    return (
        <Element className={styles} {...props}>
            {Array.isArray(children)
                ? children.map((child, index) => (
                      <span key={index}>{child}</span>
                  ))
                : children}
        </Element>
    );
}
