import { Send } from 'react-feather';

import Button from '@/mauli/Button';

export default function Mauli() {
    return (
        <>
            <Button>Standard</Button>
            <Button disabled>Standard</Button>
            <Button type="primary">Primary</Button>
            <Button type="primary">
                <Send size={16} />
                Primary
            </Button>
            <Button type="secondary">Secondary</Button>
            <Button type="secondary" onClick={() => alert('test')}>
                Alert
            </Button>
            <Button
                as="a"
                href="https://timoclasen.de"
                target="_blank"
                rel="noopener noreferrer">
                timoclasen.de
            </Button>
        </>
    );
}
