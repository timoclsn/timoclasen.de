import type { NextApiRequest, NextApiResponse } from 'next';

import type { TopArtist } from '../../lib/spotify';
import { getTopArtists } from '../../lib/spotify';

interface Artist {
    name: string;
    image: string;
    genres: string[];
    url: string;
}

interface TopArtistsData {
    artists: Artist[];
}

export default async (
    _: NextApiRequest,
    res: NextApiResponse<TopArtistsData | string>
) => {
    const topArtists = await getTopArtists();

    const artists = topArtists.map((artist: TopArtist) => {
        const image =
            artist.images.find((image) => image.height === 640) ||
            artist.images[0];

        return {
            name: artist.name,
            image: image.url,
            genres: artist.genres,
            url: artist.external_urls.spotify
        };
    });

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=43200'
    );

    return res.status(200).json({
        artists
    });
};
