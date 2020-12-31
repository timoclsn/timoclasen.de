import ReactMarkdown from 'react-markdown';

export default function Teaser({ text }) {
    return (
        <div className={'text-teaser'}>
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    );
}
