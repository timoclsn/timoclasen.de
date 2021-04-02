import { styled } from './stitches.config';

const Button = styled('button', {
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
                color: '$white',
                backgroundColor: '$highlight',
                '&:hover': {
                    boxShadow: 'inset 0 0 0 2px $colors$hiContrast'
                },
                '&:active': {
                    opacity: 0.7, // TODO: Use color
                    boxShadow: 'inset 0 0 0 2px $colors$hiContrast'
                },
                '&:focus': {
                    outline: 'none',
                    boxShadow:
                        'inset 0 0 0 2px $colors$hiContrast, 0 0 0 1px $colors$hiContrast'
                },
                '&:disabled': {
                    opacity: 0.5 // TODO: Use color
                }
            },

            ghost: {
                color: '$hiContrast',
                boxShadow: 'inset 0 0 0 2px $colors$hiContrast',
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
                },
                '&:disabled': {
                    opacity: 0.5 // TODO: Use color
                }
            }
        },

        size: {
            medium: {
                fontSize: '$3',
                fontWeight: '$bold',
                padding: '$4 $5',
                svg: {
                    width: '16px',
                    height: '16px'
                },
                '> * + *': {
                    marginLeft: '$3'
                }
            },

            small: {
                fontSize: '$2',
                fontWeight: '$normal',
                padding: '$3 $4',
                svg: {
                    width: '12px',
                    height: '12px'
                },
                '> * + *': {
                    marginLeft: '$2'
                }
            }
        }
    },

    defaultVariants: {
        variant: 'solid',
        size: 'medium'
    }
});

export default Button;
