import { unstable_noStore as noStore } from "next/cache";
import { getControlCountCached } from "../../../data/smarthome";
import { Await } from "../../Await";
import { Skeleton } from "../../Skeleton";

export const BalconyCount = () => {
  noStore();
  const promise = getControlCountCached();
  return (
    <div className="flex justify-center">
      <p className="whitespace-nowrap text-sm opacity-60">
        <Await
          promise={promise}
          loading={<Skeleton width="250px" />}
          error={<div>error!</div>}
        >
          {(data) => {
            return (
              <>{`Zähler: Rot ${data.red} | Grün ${data.green} | Blau ${data.blue}`}</>
            );
          }}
        </Await>
      </p>
    </div>
  );
};
