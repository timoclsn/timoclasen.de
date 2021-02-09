import '@/styles/globals.css';

import { ThemeProvider } from 'next-themes';
import { SkeletonTheme } from 'react-loading-skeleton';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider defaultTheme="system" attribute="class">
            <SkeletonTheme color="#8D8D8D" highlightColor="#B5B5B5">
                <Component {...pageProps} />
            </SkeletonTheme>
        </ThemeProvider>
    );
}

export default MyApp;
