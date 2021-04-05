import clsx from 'clsx';

import Box from '@/mauli/Box';

export default function Card({ children, as = 'div', className, ...props }) {
    const Element = as;

    const styles = clsx(
        'rounded-3xl',
        'bg-highlight dark:bg-highlight-dark',
        className
    );

    return (
        <Box as={Element} inset="medium" className={styles} {...props}>
            {children}
        </Box>
    );
}
