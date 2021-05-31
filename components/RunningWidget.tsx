import { useContext } from 'react';
import useSWR from 'swr';

import { fetcher } from '../lib/fetcher';
import type { RunningData } from '../pages/api/running';
import { ThemeContext } from './ThemeContext';
import { WidgetImage } from './WidgetImage';
import { WidgetLayout } from './WidgetLayout';
import { WidgetRunning } from './WidgetRunning';

export function RunningWidget() {
    const { data, error } = useSWR<RunningData>('/api/running', fetcher);

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
