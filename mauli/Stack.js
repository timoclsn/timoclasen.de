import clsx from 'clsx';

import { BP, responsiveClassNames, valueAtBp } from '@/mauli/utils';

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
        responsiveClassNames(direction, [
            {
                value: 'vertical',
                classNames: [
                    clsx('flex-col space-x-0', {
                        'space-y-1': valueAtBp(BP.NONE, space) === 'xsmall',
                        'space-y-2': valueAtBp(BP.NONE, space) === 'small',
                        'space-y-4': valueAtBp(BP.NONE, space) === 'medium',
                        'space-y-8': valueAtBp(BP.NONE, space) === 'large',
                        'space-y-16': valueAtBp(BP.NONE, space) === 'xlarge'
                    }),
                    clsx('sm:flex-col sm:space-x-0', {
                        'sm:space-y-1': valueAtBp(BP.SM, space) === 'xsmall',
                        'sm:space-y-2': valueAtBp(BP.SM, space) === 'small',
                        'sm:space-y-4': valueAtBp(BP.SM, space) === 'medium',
                        'sm:space-y-8': valueAtBp(BP.SM, space) === 'large',
                        'sm:space-y-16': valueAtBp(BP.SM, space) === 'xlarge'
                    }),
                    clsx('md:flex-col md:space-x-0', {
                        'md:space-y-1': valueAtBp(BP.MD, space) === 'xsmall',
                        'md:space-y-2': valueAtBp(BP.MD, space) === 'small',
                        'md:space-y-4': valueAtBp(BP.MD, space) === 'medium',
                        'md:space-y-8': valueAtBp(BP.MD, space) === 'large',
                        'md:space-y-16': valueAtBp(BP.MD, space) === 'xlarge'
                    }),
                    clsx('lg:flex-col lg:space-x-0', {
                        'lg:space-y-1': valueAtBp(BP.LG, space) === 'xsmall',
                        'lg:space-y-2': valueAtBp(BP.LG, space) === 'small',
                        'lg:space-y-4': valueAtBp(BP.LG, space) === 'medium',
                        'lg:space-y-8': valueAtBp(BP.LG, space) === 'large',
                        'lg:space-y-16': valueAtBp(BP.LG, space) === 'xlarge'
                    }),
                    clsx('xl:flex-col xl:space-x-0', {
                        'xl:space-y-1': valueAtBp(BP.XL, space) === 'xsmall',
                        'xl:space-y-2': valueAtBp(BP.XL, space) === 'small',
                        'xl:space-y-4': valueAtBp(BP.XL, space) === 'medium',
                        'xl:space-y-8': valueAtBp(BP.XL, space) === 'large',
                        'xl:space-y-16': valueAtBp(BP.XL, space) === 'xlarge'
                    })
                ]
            },
            {
                value: 'horizontal',
                classNames: [
                    clsx('flex-row space-y-0', {
                        'space-x-1': valueAtBp(BP.NONE, space) === 'xsmall',
                        'space-x-2': valueAtBp(BP.NONE, space) === 'small',
                        'space-x-4': valueAtBp(BP.NONE, space) === 'medium',
                        'space-x-8': valueAtBp(BP.NONE, space) === 'large',
                        'space-x-16': valueAtBp(BP.NONE, space) === 'large'
                    }),
                    clsx('sm:flex-row sm:space-y-0', {
                        'sm:space-x-1': valueAtBp(BP.SM, space) === 'xsmall',
                        'sm:space-x-2': valueAtBp(BP.SM, space) === 'small',
                        'sm:space-x-4': valueAtBp(BP.SM, space) === 'medium',
                        'sm:space-x-8': valueAtBp(BP.SM, space) === 'large',
                        'sm:space-x-16': valueAtBp(BP.SM, space) === 'xlarge'
                    }),
                    clsx('md:flex-row md:space-y-0', {
                        'md:space-x-1': valueAtBp(BP.MD, space) === 'xsmall',
                        'md:space-x-2': valueAtBp(BP.MD, space) === 'small',
                        'md:space-x-4': valueAtBp(BP.MD, space) === 'medium',
                        'md:space-x-8': valueAtBp(BP.MD, space) === 'large',
                        'md:space-x-16': valueAtBp(BP.MD, space) === 'xlarge'
                    }),
                    clsx('lg:flex-row lg:space-y-0', {
                        'lg:space-x-1': valueAtBp(BP.LG, space) === 'xsmall',
                        'lg:space-x-2': valueAtBp(BP.LG, space) === 'small',
                        'lg:space-x-4': valueAtBp(BP.LG, space) === 'medium',
                        'lg:space-x-8': valueAtBp(BP.LG, space) === 'large',
                        'lg:space-x-16': valueAtBp(BP.LG, space) === 'xlarge'
                    }),
                    clsx('xl:flex-row xl:space-y-0', {
                        'xl:space-x-1': valueAtBp(BP.XL, space) === 'xsmall',
                        'xl:space-x-2': valueAtBp(BP.XL, space) === 'small',
                        'xl:space-x-4': valueAtBp(BP.XL, space) === 'medium',
                        'xl:space-x-8': valueAtBp(BP.XL, space) === 'large',
                        'xl:space-x-16': valueAtBp(BP.XL, space) === 'xlarge'
                    })
                ]
            }
        ]),

        // Align
        {
            'items-start': align === 'start',
            'items-center': align === 'center',
            'items-end': align === 'end',
            'items-baseline': align === 'baseline'
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
