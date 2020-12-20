export default function Teaser({ text }) {
    return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
}
