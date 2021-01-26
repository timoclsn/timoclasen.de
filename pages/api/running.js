import fetcher from '@/lib/fetcher';

const clientID = process.env.STRAVA_CLIENT_ID;
const clientSecret = process.env.STRAVA_CLIENT_SECRET;
const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

export default async (_, res) => {
    const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

    const accessData = await fetcher(callRefresh, {
        method: 'POST'
    });

    const data = await fetcher(callActivities + accessData.access_token);

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=600, stale-while-revalidate=1200'
    );

    return res.status(200).json(data);
};
