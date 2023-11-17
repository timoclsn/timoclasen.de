import { AboutWidget } from "../../components/AboutWidget/AboutWidget";
import { BlogWidget } from "../../components/BlogWidget/BlogWidget";
import { ContactWidget } from "../../components/ContactWidget/ContactWidget";
import { LCDWidget } from "../../components/LCDWidget/LCDWidget";
import { MLWidget } from "../../components/MLWidget/MLWidget";
import { PodcastsWidget } from "../../components/PodcastsWidget/PodcastsWidget";
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
      {/* <RunningWidget /> */}
      <PodcastsWidget />
      <MLWidget />
      {/* <NowPlaying /> */}
      <ContactWidget />
    </>
  );
};

export default HomePage;
