import Skeleton from 'react-loading-skeleton';

export default function SmartHomeElement({ Icon, title, value }) {
    return (
        <div className="flex p-4 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-3xl">
            {value ? (
                <div className="flex items-center justify-center flex-none w-16 h-16 rounded-full bg-light dark:bg-dark">
                    <Icon size={36} />
                </div>
            ) : (
                <Skeleton circle={true} height={60} width={60} />
            )}

            <div className="flex flex-col justify-center pl-4">
                <h3 className="font-bold pb-0.5">
                    {value ? title : <Skeleton width={150} />}
                </h3>
                <p className="opacity-60">
                    {value ? value : <Skeleton width={75} />}
                </p>
            </div>
        </div>
    );
}
