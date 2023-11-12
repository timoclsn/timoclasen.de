import { unstable_noStore as noStore } from "next/cache";
import {
  CloudSnow,
  Droplet,
  Sun,
  Thermometer,
  ToggleLeft,
  ToggleRight,
  Umbrella,
  Zap,
} from "react-feather";
import { getSmartHomeDataCached } from "../../../data/smarthome";
import { Await } from "../../Await";
import { WidgetLayout } from "../../WidgetLayout";
import { DashboardElement } from "./DashboardElement";

interface Props {
  footnote: string;
}

export const Dashboard = ({ footnote }: Props) => {
  noStore();
  const promise = getSmartHomeDataCached();
  return (
    <Await
      promise={promise}
      loading={<div>loading…</div>}
      error={<div>error!</div>}
    >
      {(data) => {
        return (
          <>
            <WidgetLayout separate transparent>
              <div className="space-y-6 sm:space-y-8">
                <DashboardElement
                  Icon={Thermometer}
                  title="Raumtemperatur"
                  value={data.temperature}
                />
                <DashboardElement
                  Icon={Droplet}
                  title="Luftfeuchtigkeit"
                  value={data.humidity}
                />
                <DashboardElement
                  Icon={Zap}
                  title="Energieverbrauch"
                  value={data.energy}
                />
              </div>
              <div className="-mt-6 space-y-6 sm:mt-0 sm:space-y-8">
                <DashboardElement
                  Icon={data.lights === "An" ? ToggleRight : ToggleLeft}
                  title="Lichter"
                  value={data.lights}
                />
                <DashboardElement
                  Icon={Thermometer}
                  title="Außentemperatur"
                  value={data.outsideTemperature}
                />
                <DashboardElement
                  Icon={
                    data.rain === "Es regnet"
                      ? Umbrella
                      : data.rain === "Es schneit"
                      ? CloudSnow
                      : Sun
                  }
                  title="Regensensor"
                  value={data.rain}
                />
              </div>
            </WidgetLayout>
            <div
              className="my-8 text-sm opacity-60"
              dangerouslySetInnerHTML={{ __html: footnote }}
            />
          </>
        );
      }}
    </Await>
  );
};
