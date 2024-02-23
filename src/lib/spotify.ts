import { z } from "zod";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
  process.env;

const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
).toString("base64");

const accessDataSchema = z.object({
  access_token: z.string(),
});

async function getAccessToken() {
  const searchParams = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: SPOTIFY_REFRESH_TOKEN,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: searchParams.toString(),
  });

  const data = await res.json();
  const accessData = accessDataSchema.parse(data);
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
    }),
  ),
  followers: z.object({
    total: z.number(),
  }),
});

export async function getTopArtists() {
  const access_token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const data = await res.json();

  const response = z
    .object({
      items: z.array(topArtistSchema),
    })
    .parse(data);

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
      }),
    ),
  }),
  artists: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

export async function getTopTracks() {
  const access_token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const data = await res.json();

  const response = z
    .object({
      items: topTrackSchema.array(),
    })
    .parse(data);

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

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  if (res.status === 204 || res.status > 400) {
    return null;
  }

  const data = await res.json();

  return nowPlayingSchema.parse(data);
}

const recentlyPlayedSchema = z.object({
  track: topTrackSchema,
});

export async function getRecentlyPlayed() {
  const access_token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const data = await res.json();

  const response = z
    .object({
      items: z.array(recentlyPlayedSchema),
    })
    .parse(data);

  return response.items[0];
}
