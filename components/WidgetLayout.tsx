import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  children: [ReactNode, ReactNode];
  separate?: boolean;
  highlight?: boolean;
  transparent?: boolean;
}

export function WidgetLayout({
  children,
  separate,
  highlight,
  transparent,
}: Props) {
  const bgColor = highlight
    ? "bg-highlight dark:bg-highlight-dark"
    : `bg-dark dark:bg-light ${
        transparent
          ? "bg-opacity-0 dark:bg-opacity-0"
          : "bg-opacity-10 dark:bg-opacity-10"
      }`;

  const textColor = highlight
    ? "text-light dark:text-light"
    : "text-dark dark:text-light";

  const containerSyles = clsx(
    "flex",
    "flex-col",
    "sm:flex-row",
    "sm:space-x-12",
    "md:space-x-16",
    "lg:space-x-24",
    textColor,
    separate ? "space-y-12 sm:space-y-0" : `rounded-3xl ${bgColor}`,
  );

  const widgetStyles = clsx("flex-1", separate && `rounded-3xl ${bgColor}`);

  return (
    <section className={containerSyles}>
      <div className={widgetStyles}>{children[0]}</div>
      <div className={widgetStyles}>{children[1]}</div>
    </section>
  );
}
