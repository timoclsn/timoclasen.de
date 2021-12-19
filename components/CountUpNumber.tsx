import { useEffect, useState } from 'react';

const easeOutQuad = (t: number) => t * (2 - t);
const frameDuration = 1000 / 60;

interface Props {
  children: number;
  duration?: number;
  play?: boolean;
}

export function CountUpAnimation({ children, duration = 2000, play }: Props) {
  const countTo = children;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let counter: ReturnType<typeof setInterval> | undefined;

    if (play) {
      let frame = 0;
      const totalFrames = Math.round(duration / frameDuration);
      counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        setCount(countTo * progress);

        if (frame === totalFrames) {
          counter && clearInterval(counter);
        }
      }, frameDuration);
    } else {
      counter && clearInterval(counter);
    }

    return () => counter && clearInterval(counter);
  }, [countTo, duration, play]);

  return <span>{play ? Math.floor(count) : countTo}</span>;
}
