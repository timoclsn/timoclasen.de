import querystring from 'querystring';

import { fetcher } from './fetcher';

const {
    SPOTIFY_CLIENT_ID: clientID,
    SPOTIFY_CLIENT_SECRET: clientSecret,
    SPOTIFY_REFRESH_TOKEN: refreshToken
} = process.env;

const basic = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');

async function getAccessToken(): Promise<string> {
    const accessData = await fetcher('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    });

    return accessData.access_token;
}

interface NowPlaying {
    timestamp: number;
    context: {
        external_urls: {
            spotify: string;
        };
        href: string;
        type: string;
        uri: string;
    };
    progress_ms: number;
    item: TopTrack | null;
    currently_playing_type: string;
    actions: { disallows: { resuming: boolean } };
    is_playing: boolean;
}

export async function getNowPlaying(): Promise<NowPlaying | null> {
    const access_token = await getAccessToken();

    const response = await fetch(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );

    if (response.status === 204 || response.status > 400) {
        return null;
    }

    const nowPlaying: NowPlaying = await response.json();

    return nowPlaying;
}

export interface TopArtist {
    external_urls: {
        spotify: string;
    };
    followers: { href: string | null; total: number };
    genres: string[];
    href: string;
    id: string;
    images: {
        height: number;
        url: string;
        width: number;
    }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export async function getTopArtists(): Promise<TopArtist[]> {
    const access_token = await getAccessToken();

    const data = await fetcher(
        'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=5',
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );

    return data.items;
}

export interface TopTrack {
    album: {
        album_type: string;
        artists: [
            {
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
            }
        ];
        available_markets: string[];
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        images: {
            height: number;
            url: string;
            width: number;
        }[];
        name: string;
        release_date: string;
        release_date_precision: string;
        total_tracks: number;
        type: string;
        uri: string;
    };
    artists: {
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: { isrc: string };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

export async function getTopTracks(): Promise<TopTrack[]> {
    const access_token = await getAccessToken();

    const data = await fetcher(
        'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=5',
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );

    return data.items;
}
