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
    function distanceLabels(thisYear, lastRun) {
        const distanceLabels = [];
        const distanceThreshold = 10000; // 10km
        if (lastRun.distance.raw >= distanceThreshold) {
            distanceLabels.push('longrun');
        }
        if (lastRun.distance.raw >= thisYear.longest) {
            distanceLabels.push('yearsbest');
        }
        return distanceLabels;
    }

    function speedLabels(thisYear, lastRun) {
        const speedLabels = [];
        const paceThreshold = 3.03; // 5:30 /km in m/s
        if (lastRun.avgSpeed.raw > paceThreshold) {
            speedLabels.push('fast');
        }
        if (lastRun.avgSpeed.raw >= thisYear.fastest) {
            speedLabels.push('yearsbest');
        }
        return speedLabels;
    }

    function getHeartrateLabels(thisYear, lastRun) {
        const heartrateLabels = [];
        const heartrateThreshold = 160; // 160 bpm
        if (lastRun.avgHeartrate.raw < heartrateThreshold) {
            heartrateLabels.push('goodpulse');
        }
        if (lastRun.avgHeartrate.raw <= thisYear.lowest) {
            heartrateLabels.push('yearsbest');
        }
        return heartrateLabels;
    }

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
                            `${thisYear.distance} von 1000 km pro Jahr (${
                                thisYear.distance / (1000 / 100)
                            }%)`
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
                        labels={lastRun && distanceLabels(thisYear, lastRun)}
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={FastForward}
                        text={lastRun?.avgSpeed?.formatted}
                        labels={lastRun && speedLabels(thisYear, lastRun)}
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={Clock}
                        text={lastRun?.time?.formatted}
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={Heart}
                        text={lastRun?.avgHeartrate?.formatted}
                        labels={
                            lastRun && getHeartrateLabels(thisYear, lastRun)
                        }
                    />
                </li>
            </ul>
        </div>
    );
}
