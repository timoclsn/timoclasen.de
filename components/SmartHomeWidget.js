import { User } from 'react-feather';
import useSWR from 'swr';

import SmartHomeElement from '@/components/SmartHomeElement';
import WidgetLayout from '@/components/WidgetLayout';
import fetcher from '@/lib/fetcher';

export default function SmartHomeWidget() {
    const { data } = useSWR('/api/homee', fetcher);

    const firstWidget = (
        <div>
            <SmartHomeElement
                Icon={User}
                title="Temparatur"
                value={data?.temperature}
            />
            <SmartHomeElement
                Icon={User}
                title="Luftfeuchtigkeit"
                value={data?.humidity}
            />
            <SmartHomeElement
                Icon={User}
                title="Energieverbrauch"
                value={data?.energy}
            />
        </div>
    );
    const secondWidget = (
        <div>
            <SmartHomeElement
                Icon={User}
                title="Lichter"
                value={data?.lights}
            />
            <SmartHomeElement
                Icon={User}
                title="Außentemperatur"
                value={data?.outsideTemperature}
            />
            <SmartHomeElement Icon={User} title="Regen" value={data?.rain} />
        </div>
    );

    return (
        <WidgetLayout FirstWidget={firstWidget} SecondWidget={secondWidget} />
    );
}
