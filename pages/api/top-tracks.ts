import type { NextApiRequest, NextApiResponse } from 'next';

import type { TopTrack } from '../../lib/spotify';
import { getTopTracks } from '../../lib/spotify';

interface Track {
    name: string;
    url: string;
    artistName: string;
    albumName: string;
    image: string;
}

interface TopTrackData {
    tracks: Track[];
}

export default async (
    _: NextApiRequest,
    res: NextApiResponse<TopTrackData | string>
) => {
    const topTracks = await getTopTracks();

    const tracks = topTracks.map((track: TopTrack) => {
        const artist = track.artists[0];
        const image =
            track.album.images.find((image) => image.height === 640) ||
            track.album.images[0];
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
};
