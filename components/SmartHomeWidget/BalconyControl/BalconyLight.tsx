import { unstable_noStore as noStore } from "next/cache";
import { getSmartHomeDataCached } from "../../../data/smarthome";
import { Await } from "../../Await";

export const BalconyLight = () => {
  noStore();
  const promise = getSmartHomeDataCached();
  return (
    <Await
      promise={promise}
      loading={<div>loading…</div>}
      error={<div>error!</div>}
    >
      {({ balconyOnOff, balconyColor }) => {
        console.log({ balconyOnOff, balconyColor });
        return (
          <div
            className="flex flex-none items-center justify-center bg-[#FFFFFF] font-bold dark:bg-[#000000]"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "9999px",
              boxShadow:
                balconyOnOff === "An" ? `0 0 50px ${balconyColor}` : undefined,
              backgroundColor: balconyOnOff === "An" ? balconyColor : undefined,
            }}
          >
            {balconyOnOff === "Aus" && <span>Aus</span>}
          </div>
        );
      }}
    </Await>
  );
};
