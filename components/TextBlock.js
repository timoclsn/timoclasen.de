import ReactMarkdown from 'react-markdown';

export default function TextBlock({ text }) {
    return (
        <article
            className={
                'prose dark:prose-dark prose lg:prose-lg xl:prose-xl mx-auto'
            }>
            <ReactMarkdown>{text}</ReactMarkdown>
        </article>
    );
}
