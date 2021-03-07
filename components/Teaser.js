export default function Teaser({ text }) {
    return (
        <section
            className="text-teaser"
            data-cy="home-page-teaser"
            dangerouslySetInnerHTML={{ __html: text }}></section>
    );
}
