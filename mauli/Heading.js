import clsx from 'clsx';

import Text from '@/mauli/Text';
import { responsiveClassNames } from '@/mauli/utils';

export default function Heading({
    children,
    as = 'h2',
    size = 'medium',
    className,
    ...props
}) {
    const Element = as;

    const styles = clsx(
        'font-bold',

        // Size
        responsiveClassNames(size, [
            {
                value: 'small',
                classNames: [
                    'text-2xl',
                    'sm:text-2xl',
                    'md:text-2xl',
                    'lg:text-2xl',
                    'xl:text-2xl'
                ]
            },
            {
                value: 'medium',
                classNames: [
                    'text-4xl',
                    'sm:text-4xl',
                    'md:text-4xl',
                    'lg:text-4xl',
                    'xl:text-4xl'
                ]
            },
            {
                value: 'large',
                classNames: [
                    'text-6xl',
                    'sm:text-6xl',
                    'md:text-6xl',
                    'lg:text-6xl',
                    'xl:text-6xl'
                ]
            }
        ]),

        className
    );
    return (
        <Text as={Element} className={styles} {...props}>
            {children}
        </Text>
    );
}
