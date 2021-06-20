import type { NextApiRequest, NextApiResponse } from 'next';

import { getNowPlaying, getRecentlyPlayed } from '../../lib/spotify';

export interface NowPlayingData {
    isPlaying: boolean;
    name: string;
    url: string;
    artistName: string;
    albumName: string;
    image: string;
}

export default async function nowPlaying(
    _: NextApiRequest,
    res: NextApiResponse<NowPlayingData>
) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=30'
    );

    const nowPlaying = await getNowPlaying();

    if (nowPlaying === null || nowPlaying.item === null) {
        const recentlyPlayed = await getRecentlyPlayed();

        const track = recentlyPlayed.track;
        const artist = track.artists[0];
        const image = track.album.images[0];

        return res.status(200).json({
            isPlaying: false,
            name: track.name,
            url: track.external_urls.spotify,
            artistName: artist.name,
            albumName: track.album.name,
            image: image.url
        });
    }

    const track = nowPlaying.item;
    const artist = track.artists[0];
    const image = track.album.images[0];

    return res.status(200).json({
        isPlaying: nowPlaying.is_playing,
        name: track.name,
        url: track.external_urls.spotify,
        artistName: artist.name,
        albumName: track.album.name,
        image: image.url
    });
}
