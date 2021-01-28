import { startOfYear } from 'date-fns';

import fetcher from '@/lib/fetcher';

const clientID = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

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

export function formatSpeed(speedMS) {
    const speedKmH = speedMS * 3.6;
    const speedMinKm = 60 / speedKmH;
    return `${Math.floor(speedMinKm)}:${Math.round(
        (speedMinKm - Math.floor(speedMinKm)) * 60
    )} /km`;
}

export function formatTime(timeS) {
    const timeMin = timeS / 60;
    return `${Math.floor(timeMin)}min ${Math.round(
        (timeMin - Math.floor(timeMin)) * 60
    )}s`;
}

export function roundDistance(distance) {
    return Math.round(distance * 100) / 100;
}
