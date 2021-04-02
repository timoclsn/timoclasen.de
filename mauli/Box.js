import { styled } from './stitches.config';

const Box = styled('div', {
    boxSizing: 'border-box',

    variants: {
        inset: {
            none: {
                padding: 'none'
            },
            small: {
                padding: '$4'
            },
            medium: {
                padding: '$5'
            },
            large: {
                padding: '$6'
            }
        }
    },

    defaultVariants: {
        inset: 'medium'
    }
});

export default Box;
