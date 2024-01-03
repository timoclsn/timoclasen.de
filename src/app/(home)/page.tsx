import { AboutWidget } from "../../components/AboutWidget/AboutWidget";
import { BlogWidget } from "../../components/BlogWidget/BlogWidget";
import { ContactWidget } from "../../components/ContactWidget/ContactWidget";
import { LCDWidget } from "../../components/LCDWidget/LCDWidget";
import { MLWidget } from "../../components/MLWidget/MLWidget";
import { NowPlaying } from "../../components/Music/NowPlaying";
import { PhotographyWidget } from "../../components/PhotographyWidget/PhotographyWidget";
import { PodcastsWidget } from "../../components/PodcastsWidget/PodcastsWidget";
import { RunningWidget } from "../../components/RunningWidget/RunningWidget";
import { SmartHomeWidget } from "../../components/SmartHomeWidget/SmartHomeWidget";
import { Teaser } from "../../components/Teaser/Teaser";

const HomePage = () => {
  return (
    <>
      <Teaser />
      <AboutWidget />
      <BlogWidget />
      <LCDWidget />
      <SmartHomeWidget />
      <RunningWidget />
      <PodcastsWidget />
      <MLWidget />
      <PhotographyWidget />
      <NowPlaying />
      <ContactWidget />
    </>
  );
};

export default HomePage;
