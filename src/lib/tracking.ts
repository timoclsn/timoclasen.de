const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
const NODE_ENV = process.env.NODE_ENV;

export interface TrackingEvents {
  "Caught error": {
    componentStack: string;
    digest: string;
  };
  "Podcast Search": {
    search: string;
  };
  "Podcast Filter": {
    name: string;
    checked: boolean;
  };
  "Clear Podcast Filter": null;
  "Balcony Light Control": {
    color: string;
  };
  "Tabs Control": {
    tab: "Artists" | "Songs";
  };
  "Switch Theme": {
    theme: "dark" | "light";
  };
}

export const track = <TEventKey extends keyof TrackingEvents>(
  ...args: TrackingEvents[TEventKey] extends null
    ? [event: TEventKey]
    : [event: TEventKey, data: TrackingEvents[TEventKey]]
) => {
  const [event, data] = args;
  if (NEXT_PUBLIC_VERCEL_ENV === "production") {
    splitbee.track(event, data);
  }
  if (NODE_ENV === "development") {
    console.info("Tracking event:", {
      event,
      data,
    });
  }
};
