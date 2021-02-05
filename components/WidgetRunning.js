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
        if (lastRun.distanceM >= distanceThreshold) {
            distanceLabels.push('longrun');
        }
        if (lastRun.distanceM >= thisYear.longest) {
            distanceLabels.push('yearbest');
        }
        return distanceLabels;
    }

    function speedLabels(thisYear, lastRun) {
        const speedLabels = [];
        const paceThreshold = 3.03; // 5:30 /km in m/s
        if (lastRun.speedMs > paceThreshold) {
            speedLabels.push('fast');
        }
        if (lastRun.avgSpeedMs >= thisYear.fastest) {
            speedLabels.push('yearbest');
        }
        return speedLabels;
    }

    function getPulseLabels(lastRun) {
        const pulseLabels = [];
        const heartrateThreshold = 160; // 160 bpm
        if (lastRun.heartrateBpm < heartrateThreshold) {
            pulseLabels.push('goodpulse');
        }
        if (lastRun.avgHeartrateBpm <= thisYear.lowest) {
            pulseLabels.push('yearbest');
        }
        return pulseLabels;
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
                        text={lastRun?.date}
                        href={lastRun?.url}
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={ArrowRight}
                        text={lastRun?.distance}
                        labels={lastRun && distanceLabels(thisYear, lastRun)}
                    />
                </li>
                <li>
                    <RunningElement
                        Icon={FastForward}
                        text={lastRun?.avgSpeed}
                        labels={lastRun && speedLabels(thisYear, lastRun)}
                    />
                </li>
                <li>
                    <RunningElement Icon={Clock} text={lastRun?.time} />
                </li>
                <li>
                    <RunningElement
                        Icon={Heart}
                        text={lastRun?.avgHeartrate}
                        labels={lastRun && getPulseLabels(lastRun)}
                    />
                </li>
            </ul>
        </div>
    );
}
