"use client";
import NextImage from "next/image";
import ReactMarkdown, { Components } from "react-markdown";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import styleDark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";
import styleLight from "react-syntax-highlighter/dist/cjs/styles/prism/material-light";

import { TextBlock } from "./TextBlock";
import { useTheme } from "./ThemeContext";

SyntaxHighlighter.registerLanguage("jsx", jsx);

interface CodeNode {
  value: string;
}

interface Props {
  children: string;
}

export function TextPost({ children }: Props) {
  const { darkMode } = useTheme();

  const components: Components = {
    pre: ({ node }) => {
      const domNode = node as unknown as HTMLElement;
      const codeNode = domNode.children[0].children[0] as unknown as CodeNode;
      const text = codeNode.value.replace(/\n$/, "");
      const style = darkMode ? styleDark : styleLight;
      return (
        <SyntaxHighlighter style={style} language="jsx">
          {text}
        </SyntaxHighlighter>
      );
    },
    img: ({ src, alt }) => {
      return (
        <span className="not-prose aspect-h-2 aspect-w-3 block rounded-md bg-dark bg-opacity-10 dark:bg-light dark:bg-opacity-10">
          <NextImage
            src={`https:${src}`}
            width="2200"
            height="2200"
            sizes="90vw"
            quality={60}
            alt={alt ?? ""}
            className="object-contain object-center"
          />
        </span>
      );
    },
  };
  return (
    <TextBlock>
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </TextBlock>
  );
}
