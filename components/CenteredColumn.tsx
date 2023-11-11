import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function CenteredColumn({ children }: Props) {
  return (
    <section className="mx-auto max-w-screen-xl space-y-12 px-6 md:space-y-16 md:px-12 lg:space-y-24 lg:px-24">
      {children}
    </section>
  );
}
