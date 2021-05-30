import { Icon } from 'react-feather';
import Skeleton from 'react-loading-skeleton';

interface Label {
    text: string;
    description: string;
}

interface Props {
    Icon: Icon;
    text?: string;
    href?: string;
    labels?: Label[];
    nowrap?: boolean;
}

export function RunningElement({ Icon, text, href, labels, nowrap }: Props) {
    return (
        <div className="flex items-center space-x-4">
            <div className="leading-none">
                {text ? (
                    <Icon size={22} />
                ) : (
                    <Skeleton circle={true} height={20} width={20} />
                )}
            </div>
            <p className={'my-2' + (nowrap ? ' whitespace-nowrap' : '')}>
                {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        {text}
                    </a>
                ) : (
                    text || <Skeleton width={200} />
                )}
            </p>
            {labels && (
                <div className="flex flex-wrap items-center">
                    {labels.map((label) => {
                        return (
                            <div
                                key={label.text}
                                className="px-3 py-1 m-1 text-xs font-bold uppercase rounded-full whitespace-nowrap bg-highlight dark:bg-highlight-dark text-light"
                                title={label.description}>
                                {label.text}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
