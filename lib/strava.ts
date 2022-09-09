import { intervalToDuration, startOfYear } from 'date-fns';
import ky from 'ky';
import { z } from 'zod';

import { fetcher } from './fetcher';

const {
  STRAVA_CLIENT_ID: clientID,
  STRAVA_CLIENT_SECRET: clientSecret,
  STRAVA_REFRESH_TOKEN: refreshToken,
} = process.env;

const accessDataSchema = z.object({
  access_token: z.string(),
});

async function getAccessToken() {
  const searchParams = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: clientID || '',
    client_secret: clientSecret || '',
    refresh_token: refreshToken || '',
  });

  const accessDataJson = await fetcher('https://www.strava.com/oauth/token', {
    method: 'POST',
    body: searchParams,
  });

  const accessData = accessDataSchema.parse(accessDataJson);
  return accessData.access_token;
}

const activitySchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  workout_type: z.number().optional().nullable(),
  start_date: z.string(),
  timezone: z.string(),
  distance: z.number(),
  moving_time: z.number(),
  average_speed: z.number(),
  average_heartrate: z.number(),
  map: z.object({
    summary_polyline: z.string().nullable(),
  }),
  kudos_count: z.number(),
});

export async function getActivities() {
  const timestamp = startOfYear(new Date()).getTime() / 1000;
  const accessToken = await getAccessToken();

  const activitiesResponse = await ky(
    `https://www.strava.com/api/v3/athlete/activities?per_page=200&after=${timestamp}&access_token=${accessToken}`
  );

  const activitiesJson = await activitiesResponse.json();

  return z.array(activitySchema).parse(activitiesJson);
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
  return `${duration.hours ? `${duration.hours}h ` : ''}${duration.minutes}m ${
    duration.seconds
  }s`;
}

export function roundDistance(distance: number) {
  return Math.round(distance * 100) / 100;
}
