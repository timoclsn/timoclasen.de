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
  const searchParamsString = searchParams.toString();

  const getSearchParam = (key: string) => searchParams.get(key) ?? "";

  const setSearchParam = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  };

  const deleteSearchParam = (key: string) => searchParams.delete(key);

  const updateSearchParams = ({
    onStartTransition,
  }: {
    onStartTransition?: () => void;
  } = {}) => {
    const searchParamsString = searchParams.toString();
    startTransition(() => {
      onStartTransition?.();

      replace(
        `${pathname}${searchParamsString ? "?" + searchParamsString : ""}`,
        {
          scroll: false,
        },
      );
    });
  };

  return {
    searchParams,
    searchParamsString,
    getSearchParam,
    setSearchParam,
    deleteSearchParam,
    updateSearchParams,
    isPending,
  };
};
