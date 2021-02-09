import { useTheme } from 'next-themes';
import useSWR from 'swr';

import WidgetImage from '@/components/WidgetImage';
import WidgetLayout from '@/components/WidgetLayout';
import WidgetRunning from '@/components/WidgetRunning';
import fetcher from '@/lib/fetcher';

export default function RunningWidget() {
    const { data, error } = useSWR('/api/running', fetcher);

    if (error) {
        return <div>Fehler beim Laden…</div>;
    }

    const { theme } = useTheme();

    return (
        <div id="running">
            <WidgetLayout
                FirstWidget={
                    <WidgetRunning
                        thisYear={data?.thisYear}
                        lastRun={data?.lastRun}
                    />
                }
                SecondWidget={
                    <WidgetImage
                        url={
                            theme === 'dark'
                                ? data?.lastRun?.map?.dark
                                : data?.lastRun?.map?.light
                        }
                        description="Kartenansicht des letzten Laufes von Timo"
                        unoptimized
                    />
                }
                separate
            />
        </div>
    );
}
