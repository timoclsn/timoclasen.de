import {
  getNowPlaying,
  getRecentlyPlayed,
  getTopArtists,
  getTopTracks,
} from "../../lib/spotify";
import { createQuery } from "../clients";

export type NowPlaying = Awaited<ReturnType<typeof nowPlaying>>;

export const nowPlaying = createQuery({
  cache: {
    noStore: true,
  },
  query: async () => {
    const nowPlaying = await getNowPlaying();

    if (nowPlaying === null || nowPlaying.item === null) {
      const recentlyPlayed = await getRecentlyPlayed();

      if (!recentlyPlayed) {
        throw new Error("Nothing playing and no recently played tracks");
      }

      const track = recentlyPlayed.track;
      const artist = track.artists[0];
      const image = track.album.images[0];

      return {
        isPlaying: false,
        name: track.name,
        url: track.external_urls.spotify,
        artistName: artist.name,
        albumName: track.album.name,
        image: image.url,
      };
    }

    const track = nowPlaying.item;
    const artist = track.artists[0];
    const image = track.album.images[0];

    return {
      isPlaying: nowPlaying.is_playing,
      name: track.name,
      url: track.external_urls.spotify,
      artistName: artist.name,
      albumName: track.album.name,
      image: image.url,
    };
  },
});

export const topArtists = createQuery({
  cache: {
    noStore: true,
  },
  query: async () => {
    const topArtists = await getTopArtists();

    const artists = topArtists.map((artist) => {
      const image = artist.images[0];

      return {
        name: artist.name,
        image: image.url,
        genres: artist.genres,
        url: artist.external_urls.spotify,
        followers: artist.followers.total,
      };
    });

    return artists;
  },
});

export const topTracks = createQuery({
  cache: {
    noStore: true,
  },
  query: async () => {
    const topTracks = await getTopTracks();

    const tracks = topTracks.map((track) => {
      const artist = track.artists[0];
      const image = track.album.images[0];

      return {
        name: track.name,
        url: track.external_urls.spotify,
        artistName: artist.name,
        albumName: track.album.name,
        image: image.url,
      };
    });

    return tracks;
  },
});
