import TextContainer from './TextContainer';

interface Props {
    text: string;
}

export default function TextBlock({ text }: Props) {
    return (
        <TextContainer>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
        </TextContainer>
    );
}
