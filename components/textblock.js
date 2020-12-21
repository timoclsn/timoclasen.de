export default function Textblock({ text }) {
    return (
        <div
            className={'prose dark:prose-dark'}
            dangerouslySetInnerHTML={{ __html: text }}></div>
    );
}
