import { getActivities } from '@/lib/strava';

export default async (_, res) => {
    const activites = await getActivities();

    const distanceThisYear = activites.reduce((acc, activity) => {
        return acc + activity.distance / 1000;
    }, 0);

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=600, stale-while-revalidate=1200'
    );

    return res.status(200).json({
        distanceThisYear: `${Math.round(distanceThisYear)} km`
    });
};
