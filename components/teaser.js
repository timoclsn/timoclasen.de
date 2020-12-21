export default function Teaser({ text }) {
    return (
        <div
            className={'prose dark:prose-dark prose-2xl'}
            dangerouslySetInnerHTML={{ __html: text }}></div>
    );
}
