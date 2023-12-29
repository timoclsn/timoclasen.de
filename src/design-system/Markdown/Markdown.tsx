import { cx } from "cva";
import { ElementType } from "react";
import { markdownToHTML } from "../../lib/text";

interface Props {
  as?: ElementType;
  children: string;
  className?: string;
  unstyled?: boolean;
}

export const Markdown = async ({
  as: Element = "div",
  children,
  className,
  unstyled = false,
}: Props) => {
  const styles = unstyled
    ? className
    : cx(
        "prose prose-custom mx-auto dark:prose-invert lg:prose-lg xl:prose-xl",
        className,
      );
  const text = await markdownToHTML(children);
  return (
    <Element className={styles} dangerouslySetInnerHTML={{ __html: text }} />
  );
};
