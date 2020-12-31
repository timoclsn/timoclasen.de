export default function TextContainer({ children }) {
    return (
        <article
            className={
                'prose dark:prose-dark prose lg:prose-lg xl:prose-xl mx-auto'
            }>
            {children}
        </article>
    );
}
