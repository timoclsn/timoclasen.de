import { ContactWidget } from "../../components/ContactWidget";
import { NowPlaying } from "../../components/NowPlaying";
import { TextBlock } from "../../components/TextBlock";
import { TopMusic } from "../../components/TopMusic";
import { getMetadata, getTextSnippet } from "../../data/content";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";
import { markdownToHTML } from "../../lib/text";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await getMetadata("musik");

  return {
    title,
    description,
    openGraph: {
      ...openGraph(title, description, slug),
    },
  };
});

const MusicPage = async () => {
  const textSnippet = await getTextSnippet("Music");
  const musicText = await markdownToHTML(textSnippet);

  return (
    <>
      <TextBlock text={musicText} />
      <TopMusic />
      <NowPlaying />
      <ContactWidget />
    </>
  );
};

export default MusicPage;
