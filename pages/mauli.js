import Button from '@/components/Button';
import Stack from '@/mauli/Stack';

export default function Mauli() {
    return (
        <div className="p-16">
            <Stack
                direction={['vertical', 'horizontal', 'vertical']}
                space={['small', 'medium', 'large']}>
                <Button text="Button 1" />
                <Button text="Button 2" />
            </Stack>
        </div>
    );
}
