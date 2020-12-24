export default function TextBlock({ text }) {
    return (
        <article
            className={'prose dark:prose-dark prose lg:prose-lg xl:prose-xl'}
            dangerouslySetInnerHTML={{ __html: text }}></article>
    );
}
