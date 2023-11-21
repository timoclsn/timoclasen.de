import { Result } from "../types";

export const initalState: Result<any, any> = {
  status: "idle",
  isIdle: true,
  isSuccess: false,
  isError: false,
  data: null,
  error: null,
  validationErrors: null,
};
