import clsx from 'clsx';

import { getResponsiveClassNames, getValueAtBp } from '@/mauli/utils';

export default function Stack({
    children,
    as = 'div',
    direction = 'vertical',
    space = 'medium',
    align = 'start',
    justify = 'start',
    fullWidth,
    className,
    ...props
}) {
    const Element = as;

    const styles = clsx(
        'flex',

        // Direction & Space
        // This one is complicated because space (x or y) depends on direction
        // On each direction change we have to reset the opposite direction
        // Then we have to get the size at that breakpoint (or the last one set)
        getResponsiveClassNames(direction, [
            {
                value: 'vertical',
                classNames: [
                    clsx('flex-col space-x-0', {
                        'space-y-1': getValueAtBp(0, space) === 'xsmall',
                        'space-y-2': getValueAtBp(0, space) === 'small',
                        'space-y-4': getValueAtBp(0, space) === 'medium',
                        'space-y-8': getValueAtBp(0, space) === 'large',
                        'space-y-16': getValueAtBp(0, space) === 'xlarge'
                    }),
                    clsx('sm:flex-col sm:space-x-0', {
                        'sm:space-y-1': getValueAtBp(1, space) === 'xsmall',
                        'sm:space-y-2': getValueAtBp(1, space) === 'small',
                        'sm:space-y-4': getValueAtBp(1, space) === 'medium',
                        'sm:space-y-8': getValueAtBp(1, space) === 'large',
                        'sm:space-y-16': getValueAtBp(1, space) === 'xlarge'
                    }),
                    clsx('md:flex-col md:space-x-0', {
                        'md:space-y-1': getValueAtBp(2, space) === 'xsmall',
                        'md:space-y-2': getValueAtBp(2, space) === 'small',
                        'md:space-y-4': getValueAtBp(2, space) === 'medium',
                        'md:space-y-8': getValueAtBp(2, space) === 'large',
                        'md:space-y-16': getValueAtBp(2, space) === 'xlarge'
                    }),
                    clsx('lg:flex-col lg:space-x-0', {
                        'lg:space-y-1': getValueAtBp(3, space) === 'xsmall',
                        'lg:space-y-2': getValueAtBp(3, space) === 'small',
                        'lg:space-y-4': getValueAtBp(3, space) === 'medium',
                        'lg:space-y-8': getValueAtBp(3, space) === 'large',
                        'lg:space-y-16': getValueAtBp(3, space) === 'xlarge'
                    }),
                    clsx('xl:flex-col xl:space-x-0', {
                        'xl:space-y-1': getValueAtBp(4, space) === 'xsmall',
                        'xl:space-y-2': getValueAtBp(4, space) === 'small',
                        'xl:space-y-4': getValueAtBp(4, space) === 'medium',
                        'xl:space-y-8': getValueAtBp(4, space) === 'large',
                        'xl:space-y-16': getValueAtBp(4, space) === 'xlarge'
                    })
                ]
            },
            {
                value: 'horizontal',
                classNames: [
                    clsx('flex-row space-y-0', {
                        'space-x-1': getValueAtBp(0, space) === 'xsmall',
                        'space-x-2': getValueAtBp(0, space) === 'small',
                        'space-x-4': getValueAtBp(0, space) === 'medium',
                        'space-x-8': getValueAtBp(0, space) === 'large',
                        'space-x-16': getValueAtBp(0, space) === 'large'
                    }),
                    clsx('sm:flex-row sm:space-y-0', {
                        'sm:space-x-1': getValueAtBp(1, space) === 'xsmall',
                        'sm:space-x-2': getValueAtBp(1, space) === 'small',
                        'sm:space-x-4': getValueAtBp(1, space) === 'medium',
                        'sm:space-x-8': getValueAtBp(1, space) === 'large',
                        'sm:space-x-16': getValueAtBp(1, space) === 'xlarge'
                    }),
                    clsx('md:flex-row md:space-y-0', {
                        'md:space-x-1': getValueAtBp(2, space) === 'xsmall',
                        'md:space-x-2': getValueAtBp(2, space) === 'small',
                        'md:space-x-4': getValueAtBp(2, space) === 'medium',
                        'md:space-x-8': getValueAtBp(2, space) === 'large',
                        'md:space-x-16': getValueAtBp(2, space) === 'xlarge'
                    }),
                    clsx('lg:flex-row lg:space-y-0', {
                        'lg:space-x-1': getValueAtBp(3, space) === 'xsmall',
                        'lg:space-x-2': getValueAtBp(3, space) === 'small',
                        'lg:space-x-4': getValueAtBp(3, space) === 'medium',
                        'lg:space-x-8': getValueAtBp(3, space) === 'large',
                        'lg:space-x-16': getValueAtBp(3, space) === 'xlarge'
                    }),
                    clsx('xl:flex-row xl:space-y-0', {
                        'xl:space-x-1': getValueAtBp(4, space) === 'xsmall',
                        'xl:space-x-2': getValueAtBp(4, space) === 'small',
                        'xl:space-x-4': getValueAtBp(4, space) === 'medium',
                        'xl:space-x-8': getValueAtBp(4, space) === 'large',
                        'xl:space-x-16': getValueAtBp(4, space) === 'xlarge'
                    })
                ]
            }
        ]),

        // Align
        {
            'items-start': align === 'start',
            'items-center': align === 'center',
            'items-end': align === 'end'
        },

        // Justify
        {
            'justify-start': justify === 'start',
            'justify-center': justify === 'center',
            'justify-end': justify === 'end',
            'justify-between': justify === 'between'
        },
        { 'w-full': fullWidth },
        className
    );

    return (
        <Element className={styles} {...props}>
            {children}
        </Element>
    );
}
