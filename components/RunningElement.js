import Skeleton from 'react-loading-skeleton';

export default function RunningElement({ Icon, text, href, labels }) {
    return (
        <div className={'flex items-center space-x-4 mb-4'}>
            <div className={'leading-none'}>
                {text ? (
                    <Icon size={22} />
                ) : (
                    <Skeleton circle={true} height={20} width={20} />
                )}
            </div>
            <p>
                {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        {text}
                    </a>
                ) : (
                    text || <Skeleton width={200} />
                )}
            </p>
            {labels?.map((label) => {
                return (
                    <div
                        key={label}
                        className={
                            'bg-highlight dark:bg-highlight-dark text-light rounded-full px-3 py-1 font-bold uppercase text-xs'
                        }>
                        {label}
                    </div>
                );
            })}
        </div>
    );
}
