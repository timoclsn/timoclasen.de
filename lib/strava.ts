import { intervalToDuration, startOfYear } from 'date-fns';

import fetcher from '../lib/fetcher';

const {
    STRAVA_CLIENT_ID: clientID,
    STRAVA_CLIENT_SECRET: clientSecret,
    STRAVA_REFRESH_TOKEN: refreshToken
} = process.env;

export async function getActivities() {
    const timestamp = startOfYear(new Date()).getTime() / 1000;
    return await fetcher(
        `https://www.strava.com/api/v3/athlete/activities?per_page=200&after=${timestamp}&access_token=${await getAccessToken()}`
    );
}

async function getAccessToken() {
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
