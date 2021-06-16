import { Music, User } from 'react-feather';
import useSWR from 'swr';

import { fetcher } from '../lib/fetcher';
import type { Artist, TopArtistsData } from '../pages/api/top-artists';
import type { TopTrackData, Track } from '../pages/api/top-tracks';
import { MediaPreview } from './MediaPreview';
import { Tabs, TabsList, TabsPanel, TabsTab } from './Tabs';

export function TopMusic() {
    const { data: topArtistsData, error: topArtistsError } =
        useSWR<TopArtistsData>('/api/top-artists', fetcher);

    const { data: topTracksData, error: topTracksError } = useSWR<TopTrackData>(
        '/api/top-tracks',
        fetcher
    );

    if (topArtistsError || topTracksError) {
        return <div>Fehler beim Laden…</div>;
    }

    const loadingState = (
        <>
            <MediaPreview />
            <MediaPreview />
            <MediaPreview />
            <MediaPreview />
            <MediaPreview />
        </>
    );

    return (
        <Tabs defaultValue="1">
            <TabsList aria-label="Meine Lieblingsmusik">
                <TabsTab value="1">Künstler:innen</TabsTab>
                <TabsTab value="2">Songs</TabsTab>
            </TabsList>
            <TabsPanel value="1">
                <ul className="space-y-20">
                    {topArtistsData
                        ? topArtistsData.artists.map(
                              (artist: Artist, index: number) => (
                                  <li key={index}>
                                      <MediaPreview
                                          title={artist.name}
                                          no={index + 1}
                                          image={artist.image}
                                          BylineIcon={Music}
                                          byline={artist.genres.join(', ')}
                                          subline={`Follower: ${artist.followers}`}
                                          url={artist.url}
                                      />
                                  </li>
                              )
                          )
                        : loadingState}
                </ul>
            </TabsPanel>
            <TabsPanel value="2">
                <ul className="space-y-20">
                    {topTracksData
                        ? topTracksData.tracks.map(
                              (track: Track, index: number) => (
                                  <li key={index}>
                                      <MediaPreview
                                          title={track.name}
                                          no={index + 1}
                                          image={track.image}
                                          BylineIcon={User}
                                          byline={track.artistName}
                                          subline={track.albumName}
                                          url={track.url}
                                      />
                                  </li>
                              )
                          )
                        : loadingState}
                </ul>
            </TabsPanel>
        </Tabs>
    );
}
