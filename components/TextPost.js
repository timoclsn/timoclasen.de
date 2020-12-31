import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const renderers = {
    paragraph: function paragraph(paragraph) {
        const { node } = paragraph;
        if (node.children[0].type === 'image') {
            const image = node.children[0];
            return (
                <Image
                    src={`https:${image.url}`}
                    width="500"
                    height="400"
                    alt={image.alt}
                    quality={90}
                />
            );
        }

        return <p>{paragraph.children}</p>;
    },
    code: function code({ language, value }) {
        return (
            <SyntaxHighlighter style={style} language={language}>
                {value}
            </SyntaxHighlighter>
        );
    }
};

export default function TextPost({ text }) {
    return (
        <article
            className={
                'prose dark:prose-dark prose lg:prose-lg xl:prose-xl mx-auto'
            }>
            <ReactMarkdown renderers={renderers}>{text}</ReactMarkdown>
        </article>
    );
}
