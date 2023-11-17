"use client";

import { ArrowDown, Loader2 } from "lucide-react";
import { Button } from "../../design-system/Button";
import { useSearchParams } from "../../hooks/useSearchParams";

export const ShowMoreButton = () => {
  const { searchParams, updateUrlLWithSearchParams, isPending } =
    useSearchParams();
  const limit = parseInt(searchParams.get("limit") ?? "") || 10;
  return (
    <Button
      size="small"
      onClick={() => {
        const newLimit = limit + 10;
        searchParams.set("limit", newLimit.toString());
        updateUrlLWithSearchParams();
      }}
      disabled={isPending}
    >
      {isPending && <Loader2 className="animate-spin" />}
      {!isPending && <ArrowDown />}
      Mehr anzeigen
    </Button>
  );
};
