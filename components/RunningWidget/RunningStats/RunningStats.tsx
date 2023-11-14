import {
  ArrowRight,
  Calendar,
  Clock,
  FastForward,
  Heart,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import { getRunningDataCached } from "../../../data/sports";
import { Await } from "../../Await";
import { RunningElement } from "../../RunningElement";
import { getYearProgress } from "../../../lib/utils";

export const RunningStats = () => {
  const promise = getRunningDataCached();
  return (
    <Await promise={promise} loading={<Loading />} error={<Error />}>
      {(runningData) => {
        const thisYear = runningData.thisYear;
        const lastRun = runningData.lastRun;
        const yearlyRunningGoal = 130; // 130 km
        const distanceThreshold = 10000; // 10km in m
        const speedThreshold = 3.03; // ca. 5:30 /km in m/s
        const timeThreshold = 3600; // 1h in s
        const heartrateThreshold = 160; // 160 bpm in bpm
        const yearsBestLabel = {
          text: "best",
          description: "Bester Wert des Jahres in dieser Kategorie",
        };

        const dateLabels = [
          ...(lastRun.stroller
            ? [
                {
                  text: "Stroller",
                  description: "Lauf mit Kinderwagen",
                },
              ]
            : []),
          ...(lastRun.race
            ? [
                {
                  text: "Race",
                  description: "Offizieller Wettkampf",
                },
              ]
            : []),
        ];

        const distanceLabels = [
          ...(lastRun.distance.raw >= distanceThreshold
            ? [{ text: "far", description: "Strecke von 10 km oder mehr" }]
            : []),
          ...(lastRun.distance.raw >= thisYear.farthest
            ? [yearsBestLabel]
            : []),
        ];

        const speedLabels = [
          ...(lastRun.avgSpeed.raw > speedThreshold
            ? [
                {
                  text: "fast",
                  description: "Geschwindigkeit schneller als 5:30 /km",
                },
              ]
            : []),
          ...(lastRun.avgSpeed.raw >= thisYear.fastest ? [yearsBestLabel] : []),
        ];

        const timeLabels = [
          ...(lastRun.time.raw >= timeThreshold
            ? [
                {
                  text: "long",
                  description: "Laufzeit von über einer Stunde",
                },
              ]
            : []),
          ...(lastRun.time.raw >= thisYear.longest ? [yearsBestLabel] : []),
        ];

        const heartrateLabels = [
          ...(lastRun.avgHeartrate.raw < heartrateThreshold
            ? [{ text: "low", description: "Puls von unter 160 bpm" }]
            : []),
          ...(lastRun.avgHeartrate.raw <= thisYear.lowest
            ? [yearsBestLabel]
            : []),
        ];

        const runningProgress = thisYear
          ? Math.round(thisYear.distance / (yearlyRunningGoal / 100))
          : 0;
        const yearProgress = getYearProgress();
        const yearTrend = runningProgress >= yearProgress ? "↑" : "↓";

        return (
          <div className="px-6 py-12 xl:px-12 xl:py-20">
            <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
              Laufen
            </h2>
            <ul>
              <li>
                <RunningElement
                  Icon={TrendingUp}
                  text={`${thisYear.distance} von ${yearlyRunningGoal} km pro Jahr`}
                  labels={[
                    {
                      text: `${runningProgress}% ${yearTrend}`,
                      description: `Erreichtes Jahresziel. ${yearProgress}% des Jahres sind vorbei.`,
                    },
                  ]}
                />
              </li>
            </ul>
            <div className="mb-2 mt-8 flex justify-between">
              <h3 className="font-bold">Letzter Lauf</h3>
              {lastRun.kudos > 0 && (
                <div
                  className="flex items-center space-x-1 opacity-60"
                  title={`${lastRun.kudos} Kudos für diesen Lauf auf Strava`}
                >
                  <ThumbsUp size={18} />
                  <span className="text-md">{lastRun.kudos}</span>
                </div>
              )}
            </div>
            <ul>
              <li>
                <RunningElement
                  Icon={Calendar}
                  text={lastRun.date.relative}
                  href={lastRun.url}
                  labels={dateLabels}
                />
              </li>
              <li>
                <RunningElement
                  Icon={ArrowRight}
                  text={lastRun.distance.formatted}
                  labels={distanceLabels}
                  nowrap
                />
              </li>
              <li>
                <RunningElement
                  Icon={FastForward}
                  text={lastRun.avgSpeed.formatted}
                  labels={speedLabels}
                  nowrap
                />
              </li>
              <li>
                <RunningElement
                  Icon={Clock}
                  text={lastRun.time.formatted}
                  labels={timeLabels}
                  nowrap
                />
              </li>
              <li>
                <RunningElement
                  Icon={Heart}
                  text={lastRun.avgHeartrate.formatted}
                  labels={heartrateLabels}
                  nowrap
                />
              </li>
            </ul>
          </div>
        );
      }}
    </Await>
  );
};

const Loading = () => {
  return (
    <div className="px-6 py-12 xl:px-12 xl:py-20">
      <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">Laufen</h2>
      <ul>
        <li>
          <RunningElement Icon={TrendingUp} />
        </li>
      </ul>
      <div className="mb-2 mt-8 flex justify-between">
        <h3 className="font-bold">Letzter Lauf</h3>
      </div>
      <ul>
        <li>
          <RunningElement Icon={Calendar} />
        </li>
        <li>
          <RunningElement Icon={ArrowRight} />
        </li>
        <li>
          <RunningElement Icon={FastForward} />
        </li>
        <li>
          <RunningElement Icon={Clock} />
        </li>
        <li>
          <RunningElement Icon={Heart} />
        </li>
      </ul>
    </div>
  );
};

const Error = () => {
  return (
    <div className="flex items-center justify-center p-10">
      Fehler beim Laden…
    </div>
  );
};
