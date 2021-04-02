import { Send } from 'react-feather';

import Box from '@/mauli/Box';
import Button from '@/mauli/Button';
import Card from '@/mauli/Card';
import Heading from '@/mauli/Heading';
import Stack from '@/mauli/Stack';
import Text from '@/mauli/Text';
import { darkTheme } from '@/mauli/stitches.config';

export default function Mauli() {
    return (
        <Box inset="medium" className={darkTheme}>
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
                <Card>
                    <Heading as="h2">Heading</Heading>
                    <Text as="p">Test</Text>
                </Card>
                <Card>
                    <Heading as="h3" size="small">
                        Heading
                    </Heading>
                    <Text as="p" variant="highlight">
                        Test
                    </Text>
                </Card>
                <Card variant="highlight">
                    <Heading as="h1" size="large">
                        Heading
                    </Heading>
                    <Text as="p">Test</Text>
                </Card>
            </Stack>
        </Box>
    );
}
