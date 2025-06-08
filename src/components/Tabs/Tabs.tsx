"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cx } from "cva";
import type { ComponentProps } from "react";

export function Tabs({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      className={cx("mx-auto max-w-prose", className)}
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
      className={cx("mb-16 flex flex-row", className)}
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
      className={cx(
        "flex w-full cursor-pointer items-center justify-center border-2 border-highlight py-2 first:rounded-l-2xl first:rounded-r-none first:border-r-0 last:rounded-l-none last:rounded-r-2xl last:border-l-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-dark dark:border-highlight-dark dark:focus-visible:ring-light data-[state=active]:bg-highlight data-[state=active]:text-light data-[state=active]:dark:bg-highlight-dark data-[state=inactive]:text-highlight data-[state=inactive]:dark:text-highlight-dark",
        className,
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
      className={cx("focus-visible:outline-hidden", className)}
      {...props}
    />
  );
}
