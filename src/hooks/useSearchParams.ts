import {
  useSearchParams as useNextSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useTransition } from "react";

export const useSearchParams = () => {
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const nextSearchParams = useNextSearchParams();
  const searchParams = new URLSearchParams(nextSearchParams);

  interface Options {
    onStartTransition?: () => void;
  }

  const updateUrlWithSearchParams = ({ onStartTransition }: Options = {}) => {
    const searchParamsString = searchParams.toString();
    startTransition(() => {
      onStartTransition?.();

      replace(
        `${pathname}${searchParamsString ? "?" : ""}${searchParamsString}`,
        {
          scroll: false,
        },
      );
    });
  };

  return {
    searchParams,
    updateUrlWithSearchParams,
    isPending,
  };
};
