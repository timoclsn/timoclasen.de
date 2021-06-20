import type { NextApiRequest, NextApiResponse } from 'next';

import { getTopTracks } from '../../lib/spotify';

export interface Track {
    name: string;
    url: string;
    artistName: string;
    albumName: string;
    image: string;
}

export interface TopTrackData {
    tracks: Track[];
}

export default async function topTracks(
    _: NextApiRequest,
    res: NextApiResponse<TopTrackData>
) {
    const topTracks = await getTopTracks();

    const tracks = topTracks.map((track) => {
        const artist = track.artists[0];
        const image = track.album.images[0];

        return {
            name: track.name,
            url: track.external_urls.spotify,
            artistName: artist.name,
            albumName: track.album.name,
            image: image.url
        };
    });

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=43200'
    );

    return res.status(200).json({
        tracks
    });
}
