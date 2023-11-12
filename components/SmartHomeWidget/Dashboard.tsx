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
import { getSmartHomeData } from "../../data/smarthome";
import { Await } from "../Await";
import { WidgetLayout } from "../WidgetLayout";
import { SmartHomeElement } from "./SmartHomeElement";
import { unstable_noStore as noStore } from "next/cache";

interface Props {
  footnote: string;
}

export const Dashboard = async ({ footnote }: Props) => {
  noStore();
  const promise = getSmartHomeData();
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
                <SmartHomeElement
                  Icon={Thermometer}
                  title="Raumtemperatur"
                  value={data.temperature}
                />
                <SmartHomeElement
                  Icon={Droplet}
                  title="Luftfeuchtigkeit"
                  value={data.humidity}
                />
                <SmartHomeElement
                  Icon={Zap}
                  title="Energieverbrauch"
                  value={data.energy}
                />
              </div>
              <div className="-mt-6 space-y-6 sm:mt-0 sm:space-y-8">
                <SmartHomeElement
                  Icon={data.lights === "An" ? ToggleRight : ToggleLeft}
                  title="Lichter"
                  value={data.lights}
                />
                <SmartHomeElement
                  Icon={Thermometer}
                  title="Außentemperatur"
                  value={data.outsideTemperature}
                />
                <SmartHomeElement
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
