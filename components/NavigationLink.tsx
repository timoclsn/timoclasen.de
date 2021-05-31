import type * as Polymorphic from '@radix-ui/react-polymorphic';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
interface Props {
    children: ReactNode;
    target?: '_blank';
    rel?: 'noopener noreferrer' | 'noopener' | 'noreferrer';
}

export const NavigationLink = forwardRef(function NavigationLink(
    { children, href, ...props },
    ref
) {
    const router = useRouter();
    return (
        <a
            href={href}
            className={`hover:text-highlight dark:hover:text-highlight-dark ${
                href && router.pathname.includes(href)
                    ? 'text-highlight dark:text-highlight-dark hover:opacity-80'
                    : ''
            }`}
            ref={ref}
            {...props}>
            {children}
        </a>
    );
}) as Polymorphic.ForwardRefComponent<'a', Props>;
