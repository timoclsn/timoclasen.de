import clsx from 'clsx';

import Text from '@/mauli/Text';

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
        {
            'text-2xl': size === 'small',
            'text-4xl': size === 'medium',
            'text-6xl': size === 'large'
        },

        className
    );
    return (
        <Text as={Element} className={styles} {...props}>
            {children}
        </Text>
    );
}
