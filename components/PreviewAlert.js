import { XCircle } from 'react-feather';

import CenteredColumn from '@/components/CenteredColumn';
import Button from '@/mauli/Button';

export default function PreviewAlert() {
    return (
        <div className="w-full bg-highlight dark:bg-highlight-dark text-light">
            <CenteredColumn>
                <div className="flex items-center justify-between py-4">
                    <p className="text-xl font-bold text-center uppercase md:text-3xl">
                        Vorschau
                    </p>
                    <Button variant="ghost" href="/api/exit-preview">
                        <XCircle />
                        Schließen
                    </Button>
                </div>
            </CenteredColumn>
        </div>
    );
}
