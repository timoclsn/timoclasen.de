"use client";

import { RunningData } from "../../../data/sports";
import { useTheme } from "../../ThemeContext";
import { WidgetImage } from "../../WidgetImage";

interface Props {
  runningData: RunningData;
}

export const RunningMapClient = ({ runningData }: Props) => {
  const { darkMode } = useTheme();

  const placeholderLight =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+vXTfwAJoAPddP66FgAAAABJRU5ErkJggg==";
  const placeholderDark =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU09X5DwACoAGIYYmEdwAAAABJRU5ErkJggg==";
  return (
    <WidgetImage
      url={
        darkMode ? runningData.lastRun.map.dark : runningData.lastRun.map.light
      }
      description="Kartenansicht des letzten Laufes von Timo"
      blurDataURL={darkMode ? placeholderDark : placeholderLight}
      unoptimized
    />
  );
};
