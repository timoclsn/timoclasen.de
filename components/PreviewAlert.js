import CenteredColumn from './CenteredColumn';
import Button from './Button';
import { XCircle } from 'react-feather';

export default function PreviewAlert() {
    return (
        <div
            className={'w-full bg-highlight dark:bg-highlight-dark text-light'}>
            <CenteredColumn>
                <div className={'py-4 flex items-center justify-between'}>
                    <p
                        className={
                            'font-bold text-xl md:text-3xl uppercase text-center'
                        }>
                        Vorschau
                    </p>
                    <div className={'min-w-1/5'}>
                        <Button
                            Icon={XCircle}
                            text="Schließen"
                            href="/api/exit-preview"
                            secondary
                        />
                    </div>
                </div>
            </CenteredColumn>
        </div>
    );
}
