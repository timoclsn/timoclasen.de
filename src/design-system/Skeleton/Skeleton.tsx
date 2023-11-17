import { cx } from "class-variance-authority";

interface Props {
  className?: string;
  circle?: boolean;
  width?: string;
  height?: string;
  borderRadius?: string;
  lineHeight?: string;
}

export function Skeleton({
  className,
  circle,
  width,
  height,
  borderRadius,
  lineHeight,
}: Props) {
  return (
    <span
      className={cx(
        "inline-block animate-pulse bg-dark/25 leading-none dark:bg-light/25",
        className,
      )}
      style={{
        width: width ? width : "100%",
        height: height ? height : "auto",
        borderRadius: circle
          ? "9999px"
          : borderRadius
          ? borderRadius
          : "0.25rem",
        lineHeight: lineHeight ? lineHeight : "1",
      }}
    >
      &zwnj;
    </span>
  );
}
