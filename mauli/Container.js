import { styled } from './stitches.config';

const Container = styled('div', {
    boxSizing: 'border-box',
    margin: '0 auto',
    width: '100%',

    variants: {
        widht: {
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
        widht: 'normal'
    }
});

export default Container;
