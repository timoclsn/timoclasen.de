import { getSmartHomeData } from "../../../data/smarthome";
import { Await } from "../../Await/Await";
import { Skeleton } from "../../../design-system/Skeleton/Skeleton";

export const BalconyLight = () => {
  const promise = getSmartHomeData();
  return (
    <div className="h-[100px] w-[100px] flex-none rounded-full bg-[#FFFFFF] font-bold dark:bg-[#000000]">
      <Await promise={promise} loading={<Loading />} error={<Error />}>
        {({ balconyOnOff, balconyColor }) => {
          return (
            <div
              className="flex h-full w-full items-center justify-center rounded-full"
              style={{
                boxShadow:
                  balconyOnOff === "An"
                    ? `0 0 50px ${balconyColor}`
                    : undefined,
                backgroundColor:
                  balconyOnOff === "An" ? balconyColor : undefined,
              }}
            >
              {balconyOnOff === "Aus" && <span>Aus</span>}
            </div>
          );
        }}
      </Await>
    </div>
  );
};

const Loading = () => {
  return <Skeleton circle width="100px" height="100px" />;
};

const Error = () => {
  return (
    <div className="flex items-center justify-center rounded-full">
      <span>Fehler</span>
    </div>
  );
};
