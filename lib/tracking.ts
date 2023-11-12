import { PodcastsListFilter } from "../components/PodcastsList";

interface TrackingEvents {
  "Uncaught error": {
    message: string;
  };
  "Podcast Search": {
    search: string;
  };
  "Podcast Filter": PodcastsListFilter;
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
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    splitbee.track(event, data);
  }
  if (process.env.NODE_ENV === "development") {
    console.info("Tracking event:", {
      event,
      data,
    });
  }
};