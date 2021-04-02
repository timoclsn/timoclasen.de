import { styled } from './stitches.config';

const StyledBox = styled('div', {
    boxSizing: 'border-box',

    variants: {
        inset: {
            none: {
                padding: '0'
            },
            small: {
                padding: '$4'
            },
            medium: {
                padding: '$5'
            },
            large: {
                padding: '$5'
            }
        }
    },

    defaultVariants: {
        inset: 'medium'
    }
});

export default function Box({ children, ...props }) {
    return <StyledBox {...props}>{children}</StyledBox>;
}
