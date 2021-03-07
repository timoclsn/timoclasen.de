export default function TextContainer({ children }) {
    return (
        <section className="mx-auto prose dark:prose-dark lg:prose-lg xl:prose-xl">
            {children}
        </section>
    );
}
