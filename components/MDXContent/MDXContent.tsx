import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { HTMLProps } from "react";
import { TextBlock } from "../TextBlock";
import { Code } from "bright";

Code.theme = {
  dark: "github-dark",
  light: "github-light",
  lightSelector: "html.light",
};
Code.lineNumbers = true;

export const MDXContent = ({ source }: MDXRemoteProps) => {
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
    <TextBlock>
      <MDXRemote source={source} components={components} />
    </TextBlock>
  );
};
