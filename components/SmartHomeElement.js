import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function SmartHomeElement({ Icon, title, value }) {
    return (
        <SkeletonTheme color="#202020" highlightColor="#444">
            <div className={'flex'}>
                <div className={'flex flex-none justify-center items-center'}>
                    <Icon />
                </div>
                <div>
                    <div>{title}</div>
                    <div>{value || <Skeleton />}</div>
                </div>
            </div>
        </SkeletonTheme>
    );
}
