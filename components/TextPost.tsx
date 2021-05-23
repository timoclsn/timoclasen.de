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

interface Paragraph {
    node: any;
    children: ReactNode;
}

interface Code {
    node: any;
}

const components = {
    p: function Paragraph({ node, children }: Paragraph) {
        if (node.children[0].type === 'image') {
            const image = node.children[0];
            return (
                <div className="rounded-md aspect-w-3 aspect-h-2 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10">
                    <Image
                        src={`https:${image.url}`}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                        sizes="90vw"
                        quality={60}
                        alt={image.alt}
                    />
                </div>
            );
        }
        return <p>{children}</p>;
    },
    pre: function Code({ node }: Code) {
        const { darkMode } = useContext(ThemeContext);
        const style = darkMode ? styleDark : styleLight;
        const code = node.children[0].children[0].value.replace(/\n$/, '');

        return (
            <SyntaxHighlighter style={style} language="jsx">
                {code}
            </SyntaxHighlighter>
        );
    }
};

interface Props {
    children: 'children';
}

export default function TextPost({ children }: Props) {
    return (
        <TextContainer>
            <ReactMarkdown components={components}>{children}</ReactMarkdown>
        </TextContainer>
    );
}
