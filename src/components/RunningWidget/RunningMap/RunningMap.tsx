import { Suspense } from "react";
import { query } from "../../../api/query";
import { Skeleton } from "../../../design-system/Skeleton/Skeleton";
import { ErrorBoundary } from "../../ErrorBoundary/ErrorBoundary";
import { RunningMapClient } from "./RunningMapClient";

export const RunningMap = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <RunningMapInner />
      </Suspense>
    </ErrorBoundary>
  );
};

const RunningMapInner = async () => {
  const data = await query.sports.running();
  return <RunningMapClient runningData={data} />;
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
