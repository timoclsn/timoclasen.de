import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function SmartHomeElement({ Icon, title, value }) {
    return (
        <SkeletonTheme color="#202020" highlightColor="#444">
            <div
                className={
                    'flex p-4 bg-dark dark:bg-light bg-opacity-10 rounded-3xl'
                }>
                <div className={'flex flex-none justify-center items-center'}>
                    {value ? (
                        <Icon size={40} />
                    ) : (
                        <Skeleton circle={true} height={40} width={40} />
                    )}
                </div>
                <div className={'pl-4'}>
                    <h3 className={'font-bold'}>
                        {value ? title : <Skeleton width={200} />}
                    </h3>
                    <p>{value ? value : <Skeleton width={100} />}</p>
                </div>
            </div>
        </SkeletonTheme>
    );
}
