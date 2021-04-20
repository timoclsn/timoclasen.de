import Image from 'next/image';
import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import styleDark from 'react-syntax-highlighter/dist/cjs/styles/prism/material-dark';
import styleLight from 'react-syntax-highlighter/dist/cjs/styles/prism/material-light';

import TextContainer from '@/components/TextContainer';
import { ThemeContext } from '@/components/ThemeContext';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const components = {
    p: function Paragraph({ node, children }) {
        if (node.children[0].type === 'image') {
            const image = node.children[0];
            return (
                <div className="rounded-md aspect-w-3 aspect-h-2 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10">
                    <Image
                        src={`https:${image.url}`}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center center"
                        sizes="90vw"
                        quality={60}
                        alt={image.alt}
                    />
                </div>
            );
        }
        return <p>{children}</p>;
    },
    pre: function Code({ node }) {
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

export default function TextPost({ children }) {
    return (
        <TextContainer>
            <ReactMarkdown components={components}>{children}</ReactMarkdown>
        </TextContainer>
    );
}
