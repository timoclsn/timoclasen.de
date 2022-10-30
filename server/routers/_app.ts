import { router } from '../trpc';
import { sportsRouter } from './running';

export const appRouter = router({
  sports: sportsRouter,
});

export type AppRouter = typeof appRouter;
