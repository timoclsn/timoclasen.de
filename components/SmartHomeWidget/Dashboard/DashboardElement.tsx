import type { Icon } from "react-feather";

interface Props {
  Icon: Icon;
  title: string;
  value: string;
}

export const DashboardElement = ({ Icon, title, value }: Props) => {
  return (
    <div className="flex rounded-3xl bg-dark bg-opacity-10 p-4 dark:bg-light dark:bg-opacity-10">
      <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-light dark:bg-dark">
        <Icon size={36} />
      </div>

      <div className="flex flex-col justify-center pl-4">
        <h3 className="pb-0.5 font-bold">{title}</h3>
        <p className="opacity-60">{value}</p>
      </div>
    </div>
  );
};
