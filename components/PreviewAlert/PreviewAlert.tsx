import { XCircle } from "lucide-react";

import { Button } from "../../design-system/Button";
import { Container } from "../../design-system/Container/Container";

export function PreviewAlert() {
  return (
    <div className="w-full bg-highlight text-light dark:bg-highlight-dark">
      <Container>
        <div className="flex items-center justify-between py-4">
          <p className="text-center text-xl font-bold uppercase md:text-3xl">
            Vorschau
          </p>
          <Button as="a" variant="ghost" href="/api/exit-preview">
            <XCircle />
            Schließen
          </Button>
        </div>
      </Container>
    </div>
  );
}
