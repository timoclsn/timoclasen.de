import { router } from '../trpc';
import { musicRouter } from './music';
import { sportsRouter } from './sports';
import { smarthomeRouter } from './smarthome';

export const appRouter = router({
  sports: sportsRouter,
  smarthome: smarthomeRouter,
  music: musicRouter,
});

export type AppRouter = typeof appRouter;
