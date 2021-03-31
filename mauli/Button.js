import { styled } from 'stitches.config';

const StyledButton = styled('button', {
    // Reset
    alignItems: 'center',
    appearance: 'none',
    boxSizing: 'border-box',
    display: 'inline-flex',
    flexShrink: 0,
    justifyContent: 'center',
    lineHeight: '1',
    margin: '0',
    outline: 'none',
    padding: '0',
    textDecoration: 'none',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    '&::before': {
        boxSizing: 'border-box'
    },
    '&::after': {
        boxSizing: 'border-box'
    },

    // Custom
    padding: '$2 $3',
    borderRadius: '$round',
    fontWeight: 'bold',
    fontSize: '$3',

    variants: {
        type: {
            primary: {
                color: '$light',
                backgroundColor: '$highlight',
                '&:hover': {
                    opacity: 0.9
                },
                '&:active': {
                    opacity: 0.7
                },
                '&:focus': {
                    outline: 'none',
                    boxShadow: 'inset 0 0 0 2px $colors$light'
                },
                '&:disabled': {
                    opacity: 0.5
                }
            },
            secondary: {
                color: '$light',
                boxShadow: 'inset 0 0 0 2px $colors$light',
                '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                }
            }
        }
    },

    defaultVariants: {
        type: 'primary'
    }
});

export default function Button({ children, ...props }) {
    return <StyledButton {...props}>{children}</StyledButton>;
}
