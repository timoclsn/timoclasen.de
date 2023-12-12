import {
  CloudSnow,
  Droplet,
  Sun,
  Thermometer,
  ToggleLeft,
  ToggleRight,
  Umbrella,
  Zap,
} from "lucide-react";
import { Suspense } from "react";
import { query } from "../../../api/query";
import { ErrorBoundary } from "../../ErrorBoundary/ErrorBoundary";
import { WidgetLayout } from "../../Widget/WidgetLayout";
import { DashboardElement } from "./DashboardElement";

export const Dashboard = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <DashboardInner />
      </Suspense>
    </ErrorBoundary>
  );
};

const DashboardInner = async () => {
  const data = await query.smarthome.data();

  return (
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
  );
};

const Loading = () => {
  return (
    <WidgetLayout separate transparent>
      <div className="space-y-6 sm:space-y-8">
        <DashboardElement isLoading title="Raumtemperatur" />
        <DashboardElement isLoading title="Luftfeuchtigkeit" />
        <DashboardElement isLoading title="Energieverbrauch" />
      </div>
      <div className="-mt-6 space-y-6 sm:mt-0 sm:space-y-8">
        <DashboardElement isLoading title="Lichter" />
        <DashboardElement isLoading title="Außentemperatur" />
        <DashboardElement isLoading title="Regensensor" />
      </div>
    </WidgetLayout>
  );
};

const errorMessage = "Nicht erreichbar…";

const Error = () => {
  return (
    <WidgetLayout separate transparent>
      <div className="space-y-6 sm:space-y-8">
        <DashboardElement
          Icon={Thermometer}
          title="Raumtemperatur"
          value={errorMessage}
        />
        <DashboardElement
          Icon={Droplet}
          title="Luftfeuchtigkeit"
          value={errorMessage}
        />
        <DashboardElement
          Icon={Zap}
          title="Energieverbrauch"
          value={errorMessage}
        />
      </div>
      <div className="-mt-6 space-y-6 sm:mt-0 sm:space-y-8">
        <DashboardElement
          Icon={ToggleLeft}
          title="Lichter"
          value={errorMessage}
        />
        <DashboardElement
          Icon={Thermometer}
          title="Außentemperatur"
          value={errorMessage}
        />
        <DashboardElement Icon={Sun} title="Regensensor" value={errorMessage} />
      </div>
    </WidgetLayout>
  );
};
