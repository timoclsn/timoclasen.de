"use client";

import { Running } from "../../../data/sports/query";
import { useTheme } from "../../ThemeProvider/ThemeProvider";
import { ImageWidget } from "../../Widget/ImageWidget";

interface Props {
  runningData: Running;
}

export const RunningMapClient = ({ runningData }: Props) => {
  const { darkMode } = useTheme();

  const placeholderLight =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+vXTfwAJoAPddP66FgAAAABJRU5ErkJggg==";
  const placeholderDark =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU09X5DwACoAGIYYmEdwAAAABJRU5ErkJggg==";
  return (
    <ImageWidget
      url={
        darkMode ? runningData.lastRun.map.dark : runningData.lastRun.map.light
      }
      description="Kartenansicht des letzten Laufes von Timo"
      blurDataURL={darkMode ? placeholderDark : placeholderLight}
      unoptimized
    />
  );
};
