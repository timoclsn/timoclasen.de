import { FormActionResult } from "../types";

// Use FormActionResult because it is the more restricted type
export const initalState: FormActionResult<any, any> = {
  status: "initial",
  id: "",
  data: null,
  error: null,
  validationErrors: null,
};
