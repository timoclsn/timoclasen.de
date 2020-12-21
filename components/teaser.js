export default function Teaser({ text }) {
    return (
        <div
            className={'prose-2xl dark:prose-dark-2xl'}
            dangerouslySetInnerHTML={{ __html: text }}></div>
    );
}
