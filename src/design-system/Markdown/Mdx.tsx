import { Code } from "bright";
import { cx } from "cva";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { HTMLProps } from "react";

Code.theme = {
  dark: "github-dark",
  light: "github-light",
  lightSelector: "html.light",
};
Code.lineNumbers = true;

interface Props {
  children: string;
  className?: string;
}

export const Mdx = ({ children, className }: Props) => {
  const components = {
    img: ({ src, alt }: HTMLProps<HTMLImageElement>) => {
      if (!src || !alt) {
        return null;
      }
      return (
        <span className="not-prose aspect-h-2 aspect-w-3 block rounded-md bg-dark bg-opacity-10 dark:bg-light dark:bg-opacity-10">
          <Image
            src={`https:${src}`}
            alt={alt}
            width="2200"
            height="2200"
            sizes="90vw"
            quality={60}
            className="object-contain object-center"
          />
        </span>
      );
    },
    a: ({ children, href }: HTMLProps<HTMLAnchorElement>) => {
      if (!href) {
        return null;
      }
      return <Link href={href}>{children}</Link>;
    },
    pre: Code,
  };

  return (
    <div
      className={cx(
        "prose prose-custom mx-auto dark:prose-invert lg:prose-lg xl:prose-xl",
        className,
      )}
    >
      <MDXRemote source={children} components={components} />
    </div>
  );
};
