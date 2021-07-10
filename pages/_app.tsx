import '../styles/globals.css';

import { IdProvider } from '@radix-ui/react-id';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '../components/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <IdProvider>
            <ThemeProvider>
                <Component {...pageProps} />
                <Toaster position="bottom-center" />
            </ThemeProvider>
        </IdProvider>
    );
}

export default MyApp;
