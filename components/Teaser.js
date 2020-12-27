export default function Teaser({ text }) {
    return (
        <div
            className={
                'prose dark:prose-dark leading-relaxed text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-none'
            }
            dangerouslySetInnerHTML={{ __html: text }}></div>
    );
}
