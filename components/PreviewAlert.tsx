import { XCircle } from 'react-feather';

import { Button } from './Button';
import { CenteredColumn } from './CenteredColumn';

export function PreviewAlert() {
  return (
    <div className="w-full bg-highlight text-light dark:bg-highlight-dark">
      <CenteredColumn>
        <div className="flex items-center justify-between py-4">
          <p className="text-center text-xl font-bold uppercase md:text-3xl">
            Vorschau
          </p>
          <Button as="a" variant="ghost" href="/api/exit-preview">
            <XCircle />
            Schließen
          </Button>
        </div>
      </CenteredColumn>
    </div>
  );
}
