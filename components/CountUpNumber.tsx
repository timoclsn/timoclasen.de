import { useEffect, useState } from 'react';

const easeOutQuad = (t: number) => t * (2 - t);
const frameDuration = 1000 / 60;

interface Props {
  children: number;
  duration?: number;
  play?: boolean;
}

export function CountUpAnimation({ children, duration = 3500, play }: Props) {
  const countTo = children;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (play) {
      let frame = 0;
      const totalFrames = Math.round(duration / frameDuration);
      const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        setCount(countTo * progress);

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    }
  }, [countTo, duration, play]);

  return <span>{play ? Math.floor(count) : countTo}</span>;
}
