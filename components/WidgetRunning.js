import {
    ArrowRight,
    Calendar,
    Clock,
    FastForward,
    Heart,
    TrendingUp
} from 'react-feather';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import RunningElement from '@/components/RunningElement';

export default function WidgetRunning({ thisYear, lastRun }) {
    return (
        <SkeletonTheme color="#8D8D8D" highlightColor="#B5B5B5">
            <div className={'px-6 py-12 xl:px-12 xl:py-20'}>
                <h2
                    className={
                        'font-bold text-xl md:text-2xl lg:text-3xl mb-4'
                    }>
                    Laufen
                </h2>
                <RunningElement
                    Icon={TrendingUp}
                    text={
                        thisYear && `${thisYear.distance} von 1000 km in 2021`
                    }
                />

                <h3 className={'font-bold mb-4 mt-8'}>Letzter Lauf</h3>
                <RunningElement
                    Icon={Calendar}
                    text={lastRun && lastRun.date}
                />
                <RunningElement
                    Icon={ArrowRight}
                    text={lastRun && lastRun.distance}
                />
                <RunningElement
                    Icon={FastForward}
                    text={lastRun && lastRun.avgSpeed}
                />
                <RunningElement Icon={Clock} text={lastRun && lastRun.time} />
                <RunningElement
                    Icon={Heart}
                    text={lastRun && lastRun.avgHeartrate}
                />
            </div>
        </SkeletonTheme>
    );
}
