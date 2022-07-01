import NextImage from 'next/future/image';
import ReactMarkdown, { Components } from 'react-markdown';
import type { Element } from 'react-markdown/lib/ast-to-react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import styleDark from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark';
import styleLight from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';

import { TextBlock } from './TextBlock';
import { useTheme } from './ThemeContext';

SyntaxHighlighter.registerLanguage('jsx', jsx);

interface ImageProps {
  node: any;
}

function Image({ node }: ImageProps) {
  return (
    <NextImage
      src={`https:${node.properties.src}`}
      sizes="90vw"
      quality={60}
      alt={node.properties.alt}
      className="rounded-3xl"
    />
  );
}

interface CodeProps {
  node: Element;
}

interface CodeNode {
  type: string;
  value: string;
}

function Code({ node }: CodeProps) {
  const domNode = node as unknown as HTMLElement;
  const { darkMode } = useTheme();
  const style = darkMode ? styleDark : styleLight;
  const codeNode = domNode.children[0].children[0] as unknown as CodeNode;
  const text = codeNode.value.replace(/\n$/, '');

  return (
    <SyntaxHighlighter style={style} language="jsx">
      {text}
    </SyntaxHighlighter>
  );
}

const components: Components = {
  pre: Code,
  img: Image,
};

interface Props {
  children: string;
}

export function TextPost({ children }: Props) {
  return (
    <TextBlock>
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </TextBlock>
  );
}
