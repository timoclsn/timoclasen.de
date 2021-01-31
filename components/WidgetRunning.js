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
    function isLong(distanceText) {
        if (!distanceText) {
            return false;
        }

        const distanceThreshold = 10;

        const distance = parseFloat(distanceText.split(' ')[0]);
        return distance >= distanceThreshold;
    }

    function isFast(speedText) {
        if (!speedText) {
            return false;
        }

        const paceThresholdMin = 5;
        const paceThresholdSec = 30;

        const pace = speedText.split(' ')[0];
        const min = parseInt(pace.split(':')[0]);
        const sec = parseInt(pace.split(':')[1]);

        if (min < paceThresholdMin) {
            return true;
        }

        if (min === paceThresholdMin) {
            if (sec < paceThresholdSec) {
                return true;
            }

            return false;
        }

        return false;
    }

    function isGoodPulse(heartrateText) {
        if (!heartrateText) {
            return false;
        }

        const heartrateThreshold = 160;

        const heartrate = parseInt(heartrateText.split(' ')[0]);
        return heartrate < heartrateThreshold;
    }

    return (
        <div className={'px-6 py-12 xl:px-12 xl:py-20'}>
            <h2 className={'font-bold text-xl md:text-2xl lg:text-3xl mb-4'}>
                Laufen
            </h2>
            <RunningElement
                Icon={TrendingUp}
                text={
                    thisYear &&
                    `${thisYear.distance} von 1000 km pro Jahr (${
                        thisYear.distance / (1000 / 100)
                    }%)`
                }
            />

            <h3 className={'font-bold mb-4 mt-8'}>Letzter Lauf</h3>
            <RunningElement
                Icon={Calendar}
                text={lastRun?.date}
                href={lastRun?.url}
            />
            <RunningElement
                Icon={ArrowRight}
                text={lastRun?.distance}
                label={isLong(lastRun?.distance) && 'longrun'}
            />
            <RunningElement
                Icon={FastForward}
                text={lastRun?.avgSpeed}
                label={isFast(lastRun?.avgSpeed) && 'fast'}
            />
            <RunningElement Icon={Clock} text={lastRun?.time} />
            <RunningElement
                Icon={Heart}
                text={lastRun?.avgHeartrate}
                label={isGoodPulse(lastRun?.avgHeartrate) && 'goodpulse'}
            />
        </div>
    );
}
