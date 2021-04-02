import { styled } from './stitches.config';

const Container = styled('div', {
    boxSizing: 'border-box',
    margin: '0 auto',
    width: '100%',

    variants: {
        size: {
            small: {
                maxWidth: '640px'
            },
            medium: {
                maxWidth: '768px'
            },
            large: {
                maxWidth: '1024px'
            }
        }
    },

    defaultVariants: {
        size: 'medium'
    }
});

export default Container;
