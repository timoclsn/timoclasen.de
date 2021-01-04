import TextContainer from '../components/TextContainer';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const renderers = {
    paragraph: function paragraph(paragraph) {
        const { node } = paragraph;
        if (node.children[0].type === 'image') {
            const image = node.children[0];
            return (
                <Image
                    src={`https:${image.url}`}
                    width="900"
                    height="600"
                    layout="responsive"
                    alt={image.alt}
                    quality={60}
                    className={'rounded-md'}
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
