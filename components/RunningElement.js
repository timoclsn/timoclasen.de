import Skeleton from 'react-loading-skeleton';

export default function RunningElement({ Icon, text }) {
    return (
        <div className={'flex items-center space-x-4 mb-4'}>
            <div className={'leading-none'}>
                {text ? (
                    <Icon size={22} />
                ) : (
                    <Skeleton circle={true} height={20} width={20} />
                )}
            </div>
            <p>{text || <Skeleton width={200} />}</p>
        </div>
    );
}
