import { useRouter } from 'next/router';
import { forwardRef } from 'react';

export default forwardRef(function NavigationLink(
    { children, href, ...props },
    ref
) {
    const router = useRouter();
    return (
        <a
            href={href}
            ref={ref}
            className={`hover:text-highlight dark:hover:text-highlight-dark ${
                router.pathname.includes(href)
                    ? 'text-highlight dark:text-highlight-dark hover:opacity-80'
                    : ''
            }`}
            {...props}>
            {children}
        </a>
    );
});
