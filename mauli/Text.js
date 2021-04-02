import { styled } from './stitches.config';

const StyledText = styled('span', {
    variants: {
        variant: {
            normal: {
                color: '$hiContrast'
            },
            highlight: {
                color: '$highlight'
            }
        },
        weight: {
            normal: {
                fontWeight: '$normal'
            },
            bold: {
                fontWeight: '$bold'
            }
        },
        size: {
            xsmall: {
                fontSize: '$2'
            },
            small: {
                fontSize: '$3'
            },
            medium: {
                fontSize: '$4'
            },
            large: {
                fontSize: '$5'
            },
            xlarge: {
                fontSize: '$6'
            }
        }
    },

    defaultVariants: {
        variant: 'normal',
        weight: 'normal',
        size: 'small'
    }
});

export default function Text({ children, ...props }) {
    return <StyledText {...props}>{children}</StyledText>;
}
