import { Suspense } from "react";
import { query } from "../../../api/query";
import { Skeleton } from "../../../design-system/Skeleton/Skeleton";
import { ErrorBoundary } from "../../ErrorBoundary/ErrorBoundary";

export const BalconyLight = () => {
  return (
    <div className="h-[100px] w-[100px] flex-none rounded-full bg-[#FFFFFF] font-bold dark:bg-[#000000]">
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Loading />}>
          <BalconyLightInner />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const BalconyLightInner = async () => {
  const { balconyOnOff, balconyColor } = await query.smarthome.data();

  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-full"
      style={{
        boxShadow:
          balconyOnOff === "An" ? `0 0 50px ${balconyColor}` : undefined,
        backgroundColor: balconyOnOff === "An" ? balconyColor : undefined,
      }}
    >
      {balconyOnOff === "Aus" && <span>Aus</span>}
    </div>
  );
};

const Loading = () => {
  return <Skeleton circle width="100px" height="100px" display="block" />;
};

const Error = () => {
  return (
    <div className="flex items-center justify-center rounded-full">
      <span>Fehler</span>
    </div>
  );
};
