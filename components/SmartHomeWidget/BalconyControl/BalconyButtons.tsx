"use client";

import toast from "react-hot-toast";
import { useAction } from "../../../lib/serverActions/client";
import { track } from "../../../lib/tracking";
import { Button } from "../../Button/Button";
import { turnOnBalcony } from "./actions";

const toastId = "balcony-buttons";
const colorEmojiMap = {
  red: "🔥",
  green: "🌿",
  blue: "🌊",
} as const;

export const BalconyButtons = () => {
  const { runAction, isRunning } = useAction(turnOnBalcony, {
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
    <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
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
