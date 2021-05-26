import type { AppProps } from 'next/app';
import { SkeletonTheme } from 'react-loading-skeleton';

import '@/styles/globals.css';
import { ThemeProvider } from '../components/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <SkeletonTheme color="#8D8D8D" highlightColor="#B5B5B5">
                <Component {...pageProps} />
            </SkeletonTheme>
        </ThemeProvider>
    );
}

export default MyApp;
