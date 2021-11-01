import { Music, User } from 'react-feather';
import useSWR from 'swr';

import type { Artist, TopArtistsData } from '../pages/api/top-artists';
import type { TopTrackData, Track } from '../pages/api/top-tracks';
import { MediaPreview } from './MediaPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const apiSecret = process.env.NEXT_PUBLIC_API_SECRET || '';

const fetchObj = {
  headers: {
    'api-secret': apiSecret,
  },
};

export function TopMusic() {
  const { data: topArtistsData, error: topArtistsError } =
    useSWR<TopArtistsData>(['/api/top-artists', fetchObj]);

  const { data: topTracksData, error: topTracksError } = useSWR<TopTrackData>([
    '/api/top-tracks',
    fetchObj,
  ]);

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
        <TabsTrigger
          value="1"
          onClick={() => {
            splitbee.track('Tabs Control', {
              tab: 'Artists',
            });
          }}
        >
          Künstler:innen
        </TabsTrigger>
        <TabsTrigger
          value="2"
          onClick={() => {
            splitbee.track('Tabs Control', {
              tab: 'Songs',
            });
          }}
        >
          Songs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <ul className="space-y-20">
          {topArtistsData
            ? topArtistsData.artists.map((artist: Artist, index: number) => (
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
              ))
            : loadingState}
        </ul>
      </TabsContent>
      <TabsContent value="2">
        <ul className="space-y-20">
          {topTracksData
            ? topTracksData.tracks.map((track: Track, index: number) => (
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
              ))
            : loadingState}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
