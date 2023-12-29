import { cx } from "cva";

interface Props {
  className?: string;
  display?: string;
  circle?: boolean;
  width?: string;
  height?: string;
  borderRadius?: string;
  lineHeight?: string;
}

export const Skeleton = ({
  className,
  display = "inline-block",
  circle = false,
  width = "100%",
  height = "auto",
  borderRadius = "0.25rem",
  lineHeight = "1",
}: Props) => {
  return (
    <span
      className={cx("animate-pulse bg-dark/25 dark:bg-light/25", className)}
      style={{
        display,
        width,
        height,
        borderRadius: circle ? "9999px" : borderRadius,
        lineHeight,
      }}
    >
      &zwnj;
    </span>
  );
};
