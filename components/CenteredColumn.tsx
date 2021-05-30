import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function CenteredColumn({ children }: Props) {
    return (
        <section className="max-w-screen-xl px-6 mx-auto space-y-12 md:px-12 lg:px-24 md:space-y-16 lg:space-y-24">
            {children}
        </section>
    );
}
