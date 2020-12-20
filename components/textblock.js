export default function Textblock({ text }) {
    return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
}
