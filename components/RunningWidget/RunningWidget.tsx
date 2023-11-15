import { WidgetLayout } from "../Widget/WidgetLayout";
import { RunningMap } from "./RunningMap/RunningMap";
import { RunningStats } from "./RunningStats/RunningStats";

export const RunningWidget = () => {
  return (
    <section id="running">
      <WidgetLayout separate>
        <RunningStats />
        <RunningMap />
      </WidgetLayout>
    </section>
  );
};
