import { cache as reactCache } from "react";
import { getNowPlaying, getRecentlyPlayed } from "../lib/spotify";

export type NowPlayingData = Awaited<ReturnType<typeof getNowPlayingData>>;

const getNowPlayingData = async () => {
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

export const getNowPlayingDataCached = reactCache(getNowPlayingData);
