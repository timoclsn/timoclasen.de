import { Music, User } from "lucide-react";
import { Suspense } from "react";
import { query } from "../../api/query";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { MediaPreview } from "../MediaPreview/MediaPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs";
import { Track } from "../Track/Track";

export const TopMusic = () => {
  return (
    <Tabs defaultValue="1">
      <TabsList aria-label="Meine Lieblingsmusik">
        <TabsTrigger value="1">
          <Track
            as="span"
            className="inline-block h-full w-full"
            event="Tabs Control"
            data={{
              tab: "Artists",
            }}
          >
            Künstler:innen
          </Track>
        </TabsTrigger>
        <TabsTrigger value="2">
          <Track
            as="span"
            className="inline-block h-full w-full"
            event="Tabs Control"
            data={{
              tab: "Songs",
            }}
          >
            Songs
          </Track>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <TopArtists />
          </Suspense>
        </ErrorBoundary>
      </TabsContent>
      <TabsContent value="2">
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <TopTracks />
          </Suspense>
        </ErrorBoundary>
      </TabsContent>
    </Tabs>
  );
};

const TopArtists = async () => {
  const topArtists = await query.music.topArtists();
  return (
    <ul className="space-y-20">
      {topArtists.map((artist, index) => (
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
      ))}
    </ul>
  );
};

const TopTracks = async () => {
  const topTracks = await query.music.topTracks();
  return (
    <ul className="space-y-20">
      {topTracks.map((track, index) => (
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
      ))}
    </ul>
  );
};

const Loading = () => {
  return (
    <ul className="space-y-20">
      <MediaPreview />
      <MediaPreview />
      <MediaPreview />
      <MediaPreview />
      <MediaPreview />
    </ul>
  );
};

const Error = () => {
  return (
    <div className="flex items-center justify-center">Fehler beim Laden…</div>
  );
};
