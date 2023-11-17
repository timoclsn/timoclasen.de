import { z } from 'zod';
import { createActionClient } from './server';

const createAction = createActionClient();

const action = createAction({
  input: z.string(),
  action: () => {},
});

// @ts-expect-error
action();
action('string');

const action2 = createAction({
  action: () => {},
});

action2();
// @ts-expect-error
action2('string');
