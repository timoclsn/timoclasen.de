import TextContainer from '../components/TextContainer';
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
                    width="960"
                    height="540"
                    layout="responsive"
                    alt={image.alt}
                    quality={75}
                    className={'rounded-3xl'}
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
        <TextContainer>
            <ReactMarkdown renderers={renderers}>{text}</ReactMarkdown>
        </TextContainer>
    );
}
