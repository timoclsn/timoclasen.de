import { styled } from 'stitches.config';

const StyledButton = styled('button', {
    // Reset
    boxSizing: 'border-box',
    appearance: 'none',
    outline: 'none',
    textDecoration: 'none',
    userSelect: 'none',
    margin: '0',
    flexShrink: '0',
    lineHeight: '1',

    // Custom
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '$round',

    variants: {
        variant: {
            solid: {
                color: '$highlightText',
                backgroundColor: '$highlightBackground',
                '&:hover': {
                    boxShadow: 'inset 0 0 0 2px $colors$highlightBorder'
                },
                '&:active': {
                    opacity: 0.7, // TODO: Use color
                    boxShadow: 'inset 0 0 0 2px $colors$highlightBorder'
                },
                '&:focus': {
                    outline: 'none',
                    boxShadow:
                        'inset 0 0 0 2px $colors$highlightBorder, 0 0 0 1px $colors$highlightBorder'
                },
                '&:disabled': {
                    opacity: 0.5 // TODO: Use color
                }
            },
            ghost: {
                color: '$text',
                boxShadow: 'inset 0 0 0 2px $colors$text',
                '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)' // TODO: Use color
                },
                '&:active': {
                    backgroundColor: 'rgba(255,255,255,0.3)' // TODO: Use color
                },
                '&:focus': {
                    outline: 'none',
                    boxShadow:
                        'inset 0 0 0 2px $colors$highlight, 0 0 0 1px $colors$highlight'
                }
            }
        },
        size: {
            standard: {
                fontSize: '$3',
                fontWeight: '$bold',
                padding: '$2 $3',
                svg: {
                    width: '16px',
                    height: '16px'
                },
                '> * + *': {
                    marginLeft: '$2'
                }
            },
            small: {
                fontSize: '$2',
                fontWeight: '$normal',
                padding: '$1 $2',
                svg: {
                    width: '12px',
                    height: '12px'
                },
                '> * + *': {
                    marginLeft: '$1'
                }
            }
        }
    },

    defaultVariants: {
        variant: 'solid',
        size: 'standard'
    }
});

export default function Button({ children, ...props }) {
    return (
        <StyledButton {...props}>
            {Array.isArray(children)
                ? children.map((child) => <span>{child}</span>)
                : children}
        </StyledButton>
    );
}
