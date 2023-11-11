import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  text?: string;
}

export function TextBlock({ children, text }: Props) {
  return (
    <section
      className="prose prose-custom mx-auto dark:prose-invert lg:prose-lg xl:prose-xl"
      dangerouslySetInnerHTML={text ? { __html: text } : undefined}
    >
      {children}
    </section>
  );
}
