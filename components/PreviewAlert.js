import { XCircle } from 'react-feather';

import Button from '@/components/Button';
import CenteredColumn from '@/components/CenteredColumn';

export default function PreviewAlert() {
    return (
        <div className="w-full bg-highlight dark:bg-highlight-dark text-light">
            <CenteredColumn>
                <div className="flex items-center justify-between py-4">
                    <p className="text-xl font-bold text-center uppercase md:text-3xl">
                        Vorschau
                    </p>
                    <Button
                        Icon={XCircle}
                        text="Schließen"
                        href="/api/exit-preview"
                        secondary
                    />
                </div>
            </CenteredColumn>
        </div>
    );
}
