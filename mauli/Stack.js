import { styled } from 'stitches.config';

const StyledStack = styled('div', {
    boxSizing: 'border-box',
    display: 'flex',
    $$gap: '$space$2',

    variants: {
        direction: {
            vertical: {
                flexDirection: 'row',
                '> * + *': {
                    marginLeft: '$$gap'
                }
            },
            horizontal: {
                flexDirection: 'column',
                '> * + *': {
                    marginTop: '$$gap'
                }
            }
        },
        space: {
            xsmall: {
                $$gap: '$space$1'
            },
            small: {
                $$gap: '$space$2'
            },
            medium: {
                $$gap: '$space$3'
            },
            large: {
                $$gap: '$space$4'
            },
            xlarge: {
                $$gap: '$space$5'
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
        space: 'small',
        align: 'center',
        justify: 'center'
    }
});

export default function Stack({ children, ...props }) {
    return <StyledStack {...props}>{children}</StyledStack>;
}
