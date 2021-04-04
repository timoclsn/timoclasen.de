import Button from '@/components/Button';
import Box from '@/mauli/Box';
import Stack from '@/mauli/Stack';

export default function Mauli() {
    return (
        <Box inset={['small', 'medium', 'large']}>
            <Stack
                direction={['vertical', 'horizontal', 'vertical']}
                space={['small', 'medium', 'large']}>
                <Button text="Button 1" />
                <Button text="Button 2" />
            </Stack>
        </Box>
    );
}
