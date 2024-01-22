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

  const updateUrlWithSearchParams = () => {
    const searchParamsString = searchParams.toString();
    startTransition(() => {
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
