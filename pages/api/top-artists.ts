import type { NextApiRequest, NextApiResponse } from 'next';

import { getTopArtists } from '../../lib/spotify';

export interface Artist {
    name: string;
    image: string;
    genres: string[];
    url: string;
    followers: number;
}

export interface TopArtistsData {
    artists: Artist[];
}

export default async function topArtists(
    _: NextApiRequest,
    res: NextApiResponse<TopArtistsData>
) {
    const topArtists = await getTopArtists();

    const artists = topArtists.map((artist) => {
        const image = artist.images[0];

        return {
            name: artist.name,
            image: image.url,
            genres: artist.genres,
            url: artist.external_urls.spotify,
            followers: artist.followers.total
        };
    });

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=43200'
    );

    return res.status(200).json({
        artists
    });
}
