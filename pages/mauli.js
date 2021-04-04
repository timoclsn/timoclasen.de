import Button from '@/components/Button';
import Box from '@/mauli/Box';
import Card from '@/mauli/Card';
import Stack from '@/mauli/Stack';

export default function Mauli() {
    return (
        <Box inset={['small', 'medium', 'large']}>
            <Stack className="w-full">
                <Stack
                    direction={['vertical', 'horizontal', 'vertical']}
                    space={['small', 'medium', 'large']}
                    className="w-full">
                    <Button text="Button 1" />
                    <Button text="Button 2" />
                </Stack>
                <Stack direction="horizontal" className="w-full">
                    <Card className="w-full">Card 1</Card>
                    <Card className="w-full">Card 2</Card>
                </Stack>
            </Stack>
        </Box>
    );
}
