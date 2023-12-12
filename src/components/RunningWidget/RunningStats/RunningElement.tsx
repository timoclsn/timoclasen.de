import type { LucideIcon } from "lucide-react";
import { Skeleton } from "../../../design-system/Skeleton/Skeleton";
interface Label {
  text: string;
  description: string;
}

interface Props {
  Icon: LucideIcon;
  text?: string;
  href?: string;
  labels?: Label[];
  nowrap?: boolean;
}

export const RunningElement = ({ Icon, text, href, labels, nowrap }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <div className="leading-none">
        {text ? (
          <Icon size={22} />
        ) : (
          <Skeleton circle height="20px" width="20px" />
        )}
      </div>
      <p className={`my-2${nowrap ? " whitespace-nowrap" : ""}`}>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        ) : (
          text || <Skeleton width="200px" />
        )}
      </p>
      {labels && (
        <div className="flex flex-wrap items-center">
          {labels.map((label) => {
            return (
              <div
                key={label.text}
                className="m-1 whitespace-nowrap rounded-full bg-highlight px-3 py-1 text-xs font-bold uppercase text-light dark:bg-highlight-dark"
                title={label.description}
              >
                {label.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
