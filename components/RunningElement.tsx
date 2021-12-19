import { useRef } from 'react';
import type { Icon } from 'react-feather';

import { CountUpAnimation } from './CountUpNumber';
import { Skeleton } from './Skeleton';
import { useOnScreen } from './useOnScreen';
interface Label {
  text: string;
  description: string;
}

interface Props {
  Icon: Icon;
  text?: string;
  href?: string;
  labels?: Label[];
  nowrap?: boolean;
  animateLabelNumber?: boolean;
}

export function RunningElement({
  Icon,
  text,
  href,
  labels,
  nowrap,
  animateLabelNumber,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref);
  return (
    <div className="flex items-center space-x-4" ref={ref}>
      <div className="leading-none">
        {text ? (
          <Icon size={22} />
        ) : (
          <Skeleton circle height="20px" width="20px" />
        )}
      </div>
      <p className={`my-2${nowrap && ' whitespace-nowrap'}`}>
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
            const textElements = label.text.match(/[^\d]+|\d+/g) ?? [];
            const number = textElements[0] as unknown as number;
            const rest = textElements[1];
            return (
              <div
                key={label.text}
                className="px-3 py-1 m-1 text-xs font-bold uppercase rounded-full whitespace-nowrap bg-highlight dark:bg-highlight-dark text-light"
                title={label.description}
              >
                {animateLabelNumber ? (
                  <>
                    <CountUpAnimation play={visible}>{number}</CountUpAnimation>
                    {rest}
                  </>
                ) : (
                  label.text
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
