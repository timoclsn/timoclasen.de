import { createCss } from '@stitches/react';

export const { css, styled, getCssString, theme } = createCss({
    theme: {
        colors: {
            white: 'white',
            black: 'black',
            purple: '#3E51F7',

            // Semantic
            loContrast: '$white',
            hiContrast: '$black',
            highlight: '$purple'
        },
        fonts: {
            sans: 'Inter, sans-serif'
        },
        fontSizes: {
            1: '12px',
            2: '14px',
            3: '16px',
            4: '20px',
            5: '24px',
            6: '32px',
            7: '48px',
            8: '64px',
            9: '72px'
        },
        fontWeights: {
            normal: 400,
            bold: 700
        },
        space: {
            1: '2px',
            2: '4px',
            3: '8px',
            4: '16px',
            5: '32px',
            6: '64px',
            7: '128px',
            8: '256px',
            9: '512px'
        },
        sizes: {
            1: '2px',
            2: '4px',
            3: '8px',
            4: '16px',
            5: '32px',
            6: '64px',
            7: '128px',
            8: '256px',
            9: '512px'
        },
        lineHeights: {
            1: '18px',
            2: '21px',
            3: '24px',
            4: '30px',
            5: '36px',
            6: '48px',
            7: '72px',
            8: '96px',
            9: '108px'
        },
        radii: {
            1: '2px',
            2: '4px',
            3: '8px',
            4: '16px',
            5: '32px',
            round: '9999px'
        }
    },
    media: {
        bp1: '(min-width: 640px)',
        bp2: '(min-width: 768px)',
        bp3: '(min-width: 1024px)',
        bp4: '(min-width: 1280px)'
    }
});

export const darkTheme = theme('dark', {
    colors: {
        white: 'white',
        black: 'black',
        purple: '#4F5FEF',

        // Semantic
        loContrast: '$black',
        hiContrast: '$white',
        highlight: '$purple'
    }
});
