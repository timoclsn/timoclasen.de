"use client";

import { ReactNode } from "react";
import toast from "react-hot-toast";
import { action } from "../../../api/action";
import { Button } from "../../../design-system/Button";
import { useFormAction } from "../../../lib/data/client";
import { track } from "../../../lib/tracking";

const toastId = "balcony-buttons";
const colorEmojiMap = {
  red: "🔥",
  green: "🌿",
  blue: "🌊",
} as const;

interface Props {
  children: ReactNode;
  color: keyof typeof colorEmojiMap;
}

export const BalconyButton = ({ children, color }: Props) => {
  const { action: turnOnBalconyAction, isRunning } = useFormAction(
    action.smarthome.turnOnBalcony,
    {
      onRunAction: () => {
        toast.loading("Schalten...", {
          id: toastId,
          icon: undefined,
        });
      },
      onSuccess: () => {
        const emoji = colorEmojiMap[color];
        toast.success("Balkon wurde eingeschaltet!", {
          id: toastId,
          icon: emoji,
          duration: 5000,
        });
        track("Balcony Light Control", {
          color: `${emoji} ${color}`,
        });
      },
      onError: () => {
        toast.error("Hat nicht funktioniert.", {
          id: toastId,
          icon: undefined,
        });
      },
    },
  );

  return (
    <form action={turnOnBalconyAction} className="w-full">
      <input type="hidden" name="color" value={color} />
      <Button
        type="submit"
        variant="ghost"
        size="small"
        disabled={isRunning}
        fullWidth
      >
        {children}
      </Button>
    </form>
  );
};
