export default function Teaser({ text }) {
    return (
        <div
            className={
                'prose dark:prose-dark text-2xl sm:text-3xl md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight xl:text-6xl xl:leading-tight max-w-none'
            }
            dangerouslySetInnerHTML={{ __html: text }}></div>
    );
}
