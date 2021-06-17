import Image from 'next/image';
import { Music } from 'react-feather';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';

import { fetcher } from '../lib/fetcher';
import type { NowPlayingData } from '../pages/api/now-playing';

export function NowPlaying() {
    const { data, error } = useSWR<NowPlayingData>('/api/now-playing', fetcher);

    if (error) {
        return <div>Fehler beim Laden…</div>;
    }

    return (
        <section className="flex justify-center">
            <div className="w-full px-6 py-6 space-y-2 bg-dark dark:bg-light bg-opacity-10 dark:bg-opacity-10 rounded-3xl xl:px-12 xl:py-12 sm:w-auto">
                <div className="flex space-x-6">
                    {data && data.image ? (
                        <div className="flex-none">
                            <Image
                                className="rounded-2xl"
                                src={data.image}
                                quality={60}
                                alt={data.albumName}
                                layout="fixed"
                                width={100}
                                height={100}
                            />
                        </div>
                    ) : (
                        <div>
                            <div className="overflow-hidden leading-none rounded-2xl">
                                <Skeleton width="100px" height="100px" />
                            </div>
                        </div>
                    )}
                    <div className="overflow-hidden">
                        <a
                            href={data?.url}
                            target="_blank"
                            rel="noopener noreferrer">
                            <h2 className="mb-2 font-bold truncate text-md md:text-xl lg:text-2xl hover:text-[#1DB954]">
                                {data ? data.name : <Skeleton width="300px" />}
                            </h2>
                        </a>
                        <p className="mb-0.5 opacity-60 text-md md:text-lg lg:text-xl truncate">
                            {data ? (
                                data.artistName
                            ) : (
                                <Skeleton width="200px" />
                            )}
                        </p>
                        <p className="truncate opacity-60 text-md md:text-lg lg:text-xl">
                            {data ? data.albumName : <Skeleton width="200px" />}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center space-x-2 text-[#1DB954]">
                    {data ? (
                        <>
                            <Music size={16} />
                            <p className="text-base text-center">
                                {data?.isPlaying
                                    ? 'Höre ich gerade auf '
                                    : 'Habe ich zuletzt gehört auf '}
                                <a
                                    href="https://www.spotify.com"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Spotify
                                </a>
                            </p>
                        </>
                    ) : (
                        <Skeleton width="160px" height="16px" />
                    )}
                </div>
            </div>
        </section>
    );
}
