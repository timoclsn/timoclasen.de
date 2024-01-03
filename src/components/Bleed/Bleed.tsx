import { cx } from "cva";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Bleed = ({ children, className }: Props) => {
  return (
    <div className={cx("ml-[calc(50%-50vw)] w-screen", className)}>
      {children}
    </div>
  );
};
