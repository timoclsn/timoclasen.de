import { intervalToDuration, startOfYear } from 'date-fns';

import { fetcher } from '../lib/fetcher';

const {
    STRAVA_CLIENT_ID: clientID,
    STRAVA_CLIENT_SECRET: clientSecret,
    STRAVA_REFRESH_TOKEN: refreshToken
} = process.env;

export interface Activity {
    resource_state: number;
    athlete: { id: number; resource_state: number };
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    workout_type: string | null;
    id: number;
    external_id: string;
    upload_id: number;
    start_date: string;
    start_date_local: string;
    timezone: string;
    utc_offset: number;
    start_latlng: [number, number];
    end_latlng: [number, number];
    location_city: string | null;
    location_state: string | null;
    location_country: string | null;
    start_latitude: number;
    start_longitude: number;
    achievement_count: number;
    kudos_count: number;
    comment_count: number;
    athlete_count: number;
    photo_count: number;
    map: {
        id: string;
        summary_polyline: string;
        resource_state: number;
    };
    trainer: boolean;
    commute: boolean;
    manual: boolean;
    private: boolean;
    visibility: string;
    flagged: boolean;
    gear_id: string;
    from_accepted_tag: boolean;
    upload_id_str: string;
    average_speed: number;
    max_speed: number;
    has_heartrate: boolean;
    average_heartrate: number;
    max_heartrate: number;
    heartrate_opt_out: boolean;
    display_hide_heartrate_option: boolean;
    elev_high: number;
    elev_low: number;
    pr_count: number;
    total_photo_count: number;
    has_kudoed: boolean;
}

export async function getActivities(): Promise<Activity[]> {
    const timestamp = startOfYear(new Date()).getTime() / 1000;
    return await fetcher(
        `https://www.strava.com/api/v3/athlete/activities?per_page=200&after=${timestamp}&access_token=${await getAccessToken()}`
    );
}

async function getAccessToken(): Promise<string> {
    const accessData = await fetcher(
        `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
        {
            method: 'POST'
        }
    );

    return accessData.access_token;
}

export function formatSpeed(speedMs: number) {
    const speedKmh = speedMs * 3.6;
    const speedMinKm = 60 / speedKmh;
    const min = Math.floor(speedMinKm);
    const sec = Math.round((speedMinKm - Math.floor(speedMinKm)) * 60);
    return `${min}:${sec >= 10 ? sec : '0' + sec} /km`;
}

export function formatTime(timeS: number) {
    const timeMs = timeS * 1000;
    const duration = intervalToDuration({ start: 0, end: timeMs });
    return `${duration.hours ? `${duration.hours}h ` : ''}${
        duration.minutes
    }m ${duration.seconds}s`;
}

export function roundDistance(distance: number) {
    return Math.round(distance * 100) / 100;
}
