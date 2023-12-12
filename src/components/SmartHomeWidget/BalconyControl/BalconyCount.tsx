import { Suspense } from "react";
import { query } from "../../../api/query";
import { Skeleton } from "../../../design-system/Skeleton/Skeleton";
import { ErrorBoundary } from "../../ErrorBoundary/ErrorBoundary";

export const BalconyCount = () => {
  return (
    <div className="flex justify-center">
      <p className="whitespace-nowrap text-sm opacity-60">
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <BalconyCountInner />
          </Suspense>
        </ErrorBoundary>
      </p>
    </div>
  );
};

const BalconyCountInner = async () => {
  const data = await query.smarthome.controlCount();
  return (
    <>{`Zähler: Rot ${data.red} | Grün ${data.green} | Blau ${data.blue}`}</>
  );
};

const Loading = () => {
  return <Skeleton width="250px" />;
};

const Error = () => {
  return <span>Nicht erreichbar…</span>;
};
