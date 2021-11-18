import clsx from 'clsx';

import styles from './SoundBars.module.css';

interface Props {
  isPlaying?: boolean;
  color?: string;
}

export function SoundBars({ isPlaying, color }: Props) {
  const barStyles = clsx(
    'w-[3px]',
    'rounded-sm',
    styles.soundBars,
    isPlaying && styles.isPlaying,
    color ? color : 'bg-highlight dark:bg-highlight-dark'
  );

  return (
    <div className="relative flex items-end justify-between w-[15px] h-[15px]">
      <div className={`${barStyles} h-[5px]`} />
      <div className={`${barStyles} h-[15px]`} />
      <div className={`${barStyles} h-[10px]`} />
    </div>
  );
}
