import Button from '@/components/Button';
import Box from '@/mauli/Box';
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
                    <Button text="Button 1" />
                    <Button text="Button 2" />
                </Stack>
                <Stack direction="horizontal" fullWidth>
                    <Card fullWidth>Card 1</Card>
                    <Card fullWidth>Card 2</Card>
                </Stack>
            </Stack>
        </Box>
    );
}
