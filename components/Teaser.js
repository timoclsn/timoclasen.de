export default function Teaser({ text }) {
    return (
        <div
            className={'text-teaser'}
            dangerouslySetInnerHTML={{ __html: text }}></div>
    );
}
