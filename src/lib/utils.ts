/**
 * Wait for a specified amount of time.
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the specified time has elapsed.
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Capitalizes the first letter of a string.
 * @param string - The input string.
 * @returns The input string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Calculates the progress of the current year in percentage.
 * @returns {number} The progress of the current year in percentage.
 */
export const getYearProgress = () => {
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();

  const firstDayOfNextYear = new Date(
    new Date().getFullYear() + 1,
    0,
    1,
  ).getTime();
  const today = new Date().getTime();
  return Math.round(
    ((today - firstDayOfYear) / (firstDayOfNextYear - firstDayOfYear)) * 100,
  );
};
