import '@/styles/globals.css';

import { SkeletonTheme } from 'react-loading-skeleton';

import { ThemeProvider } from '@/hooks/ThemeContext';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <SkeletonTheme color="#8D8D8D" highlightColor="#B5B5B5">
                <Component {...pageProps} />
            </SkeletonTheme>
        </ThemeProvider>
    );
}

export default MyApp;
