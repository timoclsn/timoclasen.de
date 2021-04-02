import { styled } from './stitches.config';

const StyledHeading = styled('h1', {
    color: '$hiContrast',
    fontWeight: '$bold',

    variants: {
        size: {
            small: {
                fontSize: '$5'
            },
            mmedium: {
                fontSize: '$6'
            },
            large: {
                fontSize: '$7'
            }
        }
    },

    defaultVariants: {
        size: 'mmedium'
    }
});

export default function Heading({ children, ...props }) {
    return <StyledHeading {...props}>{children}</StyledHeading>;
}
