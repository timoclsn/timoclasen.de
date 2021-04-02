import { styled } from './stitches.config';

import Box from '@/mauli/Box';

const Card = styled(Box, {
    boxSizing: 'border-box',
    borderRadius: '$4',
    width: '100%',

    variants: {
        variant: {
            normal: {
                color: '$hiContrast',
                backgroundColor: 'rgba(255,255,255,0.1)' // TODO: Use color
            },
            highlight: {
                color: '$white',
                backgroundColor: '$highlight'
            }
        }
    },

    defaultVariants: {
        variant: 'normal'
    }
});

export default Card;
