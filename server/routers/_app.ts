import { router } from '../trpc';
import { musicRouter } from './music';
import { smarthomeRouter } from './smarthome';
import { sportsRouter } from './sports';

export const appRouter = router({
  sports: sportsRouter,
  smarthome: smarthomeRouter,
  music: musicRouter,
});

export type AppRouter = typeof appRouter;
