export default function Textblock({ text }) {
    return (
        <article
            className={'prose dark:prose-dark prose-sm'}
            dangerouslySetInnerHTML={{ __html: text }}></article>
    );
}
