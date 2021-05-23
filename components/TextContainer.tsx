import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function TextContainer({ children }: Props) {
    return (
        <section className="mx-auto prose dark:prose-dark lg:prose-lg xl:prose-xl">
            {children}
        </section>
    );
}
