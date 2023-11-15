"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";

import { cx } from "class-variance-authority";
import styles from "./Tabs.module.css";

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
        "flex w-full cursor-pointer items-center justify-center border-2 border-highlight py-2 first:rounded-l-2xl first:rounded-r-none first:border-r-0 last:rounded-l-none last:rounded-r-2xl last:border-l-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark dark:border-highlight-dark dark:focus-visible:ring-light",
        styles.tab,
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
      className={cx("focus-visible:outline-none", className)}
      {...props}
    />
  );
}
