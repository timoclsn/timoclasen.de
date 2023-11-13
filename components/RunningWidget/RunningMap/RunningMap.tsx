import { getRunningDataCached } from "../../../data/sports";
import { Await } from "../../Await";
import { RunningMapClient } from "./RunningMapClient";

export const RunningMap = () => {
  const promise = getRunningDataCached();
  return (
    <Await
      promise={promise}
      loading={<div>loading…</div>}
      error={<div>error!</div>}
    >
      {(data) => {
        return <RunningMapClient runningData={data} />;
      }}
    </Await>
  );
};
