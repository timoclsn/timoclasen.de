import { styled } from './stitches.config';

import Text from '@/mauli/Text';

const Heading = styled(Text, {
    color: '$hiContrast',
    fontWeight: '$bold',

    variants: {
        size: {
            small: {
                fontSize: '$5'
            },
            medium: {
                fontSize: '$6'
            },
            large: {
                fontSize: '$7'
            }
        }
    },

    defaultVariants: {
        size: 'medium'
    }
});

export default Heading;
