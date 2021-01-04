import { useRouter } from 'next/router';
import React from 'react';

export default React.forwardRef(function NavigationLink(
    { children, onClick, href, target, rel },
    ref
) {
    const router = useRouter();
    return (
        <a
            href={href}
            onClick={onClick}
            ref={ref}
            target={target}
            rel={rel}
            className={`hover:text-highlight dark:hover:text-highlight-dark ${
                router.pathname.includes(href)
                    ? 'text-highlight dark:text-highlight-dark hover:opacity-80'
                    : ''
            }`}>
            {children}
        </a>
    );
});
