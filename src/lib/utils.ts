/**
 * Returns a string representation of an error message.
 * @param error - The error object or message to be converted to a string.
 * @returns A string representation of the error message.
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  } else if (typeof error === "string") {
    return error;
  } else {
    return "Something went wrong";
  }
};

/**
 * Checks if the given message is a "NEXT_REDIRECT" error.
 * @param message - The error message to check.
 * @returns True if the message is a "NEXT_REDIRECT" error, false otherwise.
 */
export const isNextRedirectError = (message: string) =>
  message === "NEXT_REDIRECT";

/**
 * Checks if the given message is a 'NEXT_NOT_FOUND' error.
 * @param message - The error message to check.
 * @returns True if the message is a 'NEXT_NOT_FOUND' error, false otherwise.
 */
export const isNextNotFoundError = (message: string) =>
  message === "NEXT_NOT_FOUND";

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