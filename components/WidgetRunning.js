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
            <RunningElement Icon={ArrowRight} text={lastRun?.distance} />
            <RunningElement Icon={FastForward} text={lastRun?.avgSpeed} />
            <RunningElement Icon={Clock} text={lastRun?.time} />
            <RunningElement Icon={Heart} text={lastRun?.avgHeartrate} />
        </div>
    );
}
