import type { Icon } from "react-feather";

import { Skeleton } from "./Skeleton";

interface Props {
  Icon: Icon;
  title: string;
  value: string | undefined;
}

export function SmartHomeElement({ Icon, title, value }: Props) {
  return (
    <div className="flex rounded-3xl bg-dark bg-opacity-10 p-4 dark:bg-light dark:bg-opacity-10">
      {value ? (
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-light dark:bg-dark">
          <Icon size={36} />
        </div>
      ) : (
        <Skeleton circle height="64px" width="64px" />
      )}

      <div className="flex flex-col justify-center pl-4">
        <h3 className="pb-0.5 font-bold">
          {value ? title : <Skeleton width="150px" />}
        </h3>
        <p className="opacity-60">
          {value ? value : <Skeleton width="75px" />}
        </p>
      </div>
    </div>
  );
}
