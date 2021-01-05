import TextContainer from '../components/TextContainer';

export default function TextBlock({ text }) {
    return (
        <TextContainer>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
        </TextContainer>
    );
}
