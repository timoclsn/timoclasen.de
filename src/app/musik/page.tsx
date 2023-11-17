import { ContactWidget } from "../../components/ContactWidget/ContactWidget";
import { TopMusic } from "../../components/Music/TopMusic";
import { getMetadata, getTextSnippet } from "../../data/content";
import { Markdown } from "../../design-system/Markdown/Markdown";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("musik");

  return {
    title,
    description,
    openGraph: {
      ...(await openGraph(title, description, slug)),
    },
  };
});

const MusicPage = async () => {
  const text = await getTextSnippet("Music");

  return (
    <>
      <Markdown>{text}</Markdown>
      <TopMusic />
      {/* <NowPlaying /> */}
      <ContactWidget />
    </>
  );
};

export default MusicPage;
