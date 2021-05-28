import Image from 'next/image';
import { ReactNode, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import styleDark from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark';
import styleLight from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';

import TextContainer from './TextContainer';
import { ThemeContext } from './ThemeContext';

SyntaxHighlighter.registerLanguage('jsx', jsx);

interface ParagraphProps {
    node: ReactNode;
    children: ReactNode;
}

function Paragraph({ node, children }: ParagraphProps) {
    const domNode = node as HTMLElement;
    if (domNode.children[0].tagName === 'image') {
        const imageNode = domNode.children[0] as HTMLImageElement;
        return (
            <div className="rounded-md aspect-w-3 aspect-h-2 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10">
                <Image
                    src={`https:${imageNode.src}`}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    sizes="90vw"
                    quality={60}
                    alt={imageNode.alt}
                />
            </div>
        );
    }
    return <p>{children}</p>;
}

interface CodeProps {
    node: ReactNode;
}

interface CodeNode {
    type: string;
    value: string;
}

function Code({ node }: CodeProps) {
    const domNode = node as HTMLElement;
    const { darkMode } = useContext(ThemeContext);
    const style = darkMode ? styleDark : styleLight;
    const codeNode = domNode.children[0].children[0] as unknown as CodeNode;
    const text = codeNode.value.replace(/\n$/, '');

    return (
        <SyntaxHighlighter style={style} language="jsx">
            {text}
        </SyntaxHighlighter>
    );
}

const components = {
    p: Paragraph,
    pre: Code
};

interface Props {
    children: string;
}

export default function TextPost({ children }: Props) {
    return (
        <TextContainer>
            <ReactMarkdown components={components}>{children}</ReactMarkdown>
        </TextContainer>
    );
}
