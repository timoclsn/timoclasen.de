import clsx from 'clsx';

export default function Text({
    children,
    as = 'span',
    size = 'medium',
    className,
    ...props
}) {
    const Element = as;

    const styles = clsx(
        'font-sans',
        'capsize',
        'text-dark dark:text-light',

        // Size
        {
            'text-sm': size === 'small',
            'text-base': size === 'medium',
            'text-lg': size === 'large'
        },

        className
    );

    return (
        <Element className={styles} {...props}>
            {children}
        </Element>
    );
}
