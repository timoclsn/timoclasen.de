import '../styles/globals.css';

import { IdProvider } from '@radix-ui/react-id';
import type { AppProps } from 'next/app';
import { SkeletonTheme } from 'react-loading-skeleton';

import { ThemeProvider } from '../components/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <IdProvider>
            <ThemeProvider>
                <SkeletonTheme color="#8D8D8D" highlightColor="#B5B5B5">
                    <Component {...pageProps} />
                </SkeletonTheme>
            </ThemeProvider>
        </IdProvider>
    );
}

export default MyApp;
