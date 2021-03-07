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

const renderers = {
    paragraph: function Paragraph(paragraph) {
        const { node } = paragraph;
        if (node.children[0].type === 'image') {
            const image = node.children[0];
            return (
                <div className="relative overflow-hidden rounded-md pb-2/3 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10">
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

        return <p>{paragraph.children}</p>;
    },
    code: function Code({ language, value }) {
        const { darkMode } = useContext(ThemeContext);
        const style = darkMode ? styleDark : styleLight;

        return (
            <SyntaxHighlighter style={style} language={language}>
                {value}
            </SyntaxHighlighter>
        );
    }
};

export default function TextPost({ text }) {
    return (
        <TextContainer>
            <ReactMarkdown renderers={renderers}>{text}</ReactMarkdown>
        </TextContainer>
    );
}
