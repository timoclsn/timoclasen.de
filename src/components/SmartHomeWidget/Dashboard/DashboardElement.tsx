import type { LucideIcon } from "lucide-react";
import { Skeleton } from "../../../design-system/Skeleton/Skeleton";

type Props =
  | {
      isLoading?: false;
      title: string;
      Icon: LucideIcon;
      value: string;
    }
  | {
      isLoading: true;
      title: string;
    };

export const DashboardElement = (props: Props) => {
  return (
    <div className="flex rounded-3xl bg-dark/10  p-4 dark:bg-light/10">
      {props.isLoading ? (
        <Skeleton circle height="64px" width="64px" />
      ) : (
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-light dark:bg-dark">
          <props.Icon size={36} />
        </div>
      )}

      <div className="flex flex-col justify-center pl-4">
        <h3 className="pb-0.5 font-bold">
          {props.isLoading ? <Skeleton width="150px" /> : props.title}
        </h3>
        <p className="opacity-60">
          {props.isLoading ? <Skeleton width="75px" /> : props.value}
        </p>
      </div>
    </div>
  );
};
