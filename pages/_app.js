import '@/styles/globals.css';

import { SkeletonTheme } from 'react-loading-skeleton';

function MyApp({ Component, pageProps }) {
    return (
        <SkeletonTheme color="#8D8D8D" highlightColor="#B5B5B5">
            <Component {...pageProps} />
        </SkeletonTheme>
    );
}

export default MyApp;
