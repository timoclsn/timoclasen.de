import { Feather, XCircle } from "lucide-react";
import Link from "next/link";
import { Container } from "../../design-system/Container/Container";

export const DraftModeBanner = () => {
  return (
    <div className="w-full bg-highlight text-light dark:bg-highlight-dark">
      <Container>
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center justify-center gap-2 font-bold uppercase italic">
            <Feather size={18} />
            Draft Mode
          </div>
          <Link
            href="/api/draft-mode/disable"
            prefetch={false}
            className="hover:opacity-80"
          >
            <XCircle size={18} />
            <span className="sr-only">Disable draft mode</span>
          </Link>
        </div>
      </Container>
    </div>
  );
};
