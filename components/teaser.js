export default function Teaser({ text }) {
    return (
        <div
            className={'prose dark:prose-dark prose lg:prose-lg xl:prose-xl'}
            dangerouslySetInnerHTML={{ __html: text }}></div>
    );
}
