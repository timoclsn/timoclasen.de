import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function RunningElement({ Icon, text }) {
    return (
        <SkeletonTheme color="#8D8D8D" highlightColor="#B5B5B5">
            <div className={'flex items-center space-x-4 mb-4'}>
                {text ? (
                    <Icon size={24} />
                ) : (
                    <Skeleton circle={true} height={20} width={20} />
                )}
                <p>{text ? text : <Skeleton width={200} />}</p>
            </div>
        </SkeletonTheme>
    );
}
