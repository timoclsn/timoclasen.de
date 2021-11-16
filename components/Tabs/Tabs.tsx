import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';
import type { ComponentProps } from 'react';

import styles from './Tabs.module.css';

export function Tabs({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={clsx('mx-auto max-w-prose', className)}
      {...props}
    />
  );
}

export function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={clsx('flex flex-row mb-16', className)}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={clsx(
        'flex items-center justify-center w-full py-2 border-2 first:border-r-0 last:border-l-0 last:rounded-l-none cursor-pointer border-highlight dark:border-highlight-dark first:rounded-l-2xl first:rounded-r-none last:rounded-r-2xl focus:outline-none focus:ring-2 focus:ring-dark dark:focus:ring-light',
        styles.tab,
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={clsx('focus:outline-none', className)}
      {...props}
    />
  );
}
