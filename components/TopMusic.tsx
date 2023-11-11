import { Music, User } from "react-feather";

import { trpc } from "../utils/trpc";
import { MediaPreview } from "./MediaPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import { track } from "../lib/tracking";

export function TopMusic() {
  const { data: topArtistsData, error: topArtistsError } =
    trpc.music.topArtists.useQuery();

  const { data: topTracksData, error: topTracksError } =
    trpc.music.topTracks.useQuery();

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
            track("Tabs Control", {
              tab: "Artists",
            });
          }}
        >
          Künstler:innen
        </TabsTrigger>
        <TabsTrigger
          value="2"
          onClick={() => {
            track("Tabs Control", {
              tab: "Songs",
            });
          }}
        >
          Songs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <ul className="space-y-20">
          {topArtistsData
            ? topArtistsData.artists.map((artist, index: number) => (
                <li key={index}>
                  <MediaPreview
                    title={artist.name}
                    no={index + 1}
                    image={artist.image}
                    BylineIcon={Music}
                    byline={artist.genres.join(", ")}
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
            ? topTracksData.tracks.map((track, index: number) => (
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
