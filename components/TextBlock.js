import TextContainer from '../components/TextContainer';
import ReactMarkdown from 'react-markdown';

export default function TextBlock({ text }) {
    return (
        <TextContainer>
            <ReactMarkdown>{text}</ReactMarkdown>
        </TextContainer>
    );
}
