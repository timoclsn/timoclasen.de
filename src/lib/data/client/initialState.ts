import { Result } from "../types";

export const initalState: Result<any, any> = {
  status: "initial",
  id: "",
  data: null,
  error: null,
  validationErrors: null,
};
