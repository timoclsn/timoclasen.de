import * as trpcNext from '@trpc/server/adapters/next';

import { appRouter } from '../../../server/routers/_app';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
  batching: {
    enabled: false,
  },
  responseMeta({ paths, errors, type }) {
    const allOk = errors.length === 0;
    const isQuery = type === 'query';

    if (allOk && isQuery) {
      if (paths?.some((path) => path === 'music.getNowPlaying')) {
        return {
          headers: {
            'cache-control': 's-maxage=60, stale-while-revalidate=30',
          },
        };
      }

      if (paths?.some((path) => path === 'smarthome.getSmarthome')) {
        return {
          headers: {
            'cache-control': 's-maxage=600, stale-while-revalidate=1200',
          },
        };
      }

      if (paths?.some((path) => path === 'sports.getRunning')) {
        return {
          headers: {
            'cache-control': 's-maxage=3600, stale-while-revalidate=86400',
          },
        };
      }

      if (
        paths?.some(
          (path) =>
            path === 'music.getTopArtists' || path === 'music.getTopArtists',
        )
      ) {
        return {
          headers: {
            'cache-control': 's-maxage=86400, stale-while-revalidate=43200',
          },
        };
      }
    }

    return {};
  },
});
