import clsx from 'clsx';

import Box from '@/mauli/Box';
import { responsiveClassNames } from '@/mauli/utils';

export default function Container({
    children,
    as = 'div',
    size = 'medium',
    className,
    ...props
}) {
    const Element = as;

    const styles = clsx(
        'mx-auto',

        // Size
        responsiveClassNames(size, [
            {
                value: 'small',
                classNames: [
                    'max-w-screen-sm',
                    'sm:max-w-screen-sm',
                    'md:max-w-screen-sm',
                    'lg:max-w-screen-sm',
                    'xl:max-w-screen-sm'
                ]
            },
            {
                value: 'medium',
                classNames: [
                    'max-w-screen-md',
                    'sm:max-w-screen-md',
                    'md:max-w-screen-md',
                    'lg:max-w-screen-md',
                    'xl:max-w-screen-md'
                ]
            },
            {
                value: 'large',
                classNames: [
                    'max-w-screen-xl',
                    'sm:max-w-screen-xl',
                    'md:max-w-screen-xl',
                    'lg:max-w-screen-xl',
                    'xl:max-w-screen-xl'
                ]
            }
        ]),
        className
    );

    return (
        <Box as={Element} className={styles} {...props}>
            {children}
        </Box>
    );
}
