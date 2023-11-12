"use client";

import { useRef } from "react";
import toast from "react-hot-toast";
import { useAction } from "../../../lib/serverActions/client";
import { track } from "../../../lib/tracking";
import { Button } from "../../Button/Button";
import { turnOnBalcony } from "./actions";

export const BalconyButtons = () => {
  const emojiRef = useRef("");
  const toastIdRef = useRef("");
  const colorRef = useRef("");

  const { runAction, isRunning } = useAction(turnOnBalcony, {
    onSuccess: () => {
      toast.remove(toastIdRef.current);
      toast.success("Balkon wurde eingeschaltet!", {
        icon: emojiRef.current,
        duration: 5000,
      });
      track("Balcony Light Control", {
        color: `${emojiRef.current} ${colorRef.current}`,
      });
    },
    onError: () => {
      toast.remove(toastIdRef.current);
      toast.error("Hat nicht funktioniert.");
    },
  });

  const controlLight = async (
    color: "red" | "green" | "blue",
    emoji: string,
  ) => {
    const toastId = toast.loading("Schalten...");
    emojiRef.current = emoji;
    toastIdRef.current = toastId;
    colorRef.current = color;
    await runAction({
      color,
    });
  };

  return (
    <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <Button
        variant="ghost"
        size="small"
        onClick={() => controlLight("red", "🔥")}
        disabled={isRunning}
        fullWidth
      >
        🔥 Rot
      </Button>
      <Button
        variant="ghost"
        size="small"
        onClick={() => controlLight("green", "🌿")}
        disabled={isRunning}
        fullWidth
      >
        🌿 Grün
      </Button>
      <Button
        variant="ghost"
        size="small"
        onClick={() => controlLight("blue", "🌊")}
        disabled={isRunning}
        fullWidth
      >
        🌊 Blau
      </Button>
    </div>
  );
};
