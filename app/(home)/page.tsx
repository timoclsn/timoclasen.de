import { AboutWidget } from "../../components/AboutWidget";
import { BlogWidget } from "../../components/BlogWidget";
import { LCDWidget } from "../../components/LCDWidget";
import { PodcastsWidget } from "../../components/PodcastsWidget";
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
    </>
  );
};

export default HomePage;
