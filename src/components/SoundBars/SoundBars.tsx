import { cva } from "cva";
import styles from "./SoundBars.module.css";

interface Props {
  isPlaying?: boolean;
  color?: string;
}

export function SoundBars({ isPlaying, color }: Props) {
  const barVariants = cva({
    base: ["w-[3px] rounded-xs", styles.soundBars],
    variants: {
      isPlaying: {
        true: styles.isPlaying,
      },
      color: {
        true: color,
        false: "bg-highlight dark:bg-highlight-dark",
      },
    },
  });

  return (
    <div className="relative flex h-[15px] w-[15px] items-end justify-between">
      <div
        className={barVariants({ isPlaying, color: !!color, class: "h-[5px]" })}
      />
      <div
        className={barVariants({
          isPlaying,
          color: !!color,
          class: "h-[15px]",
        })}
      />
      <div
        className={barVariants({
          isPlaying,
          color: !!color,
          class: "h-[10px]",
        })}
      />
    </div>
  );
}
