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

type TabsTrigger = Polymorphic.ForwardRefComponent<
    Polymorphic.IntrinsicElement<typeof TabsPrimitive.Trigger>,
    Polymorphic.OwnProps<typeof TabsPrimitive.Trigger>
>;

export const TabsTrigger = forwardRef(function TabsTrigger(
    { className, ...props },
    ref
) {
    return (
        <TabsPrimitive.Trigger
            className={clsx(
                'flex items-center justify-center w-full py-2 border-2 first:border-r-0 last:border-l-0 last:rounded-l-none cursor-pointer tab border-highlight dark:border-highlight-dark first:rounded-l-2xl first:rounded-r-none last:rounded-r-2xl focus:outline-none focus:ring-2 focus:ring-dark dark:focus:ring-light',
                className
            )}
            ref={ref}
            {...props}
        />
    );
}) as TabsTrigger;

type TabsContent = Polymorphic.ForwardRefComponent<
    Polymorphic.IntrinsicElement<typeof TabsPrimitive.Content>,
    Polymorphic.OwnProps<typeof TabsPrimitive.Content>
>;

export const TabsContent = forwardRef(function TabsContent(
    { className, ...props },
    ref
) {
    return (
        <TabsPrimitive.Content
            className={clsx('focus:outline-none', className)}
            ref={ref}
            {...props}
        />
    );
}) as TabsContent;
