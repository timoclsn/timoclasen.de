import { z } from "zod";
import { createActionClient, createQueryClient } from "./server";

const createAction = createActionClient();

const action = createAction({
  input: z.string(),
  action: () => {},
});

// @ts-expect-error
action();
action("string");

const action2 = createAction({
  action: () => {},
});

action2();
// @ts-expect-error
action2("string");

const createQuery = createQueryClient();

const query = createQuery({
  input: z.string(),
  query: () => {},
});

// @ts-expect-error
query();
query("string");

const query2 = createQuery({
  query: () => {},
});

query2();
// @ts-expect-error
query2("string");
