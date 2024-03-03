"use client";

import { ArrowDown, Loader2 } from "lucide-react";
import { Button } from "../../design-system/Button";
import { useSearchParams } from "../../hooks/useSearchParams";

export const ShowMoreButton = () => {
  const { getSearchParam, setSearchParam, updateSearchParams, isPending } =
    useSearchParams();
  const limit = parseInt(getSearchParam("limit")) || 10;
  return (
    <Button
      size="small"
      onClick={() => {
        const newLimit = limit + 10;
        setSearchParam("limit", newLimit.toString());
        updateSearchParams();
      }}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin" /> : <ArrowDown />}
      Mehr anzeigen
    </Button>
  );
};
