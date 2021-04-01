import { styled } from 'stitches.config';

const StyledBox = styled('div', {
    boxSizing: 'border-box'
});

export default function Button({ children, ...props }) {
    return <StyledBox {...props}>{children}</StyledBox>;
}
