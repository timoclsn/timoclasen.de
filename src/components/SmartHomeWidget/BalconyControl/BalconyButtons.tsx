"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { action } from "../../../api/action";
import { Button } from "../../../design-system/Button/Button";
import { useFormAction } from "../../../lib/data/client";
import { track } from "../../../lib/tracking";

const toastId = "balcony-buttons";
const colorEmojiMap = {
  red: "🔥",
  green: "🌿",
  blue: "🌊",
} as const;

export const BalconyButtons = () => {
  const { runAction, onSubmitClick } = useFormAction(
    action.smarthome.turnOnBalcony,
    {
      onRunAction: () => {
        toast.loading("Schalten...", {
          id: toastId,
          icon: undefined,
        });
      },
      onSuccess: (data) => {
        if (!data) return;
        const emoji = colorEmojiMap[data.color];
        toast.success("Balkon wurde eingeschaltet!", {
          id: toastId,
          icon: emoji,
          duration: 5000,
        });
        track("Balcony Light Control", {
          color: `${emoji} ${data.color}`,
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
    <div className="mb-4 flex flex-col gap-4 sm:flex-row">
      <form action={runAction}>
        <input type="hidden" name="color" value="red" />
        <BalconyButton onClick={onSubmitClick}>🔥 Rot</BalconyButton>
      </form>
      <form action={runAction}>
        <input type="hidden" name="color" value="green" />
        <BalconyButton onClick={onSubmitClick}>🌿 Grün</BalconyButton>
      </form>
      <form action={runAction}>
        <input type="hidden" name="color" value="blue" />
        <BalconyButton onClick={onSubmitClick}>🌊 Blau</BalconyButton>
      </form>
    </div>
  );
};

interface BalconyButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const BalconyButton = ({ children, onClick }: BalconyButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      onClick={onClick}
      variant="ghost"
      size="small"
      disabled={pending}
      fullWidth
    >
      {children}
    </Button>
  );
};
