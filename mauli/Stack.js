import { styled } from './stitches.config';

const Stack = styled('div', {
    boxSizing: 'border-box',
    display: 'flex',

    variants: {
        direction: {
            vertical: {
                flexDirection: 'column',
                '> * + *': {
                    margin: '$$gap 0 0 0'
                }
            },
            horizontal: {
                flexDirection: 'row',
                '> * + *': {
                    margin: '0 0 0 $$gap'
                }
            }
        },

        space: {
            xsmall: {
                $$gap: '$space$2'
            },
            small: {
                $$gap: '$space$3'
            },
            medium: {
                $$gap: '$space$4'
            },
            large: {
                $$gap: '$space$5'
            },
            xlarge: {
                $$gap: '$space$6'
            }
        },

        align: {
            start: {
                alignItems: 'start'
            },
            center: {
                alignItems: 'center'
            },
            end: {
                alignItems: 'end'
            }
        },

        justify: {
            start: {
                justifyContet: 'start'
            },
            center: {
                justifyContet: 'center'
            },
            end: {
                justifyContet: 'end'
            },
            between: {
                justifyContent: 'space-between'
            }
        }
    },

    defaultVariants: {
        direction: 'vertical',
        space: 'medium',
        align: 'start',
        justify: 'center'
    }
});

export default Stack;