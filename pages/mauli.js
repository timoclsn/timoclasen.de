import { Send } from 'react-feather';

import Box from '@/mauli/Box';
import Button from '@/mauli/Button';
import Stack from '@/mauli/Stack';

export default function Mauli() {
    return (
        <Box>
            <Stack direction="horizontal">
                <Button>Standard</Button>
                <Button disabled>Disabled</Button>
                <Button size="small">Small</Button>
                <Button size="small">
                    Icon
                    <Send />
                </Button>
                <Button variant="solid">Solid</Button>
                <Button variant="solid">
                    <Send />
                    Icon
                </Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="ghost" onClick={() => alert('test')}>
                    Alert
                </Button>
                <Button
                    as="a"
                    href="https://timoclasen.de"
                    target="_blank"
                    rel="noopener noreferrer">
                    Link
                </Button>
            </Stack>
        </Box>
    );
}
