import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

import TextContainer from '@/components/TextContainer';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const renderers = {
    paragraph: function Paragraph(paragraph) {
        const { node } = paragraph;
        if (node.children[0].type === 'image') {
            const image = node.children[0];
            return (
                <div
                    className={
                        'relative overflow-hidden pb-2/3 bg-dark dark:bg-light bg-opacity-10 rounded-md'
                    }>
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
