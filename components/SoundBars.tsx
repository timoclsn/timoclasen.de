import clsx from 'clsx';

interface Props {
  isPlaying?: boolean;
  color?: string;
}

export function SoundBars({ isPlaying, color }: Props) {
  const barStyles = clsx(
    'w-[3px]',
    'rounded-sm',
    'soundBars',
    isPlaying && 'isPlaying',
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
