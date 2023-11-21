import { useFormState } from "react-dom";
import { z } from "zod";
import { ServerFormAction } from "../types";
import { initalState } from "./initialState";

export const useFormAction = <
  TInputSchema extends z.ZodTypeAny,
  TResponse extends any,
>(
  action: ServerFormAction<TInputSchema, TResponse>,
) => {
  const [state, formAction] = useFormState(action, initalState);

  return {
    runAction: formAction,
    ...state,
  };
};
