import { formatRelative, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import { utcToZonedTime } from 'date-fns-tz';

import { getMapURL } from '@/lib/mapbox';
import {
    formatSpeed,
    formatTime,
    getActivities,
    roundDistance
} from '@/lib/strava';

export default async (_, res) => {
    const activites = await getActivities();
    const runs = activites.filter((activity) => activity.type === 'Run');

    const {
        distance: distanceThisYear,
        fastest: fastestThisYear,
        longest: longestThisYear,
        lowest: lowestThisYear
    } = runs.reduce(
        (thisYear, activity) => {
            return {
                distance: thisYear.distance + activity.distance,
                fastest:
                    activity.average_speed > thisYear.fastest
                        ? activity.average_speed
                        : thisYear.fastest,
                longest:
                    activity.distance > thisYear.longest
                        ? activity.distance
                        : thisYear.longest,
                lowest:
                    activity.average_heartrate < thisYear.lowest
                        ? activity.average_heartrate
                        : thisYear.lowest
            };
        },
        {
            distance: 0,
            fastest: 0,
            longest: 0,
            lowest: 1000
        }
    );

    const lastRun = runs.reduce((lastRun, activity) => {
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
        'public, s-maxage=3600, stale-while-revalidate=86400'
    );

    return res.status(200).json({
        thisYear: {
            distance: Math.round(distanceThisYear / 1000),
            fastest: fastestThisYear,
            longest: longestThisYear,
            lowest: lowestThisYear
        },
        lastRun: {
            distance: `${roundDistance(lastRun.distance / 1000)} km`,
            distanceM: lastRun.distance,
            date: capitalizeFirstLetter(
                formatRelative(
                    utcToZonedTime(
                        parseISO(lastRun.start_date),
                        lastRun.timezone.split(' ')[1]
                    ),
                    utcToZonedTime(new Date(), lastRun.timezone.split(' ')[1]),
                    {
                        locale: de,
                        weekStartsOn: 1 // Monday
                    }
                )
            ),
            time: formatTime(lastRun.moving_time),
            avgSpeed: formatSpeed(lastRun.average_speed),
            avgSpeedMs: lastRun.average_speed,
            avgHeartrate: `${Math.round(lastRun.average_heartrate)} bpm`,
            avgHeartrateBpm: lastRun.average_heartrate,
            map: {
                light: getMapURL(lastRun.map.summary_polyline, false),
                dark: getMapURL(lastRun.map.summary_polyline, true)
            },
            url: `https://www.strava.com/activities/${lastRun.id}`
        }
    });
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
