import Skeleton from 'react-loading-skeleton';

export default function RunningElement({ Icon, text, href, labels, nowrap }) {
    return (
        <div className={'flex items-center space-x-4'}>
            <div className={'leading-none'}>
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
                <div className={'flex flex-wrap items-center'}>
                    {labels.map((label) => {
                        return (
                            <div
                                key={label.text}
                                className={
                                    'bg-highlight dark:bg-highlight-dark text-light rounded-full px-3 py-1 font-bold uppercase text-xs m-1'
                                }
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
