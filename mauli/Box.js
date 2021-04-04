import clsx from 'clsx';

import { getResponsiveClassNames } from '@/mauli/utils';

export default function Box({
    children,
    as = 'div',
    inset = 'medium',
    className,
    ...props
}) {
    const Element = as;

    const styles = clsx(
        getResponsiveClassNames(inset, [
            {
                value: 'xsmall',
                classNames: ['p-1', 'sm:p-1', 'md:p-1', 'lg:p-1', 'xl:p-1']
            },
            {
                value: 'small',
                classNames: ['p-2', 'sm:p-2', 'md:p-2', 'lg:p-2', 'xl:p-2']
            },
            {
                value: 'medium',
                classNames: ['p-4', 'sm:p-4', 'md:p-4', 'lg:p-4', 'xl:p-4']
            },
            {
                value: 'large',
                classNames: ['p-8', 'sm:p-8', 'md:p-8', 'lg:p-8', 'xl:p-8']
            },
            {
                value: 'xlarge',
                classNames: ['p-16', 'sm:p-16', 'md:p-16', 'lg:p-16', 'xl:p-16']
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
