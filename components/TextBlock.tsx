import { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    text?: string;
}

export default function TextBlock({ children, text }: Props) {
    return (
        <section
            className="mx-auto prose dark:prose-dark lg:prose-lg xl:prose-xl"
            dangerouslySetInnerHTML={text ? { __html: text } : undefined}>
            {children}
        </section>
    );
}
