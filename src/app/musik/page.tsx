import { query } from "../../api/query";
import { ContactWidget } from "../../components/ContactWidget/ContactWidget";
import { NowPlaying } from "../../components/Music/NowPlaying";
import { TopMusic } from "../../components/Music/TopMusic";
import { Markdown } from "../../design-system/Markdown/Markdown";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";

export const generateMetadata = createGenerateMetadata(async () => {
  const { title, description, slug } = await query.content.getMetadata("musik");

  return {
    title,
    description,
    openGraph: {
      ...(await openGraph(title, description, slug)),
    },
  };
});

const MusicPage = async () => {
  const text = await query.content.getTextSnippet("Music");

  return (
    <>
      <Markdown>{text}</Markdown>
      <TopMusic />
      <NowPlaying />
      <ContactWidget />
    </>
  );
};

export default MusicPage;
