import useSWR from 'swr';

import type { RunningData } from '../pages/api/running';
import { useTheme } from './ThemeContext';
import { WidgetImage } from './WidgetImage';
import { WidgetLayout } from './WidgetLayout';
import { WidgetRunning } from './WidgetRunning';

const apiSecret = process.env.NEXT_PUBLIC_API_SECRET ?? '';

const fetchObj = {
  headers: {
    'api-secret': apiSecret,
  },
};

export function RunningWidget() {
  const { data, error } = useSWR<RunningData>(['/api/running', fetchObj]);

  const { darkMode } = useTheme();

  if (error) {
    return <div>Fehler beim Laden…</div>;
  }

  const placeholderLight =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+vXTfwAJoAPddP66FgAAAABJRU5ErkJggg==';
  const placeholderDark =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU09X5DwACoAGIYYmEdwAAAABJRU5ErkJggg==';

  return (
    <div id="running">
      <WidgetLayout separate>
        <WidgetRunning thisYear={data?.thisYear} lastRun={data?.lastRun} />
        <WidgetImage
          url={darkMode ? data?.lastRun?.map?.dark : data?.lastRun?.map?.light}
          description="Kartenansicht des letzten Laufes von Timo"
          blurDataURL={darkMode ? placeholderDark : placeholderLight}
          unoptimized
        />
      </WidgetLayout>
    </div>
  );
}
