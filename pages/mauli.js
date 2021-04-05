import { Twitter } from 'react-feather';

import Box from '@/mauli/Box';
import Button from '@/mauli/Button';
import Card from '@/mauli/Card';
import Stack from '@/mauli/Stack';

export default function Mauli() {
    return (
        <Box inset={['small', 'medium', 'large']}>
            <Stack fullWidth>
                <Stack
                    direction={['vertical', 'horizontal', 'vertical']}
                    space={['small', 'medium', 'large']}
                    fullWidth>
                    <Button variant="solid">Solid</Button>
                    <Button variant="solid" size="small">
                        Solid
                    </Button>
                    <Button variant="solid">
                        <Twitter />
                        Icon
                    </Button>
                    <Button variant="ghost" size="small">
                        <Twitter />
                        Icon
                    </Button>
                    <Button variant="solid" disabled>
                        Disabled
                    </Button>
                    <Button
                        as="a"
                        variant="solid"
                        href="https://timoclasen.de"
                        target="_blank"
                        rel="noopener noreferrer">
                        Link
                    </Button>
                    <Button variant="ghost">Ghost</Button>
                </Stack>
                <Stack direction="horizontal" fullWidth>
                    <Card fullWidth>Card 1</Card>
                    <Card fullWidth>Card 2</Card>
                </Stack>
            </Stack>
        </Box>
    );
}
