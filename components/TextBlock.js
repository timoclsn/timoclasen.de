import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

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
    }
};

export default function TextBlock({ text }) {
    return (
        <article
            className={
                'prose dark:prose-dark prose lg:prose-lg xl:prose-xl mx-auto'
            }>
            <ReactMarkdown renderers={renderers}>{text}</ReactMarkdown>
        </article>
    );
}
