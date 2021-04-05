import { Twitter } from 'react-feather';

import Box from '@/mauli/Box';
import Button from '@/mauli/Button';
import Card from '@/mauli/Card';
import Heading from '@/mauli/Heading';
import Stack from '@/mauli/Stack';
import Text from '@/mauli/Text';

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
                <Stack direction="horizontal">
                    <Stack>
                        <Heading as="h1" size="large">
                            Heading 1
                        </Heading>
                        <Heading as="h2" size="medium">
                            Heading 2
                        </Heading>
                        <Heading as="h3" size="small">
                            Heading 3
                        </Heading>
                    </Stack>
                    <Stack>
                        <Text as="p" size="large">
                            Das ist ein Text
                        </Text>
                        <Text as="p" size="medium">
                            Das ist ein Text
                        </Text>
                        <Text as="p" size="small">
                            Das ist ein Text
                        </Text>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}
