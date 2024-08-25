import { query } from "../../../api/query";
import { Skeleton } from "../../../design-system/Skeleton/Skeleton";
import { Await } from "../../Await/Await";
import { BalconyCountError } from "./BalconyCountError";

export const BalconyCount = () => {
  const promise = query.smarthome.controlCount();
  return (
    <div className="flex justify-center">
      <p className="whitespace-nowrap text-sm opacity-60">
        <Await
          promise={promise}
          loading={<Loading />}
          error={BalconyCountError}
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

const Loading = () => {
  return <Skeleton width="250px" />;
};
