import { unstable_noStore as noStore } from "next/cache";
import {
  getNowPlaying,
  getRecentlyPlayed,
  getTopArtists,
  getTopTracks,
} from "../../lib/spotify";

export type NowPlaying = Awaited<ReturnType<typeof nowPlaying>>;

export const nowPlaying = async () => {
  noStore();

  const nowPlaying = await getNowPlaying();

  if (nowPlaying === null || nowPlaying.item === null) {
    const recentlyPlayed = await getRecentlyPlayed();

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
};

export const topArtists = async () => {
  noStore();

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
};

export const topTracks = async () => {
  noStore();

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
};
