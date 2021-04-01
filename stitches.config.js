import { createCss } from '@stitches/react';

export const { css, styled, getCssString, theme } = createCss({
    theme: {
        colors: {
            white: 'white',
            black: 'black',
            highlight: '#3E51F7',
            text: '$white',
            background: '$black',
            highlightText: '$white',
            highlightBackground: '$highlight',
            highlightBorder: '$white'
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
            1: '4px',
            2: '8px',
            3: '16px',
            4: '32px',
            5: '64px',
            6: '128px',
            7: '256px',
            8: '512px'
        },
        sizes: {
            1: '4px',
            2: '8px',
            3: '16px',
            4: '32px',
            5: '64px',
            6: '128px',
            7: '256px',
            8: '512px'
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
            1: '3px',
            2: '5px',
            3: '7px',
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
        loContrast: 'black',
        hiContrast: 'white',
        highlight: 'red'
    }
});
