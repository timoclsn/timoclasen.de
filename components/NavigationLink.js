import { useRouter } from 'next/router';
import React from 'react';

export default React.forwardRef(function NavigationLink(
    { children, onClick, href },
    ref
) {
    const router = useRouter();
    return (
        <a
            href={href}
            onClick={onClick}
            ref={ref}
            className={`hover:text-highlight dark:hover:text-highlight-dark ${
                router.pathname.includes(href)
                    ? 'text-highlight dark:text-highlight-dark'
                    : ''
            }`}>
            {children}
        </a>
    );
});
