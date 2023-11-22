import { Result } from "../types";

export const initalState: Result<any, any> = {
  status: "initial",
  isIdle: true,
  isSuccess: false,
  isError: false,
  data: null,
  error: null,
  validationErrors: null,
};
