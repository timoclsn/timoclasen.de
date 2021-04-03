import { useContext } from 'react';
import useSWR from 'swr';

import { ThemeContext } from '@/components/ThemeContext';
import WidgetImage from '@/components/WidgetImage';
import WidgetLayout from '@/components/WidgetLayout';
import WidgetRunning from '@/components/WidgetRunning';
import fetcher from '@/lib/fetcher';

export default function RunningWidget() {
    const { data, error } = useSWR('/api/running', fetcher);

    if (error) {
        return <div>Fehler beim Laden…</div>;
    }

    const { darkMode } = useContext(ThemeContext);

    return (
        <div id="running">
            <WidgetLayout separate>
                <WidgetRunning
                    thisYear={data?.thisYear}
                    lastRun={data?.lastRun}
                />
                <WidgetImage
                    url={
                        darkMode
                            ? data?.lastRun?.map?.dark
                            : data?.lastRun?.map?.light
                    }
                    description="Kartenansicht des letzten Laufes von Timo"
                    unoptimized
                />
            </WidgetLayout>
        </div>
    );
}
