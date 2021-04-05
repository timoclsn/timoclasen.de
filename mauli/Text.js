import clsx from 'clsx';

import { responsiveClassNames } from '@/mauli/utils';

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
        responsiveClassNames(size, [
            {
                value: 'small',
                classNames: [
                    'text-sm',
                    'sm:text-sm',
                    'md:text-sm',
                    'lg:text-sm',
                    'xl:text-sm'
                ]
            },
            {
                value: 'medium',
                classNames: [
                    'text-base',
                    'sm:text-base',
                    'md:text-base',
                    'lg:text-base',
                    'xl:text-base'
                ]
            },
            {
                value: 'large',
                classNames: [
                    'text-lg',
                    'sm:text-lg',
                    'md:text-lg',
                    'lg:text-lg',
                    'xl:text-lg'
                ]
            }
        ]),

        className
    );

    return (
        <Element className={styles} {...props}>
            {children}
        </Element>
    );
}
