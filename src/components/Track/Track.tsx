"use client";

import { TrackingEvents, track } from "../../lib/tracking";
import { ElementType, MouseEvent, ReactNode } from "react";

type Props<TEventKey extends keyof TrackingEvents> = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  event: TEventKey;
} & (TrackingEvents[TEventKey] extends null
  ? {}
  : { data: TrackingEvents[TEventKey] });

export const Track = <TEventKey extends keyof TrackingEvents>({
  children,
  as: Element = "div",
  className,
  event,
  ...rest
}: Props<TEventKey>) => {
  const data =
    "data" in rest ? (rest.data as TrackingEvents[TEventKey]) : undefined;

  return (
    <Element
      className={className}
      onClick={(e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // @ts-expect-error Didn't find a way to type the component properly so it fits with the function
        track(event, data);
      }}
    >
      {children}
    </Element>
  );
};
