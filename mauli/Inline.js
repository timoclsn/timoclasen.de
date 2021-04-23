import clsx from 'clsx';
import { Children } from 'react';

import { responsiveClassNames } from '@/mauli/utils';

export default function Inline({
    children,
    as = 'div',
    space = 'medium',
    align = 'start',
    justify = 'start',
    className,
    ...props
}) {
    const Element = as;

    const parentStyles = clsx(
        'flex',
        'flex-row',
        'flex-wrap',

        // Space
        responsiveClassNames(space, [
            {
                value: 'small',
                classNames: [
                    '-mt-2 -ml-2',
                    'sm:-mt-2 sm:-ml-2',
                    'md:-mt-2 md:-ml-2',
                    'lg:-mt-2 lg:-ml-2',
                    'xl:-mt-2 xl:-ml-2'
                ]
            },
            {
                value: 'medium',
                classNames: [
                    '-mt-4 -ml-4',
                    'sm:-mt-4 sm:-ml-4',
                    'md:-mt-4 md:-ml-4',
                    'lg:-mt-4 lg:-ml-4',
                    'xl:-mt-4 xl:-ml-4'
                ]
            },
            {
                value: 'large',
                classNames: [
                    '-mt-8 -ml-8',
                    'sm:-mt-8 sm:-ml-8',
                    'md:-mt-8 md:-ml-8',
                    'lg:-mt-8 lg:-ml-8',
                    'xl:-mt-8 xl:-ml-8'
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

        className
    );

    const childStyles = clsx(
        // Space
        responsiveClassNames(space, [
            {
                value: 'small',
                classNames: [
                    'mt-2 ml-2',
                    'sm:mt-2 sm:ml-2',
                    'md:mt-2 md:ml-2',
                    'lg:mt-2 lg:ml-2',
                    'xl:mt-2 xl:ml-2'
                ]
            },
            {
                value: 'medium',
                classNames: [
                    'mt-4 ml-4',
                    'sm:mt-4 sm:ml-4',
                    'md:mt-4 md:ml-4',
                    'lg:mt-4 lg:ml-4',
                    'xl:mt-4 xl:ml-4'
                ]
            },
            {
                value: 'large',
                classNames: [
                    'mt-8 ml-8',
                    'sm:mt-8 sm:ml-8',
                    'md:mt-8 md:ml-8',
                    'lg:mt-8 lg:ml-8',
                    'xl:mt-8 xl:ml-8'
                ]
            }
        ])
    );

    return (
        <Element className={parentStyles} {...props}>
            {Children.map(children, (child, index) => {
                const { className, ...props } = child.props;
                return (
                    <child.type
                        className={clsx(className, childStyles)}
                        key={index}
                        {...props}
                    />
                );
            })}
        </Element>
    );
}
