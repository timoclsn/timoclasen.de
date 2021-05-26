import {
    ArrowRight,
    Calendar,
    Clock,
    FastForward,
    Heart,
    ThumbsUp,
    TrendingUp
} from 'react-feather';

import { LastRun, ThisYear } from '../pages/api/running';
import RunningElement from './RunningElement';
interface Props {
    thisYear?: ThisYear;
    lastRun?: LastRun;
}

export default function WidgetRunning({ thisYear, lastRun }: Props) {
    const distanceThreshold = 10000; // 10km in m
    const speedThreshold = 3.03; // ca. 5:30 /km in m/s
    const timeThreshold = 3600; // 1h in s
    const heartrateThreshold = 160; // 160 bpm in bpm
    const yearsBestLabel = {
        text: 'best',
        description: 'Bester Wert des Jahres in dieser Kategorie'
    };

    const distanceLabels = [
        ...(lastRun && lastRun.distance.raw >= distanceThreshold
            ? [{ text: 'far', description: 'Strecke von 10 km oder mehr' }]
            : []),
        ...(lastRun && thisYear && lastRun.distance.raw >= thisYear.farthest
            ? [yearsBestLabel]
            : [])
    ];

    const speedLabels = [
        ...(lastRun && lastRun.avgSpeed.raw > speedThreshold
            ? [
                  {
                      text: 'fast',
                      description: 'Geschwindigkeit schneller als 5:30 /km'
                  }
              ]
            : []),
        ...(lastRun && thisYear && lastRun.avgSpeed?.raw >= thisYear.fastest
            ? [yearsBestLabel]
            : [])
    ];

    const timeLabels = [
        ...(lastRun && lastRun.time.raw >= timeThreshold
            ? [
                  {
                      text: 'long',
                      description: 'Laufzeit von über einer Stunde'
                  }
              ]
            : []),
        ...(lastRun && thisYear && lastRun.time.raw >= thisYear.longest
            ? [yearsBestLabel]
            : [])
    ];

    const heartrateLabels = [
        ...(lastRun && lastRun.avgHeartrate?.raw < heartrateThreshold
            ? [{ text: 'low', description: 'Puls von unter 160 bpm' }]
            : []),
        ...(lastRun && thisYear && lastRun.avgHeartrate?.raw <= thisYear.lowest
            ? [yearsBestLabel]
            : [])
    ];

    return (
        <div className="px-6 py-12 xl:px-12 xl:py-20">
            <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
                Laufen
            </h2>
            <ul>
                <li>
                    <RunningElement
                        Icon={TrendingUp}
                        text={
                            thisYear &&
                            `${thisYear.distance} von 1000 km pro Jahr`
                        }
                        labels={
                            thisYear && [
                                {
                                    text: `${
                                        thisYear.distance / (1000 / 100)
                                    }%`,
                                    description: 'Jahresziel'
                                }
                            ]
                        }
                    />
                </li>
            </ul>
            <div className="flex justify-between mt-8 mb-2">
                <h3 className="font-bold">Letzter Lauf</h3>
                {lastRun && lastRun.kudos > 0 && (
                    <div
                        className="flex items-center space-x-1 opacity-60"
                        title={`${lastRun.kudos} Kudos für diesen Lauf auf Strava`}>
                        <ThumbsUp size={18} />
                        <span className="text-md">{lastRun.kudos}</span>
                    </div>
                )}
            </div>
            <ul>
                <li>
                    <RunningElement
                        Icon={Calendar}
                        text={lastRun?.date?.relative}
                        href={lastRun?.url}
                        nowrap
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={ArrowRight}
                        text={lastRun?.distance?.formatted}
                        labels={distanceLabels}
                        nowrap
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={FastForward}
                        text={lastRun?.avgSpeed?.formatted}
                        labels={speedLabels}
                        nowrap
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={Clock}
                        text={lastRun?.time?.formatted}
                        labels={timeLabels}
                        nowrap
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={Heart}
                        text={lastRun?.avgHeartrate?.formatted}
                        labels={heartrateLabels}
                        nowrap
                    />
                </li>
            </ul>
        </div>
    );
}
