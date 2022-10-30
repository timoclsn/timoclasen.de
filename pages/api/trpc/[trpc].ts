import * as trpcNext from '@trpc/server/adapters/next';

import { appRouter } from '../../../server/routers/_app';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
  responseMeta({ paths, errors }) {
    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    const allOk = errors.length === 0;
    if (allOk) {
      if (paths?.includes('sports.jogging')) {
        return {
          headers: {
            'cache-control': `s-maxage=3600, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
          },
        };
      }
    }
    return {};
  },
});
