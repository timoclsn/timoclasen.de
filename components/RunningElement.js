import Skeleton from 'react-loading-skeleton';

export default function RunningElement({ Icon, text }) {
    return (
        <div className={'flex space-x-2 mb-4 content-center'}>
            {text ? (
                <Icon />
            ) : (
                <Skeleton circle={true} height={22} width={22} />
            )}
            <p>{text ? text : <Skeleton width={200} />}</p>
        </div>
    );
}
