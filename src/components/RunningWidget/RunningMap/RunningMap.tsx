import { getRunningData } from "../../../data/sports";
import { Await } from "../../Await/Await";
import { Skeleton } from "../../../design-system/Skeleton/Skeleton";
import { RunningMapClient } from "./RunningMapClient";

export const RunningMap = () => {
  const promise = getRunningData();
  return (
    <Await promise={promise} loading={<Loading />} error={<Error />}>
      {(data) => {
        return <RunningMapClient runningData={data} />;
      }}
    </Await>
  );
};

const Loading = () => {
  return (
    <Skeleton
      width="100%"
      height="100%"
      borderRadius="1.5rem"
      lineHeight="normal"
      className="aspect-h-1 aspect-w-1"
    />
  );
};

const Error = () => {
  return (
    <div className="flex items-center justify-center p-10">
      Fehler beim Laden…
    </div>
  );
};