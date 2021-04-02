import { Send } from 'react-feather';

import Box from '@/mauli/Box';
import Button from '@/mauli/Button';
import Card from '@/mauli/Card';
import Container from '@/mauli/Container';
import Heading from '@/mauli/Heading';
import Stack from '@/mauli/Stack';
import Text from '@/mauli/Text';
import { darkTheme } from '@/mauli/stitches.config';

export default function Mauli() {
    return (
        <Box inset="medium" className={darkTheme}>
            <Stack>
                <Container>
                    <Stack align="center">
                        <Button>Standard</Button>
                        <Button disabled>Disabled</Button>
                        <Button size="small">Small</Button>
                        <Button size="small">
                            <span>Icon</span>
                            <Send />
                        </Button>
                        <Button variant="solid">Solid</Button>
                        <Button variant="solid">
                            <Send />
                            <span>Icon</span>
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
                </Container>
                <Card>
                    <Stack>
                        <Heading as="h2" size="large">
                            Heading
                        </Heading>
                        <Heading as="h2" size="medium">
                            Heading
                        </Heading>
                        <Heading as="h2" size="small">
                            Heading
                        </Heading>
                        <Text as="p" size="large">
                            Text
                        </Text>
                        <Text as="p" size="medium">
                            Text
                        </Text>
                        <Text as="p" size="small">
                            Text
                        </Text>
                    </Stack>
                </Card>
                <Stack
                    direction={{
                        '@initial': 'vertical',
                        '@bp1': 'horizontal'
                    }}>
                    <Card>
                        <Stack>
                            <Heading as="h3" size="small">
                                Heading
                            </Heading>
                            <Text as="p" variant="highlight">
                                Text
                            </Text>
                        </Stack>
                    </Card>
                    <Card variant="highlight">
                        <Stack>
                            <Heading as="h1" size="large">
                                Heading
                            </Heading>
                            <Text as="p">
                                Lorem ipsum dolor sit amet, consectetuer
                                adipiscing elit. Aenean commodo ligula eget
                                dolor. Aenean massa. Cum sociis natoque
                                penatibus et magnis dis parturient montes,
                                nascetur ridiculus mus. Donec quam felis,
                                ultricies nec, pellentesque eu, pretium quis,
                                sem. Nulla consequat massa quis enim. Donec pede
                                justo, fringilla vel, aliquet nec, vulputate
                                eget, arcu. In enim justo, rhoncus ut, imperdiet
                                a, venenatis vitae, justo. Nullam dictum felis
                                eu pede mollis pretium.
                            </Text>
                            <Button variant="ghost">Submit!</Button>
                        </Stack>
                    </Card>
                </Stack>
                <Container>
                    <Box>
                        <Stack>
                            <Heading>Überschrift</Heading>
                            <Text as="p">
                                Lorem ipsum dolor sit amet, consectetuer
                                adipiscing elit. Aenean commodo ligula eget
                                dolor. Aenean massa. Cum sociis natoque
                                penatibus et magnis dis parturient montes,
                                nascetur ridiculus mus. Donec quam felis,
                                ultricies nec, pellentesque eu, pretium quis,
                                sem. Nulla consequat massa quis enim. Donec pede
                                justo, fringilla vel, aliquet nec, vulputate
                                eget, arcu. In enim justo, rhoncus ut, imperdiet
                                a, venenatis vitae, justo. Nullam dictum felis
                                eu pede mollis pretium.
                            </Text>
                        </Stack>
                    </Box>
                </Container>
            </Stack>
        </Box>
    );
}
