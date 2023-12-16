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
 * Generates a unique identifier based on the current timestamp.
 * @returns The generated identifier.
 */
export const id = () => new Date().getTime().toString();
