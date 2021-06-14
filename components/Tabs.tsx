import type * as Polymorphic from '@radix-ui/react-polymorphic';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { forwardRef } from 'react';

type Tabs = Polymorphic.ForwardRefComponent<
    Polymorphic.IntrinsicElement<typeof TabsPrimitive.Root>,
    Polymorphic.OwnProps<typeof TabsPrimitive.Root>
>;

export const Tabs = forwardRef(function Tabs({ className, ...props }, ref) {
    return (
        <TabsPrimitive.Root
            className={clsx('mx-auto max-w-prose', className)}
            ref={ref}
            {...props}
        />
    );
}) as Tabs;

type TabsList = Polymorphic.ForwardRefComponent<
    Polymorphic.IntrinsicElement<typeof TabsPrimitive.List>,
    Polymorphic.OwnProps<typeof TabsPrimitive.List>
>;

export const TabsList = forwardRef(function TabsList(
    { className, ...props },
    ref
) {
    return (
        <TabsPrimitive.List
            className={clsx('flex flex-row mb-16', className)}
            ref={ref}
            {...props}
        />
    );
}) as TabsList;

type TabsTab = Polymorphic.ForwardRefComponent<
    Polymorphic.IntrinsicElement<typeof TabsPrimitive.Tab>,
    Polymorphic.OwnProps<typeof TabsPrimitive.Tab>
>;

export const TabsTab = forwardRef(function TabsTab(
    { className, ...props },
    ref
) {
    return (
        <TabsPrimitive.Tab
            className={clsx(
                'flex items-center justify-center w-full py-2 border-2 first:border-r-0 last:border-l-0 last:rounded-l-none cursor-pointer tab border-highlight dark:border-highlight-dark first:rounded-l-2xl first:rounded-r-none last:rounded-r-2xl',
                className
            )}
            ref={ref}
            {...props}
        />
    );
}) as TabsTab;

export const TabsPanel = TabsPrimitive.Panel;
