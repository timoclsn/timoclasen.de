import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const TouchTarget = ({ children }: Props) => {
  return (
    <>
      {children}
      <span
        className="width-[max(100%,2.75rem)] height-[max(100%,2.75rem)] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
    </>
  );
};
