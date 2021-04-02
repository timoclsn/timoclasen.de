import { styled, leadingTrimRef } from './stitches.config';
import { leadingTrim } from 'leading-trim';

function getLeadingTrimCSS(lineHeight) {
    return leadingTrim({
        lineHeight: lineHeight,
        reference: leadingTrimRef
    });
}

const Text = styled('span', {
    ...getLeadingTrimCSS(1.2),

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
            small: {
                fontSize: '$2'
            },
            medium: {
                fontSize: '$3'
            },
            large: {
                fontSize: '$4'
            }
        },

        align: {
            left: {
                textAlign: 'left'
            },
            center: {
                textAlign: 'center'
            },
            right: {
                textAlign: 'right'
            }
        }
    },

    defaultVariants: {
        variant: 'normal',
        weight: 'normal',
        size: 'medium',
        align: 'left'
    }
});

export default Text;
