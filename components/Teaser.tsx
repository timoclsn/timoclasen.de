interface Props {
    text: string;
}

export default function Teaser({ text }: Props) {
    return (
        <section
            className="text-teaser"
            data-cy="home-page-teaser"
            dangerouslySetInnerHTML={{ __html: text }}></section>
    );
}
