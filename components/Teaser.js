import ReactMarkdown from 'react-markdown';

export default function Teaser({ text }) {
    return (
        <section className={'text-teaser'}>
            <ReactMarkdown>{text}</ReactMarkdown>
        </section>
    );
}
