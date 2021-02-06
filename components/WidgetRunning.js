import {
    ArrowRight,
    Calendar,
    Clock,
    FastForward,
    Heart,
    TrendingUp
} from 'react-feather';

import RunningElement from '@/components/RunningElement';

export default function WidgetRunning({ thisYear, lastRun }) {
    const distanceThreshold = 10000; // 10km
    const speedThreshold = 3.03; // ca. 5:30 /km in m/s
    const timeThreshold = 3600; // 1h
    const heartrateThreshold = 160; // 160 bpm
    const yearsBestLabel = 'best';

    const distanceLabels = [
        ...(lastRun?.distance?.raw >= distanceThreshold ? ['far'] : []),
        ...(lastRun?.distance?.raw >= thisYear?.farthest
            ? [yearsBestLabel]
            : [])
    ];

    const speedLabels = [
        ...(lastRun?.avgSpeed?.raw > speedThreshold ? ['fast'] : []),
        ...(lastRun?.avgSpeed?.raw >= thisYear?.fastest ? [yearsBestLabel] : [])
    ];

    const timeLabels = [
        ...(lastRun?.time?.raw >= timeThreshold ? ['long'] : []),
        ...(lastRun?.time?.raw >= thisYear?.longest ? [yearsBestLabel] : [])
    ];

    const heartrateLabels = [
        ...(lastRun?.avgHeartrate?.raw < heartrateThreshold ? ['low'] : []),
        ...(lastRun?.avgHeartrate?.raw <= thisYear?.lowest
            ? [yearsBestLabel]
            : [])
    ];

    return (
        <div className={'px-6 py-12 xl:px-12 xl:py-20'}>
            <h2 className={'font-bold text-xl md:text-2xl lg:text-3xl mb-4'}>
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
                            thisYear && [`${thisYear.distance / (1000 / 100)}%`]
                        }
                    />
                </li>
            </ul>
            <h3 className={'font-bold mb-4 mt-8'}>Letzter Lauf</h3>
            <ul>
                <li>
                    <RunningElement
                        Icon={Calendar}
                        text={lastRun?.date?.relative}
                        href={lastRun?.url}
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={ArrowRight}
                        text={lastRun?.distance?.formatted}
                        labels={distanceLabels}
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={FastForward}
                        text={lastRun?.avgSpeed?.formatted}
                        labels={speedLabels}
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={Clock}
                        text={lastRun?.time?.formatted}
                        labels={timeLabels}
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={Heart}
                        text={lastRun?.avgHeartrate?.formatted}
                        labels={heartrateLabels}
                    />
                </li>
            </ul>
        </div>
    );
}
