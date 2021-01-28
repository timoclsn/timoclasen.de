import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

import {
    formatSpeed,
    formatTime,
    getActivities,
    roundDistance
} from '@/lib/strava';

export default async (_, res) => {
    const activites = await getActivities();

    const distanceThisYear = activites.reduce((acc, activity) => {
        return acc + activity.distance;
    }, 0);

    const lastRun = activites.reduce((lastRun, activity) => {
        if (!lastRun.start_date) {
            return activity;
        }

        return parseISO(activity.start_date).getTime() >
            parseISO(lastRun.start_date).getTime()
            ? activity
            : lastRun;
    }, {});

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=600, stale-while-revalidate=1200'
    );

    return res.status(200).json({
        thisYear: {
            distance: `${Math.round(distanceThisYear / 1000)} km`
        },
        lastRun: {
            distance: `${roundDistance(lastRun.distance / 1000)} km`,
            date: format(parseISO(lastRun.start_date), 'dd. MMMM yyyy', {
                locale: de
            }),
            time: formatTime(lastRun.moving_time),
            avgSpeed: formatSpeed(lastRun.average_speed),
            avgHeartrate: `${Math.round(lastRun.average_heartrate)} bpm`,
            map: lastRun.map.summary_polyline
        }
    });
};
