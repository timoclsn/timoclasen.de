"use client";

import toast from "react-hot-toast";
import { useAction } from "../../../lib/data/client/useAction";
import { track } from "../../../lib/tracking";
import { Button } from "../../../design-system/Button/Button";
import { action } from "../../../api/action";

const toastId = "balcony-buttons";
const colorEmojiMap = {
  red: "🔥",
  green: "🌿",
  blue: "🌊",
} as const;

export const BalconyButtons = () => {
  const { runAction, isRunning } = useAction(action.smarthome.turnOnBalcony, {
    onRunAction: () => {
      toast.loading("Schalten...", {
        id: toastId,
      });
    },
    onSuccess: (_, { color }) => {
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
      });
    },
  });

  return (
    <div className="mb-4 flex flex-col gap-4 sm:flex-row">
      <Button
        variant="ghost"
        size="small"
        onClick={() => runAction({ color: "red" })}
        disabled={isRunning}
        fullWidth
      >
        🔥 Rot
      </Button>
      <Button
        variant="ghost"
        size="small"
        onClick={() => runAction({ color: "green" })}
        disabled={isRunning}
        fullWidth
      >
        🌿 Grün
      </Button>
      <Button
        variant="ghost"
        size="small"
        onClick={() => runAction({ color: "blue" })}
        disabled={isRunning}
        fullWidth
      >
        🌊 Blau
      </Button>
    </div>
  );
};
