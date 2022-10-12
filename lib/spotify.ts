import { z } from 'zod';

import { fetcher } from './fetcher';

const envSchema = z.object({
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
  SPOTIFY_REFRESH_TOKEN: z.string(),
});

const {
  SPOTIFY_CLIENT_ID: clientID,
  SPOTIFY_CLIENT_SECRET: clientSecret,
  SPOTIFY_REFRESH_TOKEN: refreshToken,
} = envSchema.parse(process.env);

const basic = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');

const accessDataSchema = z.object({
  access_token: z.string(),
});

async function getAccessToken() {
  const searchParams = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const accessDataJson = await fetcher(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: searchParams.toString(),
    }
  );

  const accessData = accessDataSchema.parse(accessDataJson);

  return accessData.access_token;
}

const topArtistSchema = z.object({
  name: z.string(),
  external_urls: z.object({
    spotify: z.string().url(),
  }),
  genres: z.array(z.string()),
  images: z.array(
    z.object({
      url: z.string().url(),
    })
  ),
  followers: z.object({
    total: z.number(),
  }),
});

export async function getTopArtists() {
  const access_token = await getAccessToken();

  const responseJson = await fetcher(
    'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const response = z
    .object({
      items: z.array(topArtistSchema),
    })
    .parse(responseJson);

  return response.items;
}

const topTrackSchema = z.object({
  name: z.string(),
  external_urls: z.object({
    spotify: z.string().url(),
  }),
  album: z.object({
    name: z.string(),
    images: z.array(
      z.object({
        url: z.string().url(),
      })
    ),
  }),
  artists: z.array(
    z.object({
      name: z.string(),
    })
  ),
});

export async function getTopTracks() {
  const access_token = await getAccessToken();

  const responseJson = await fetcher(
    'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const response = z
    .object({
      items: topTrackSchema.array(),
    })
    .parse(responseJson);

  return response.items;
}

const nowPlayingSchema = z.object({
  context: z.object({
    external_urls: z.object({
      spotify: z.string().url(),
    }),
  }),
  item: topTrackSchema.nullable(),
  is_playing: z.boolean(),
});

export async function getNowPlaying() {
  const access_token = await getAccessToken();

  const response = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  const nowPlayingJson = await response.json();

  return nowPlayingSchema.parse(nowPlayingJson);
}

const recentlyPlayedSchema = z.object({
  track: topTrackSchema,
});

export async function getRecentlyPlayed() {
  const access_token = await getAccessToken();

  const responseJson = await fetcher(
    'https://api.spotify.com/v1/me/player/recently-played?limit=1',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const response = z
    .object({
      items: z.array(recentlyPlayedSchema),
    })
    .parse(responseJson);

  return response.items[0];
}
