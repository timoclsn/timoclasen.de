import { AboutWidget } from "../../components/AboutWidget";
import { BlogWidget } from "../../components/BlogWidget";
import { LCDWidget } from "../../components/LCDWidget";
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
    </>
  );
};

export default HomePage;
