import { ContactWidget } from "../../components/ContactWidget";
import { MDXContent } from "../../components/MDXContent/MDXContent";
import { NowPlaying } from "../../components/NowPlaying";
import { TopMusic } from "../../components/TopMusic";
import { getMetadata, getTextSnippet } from "../../data/content";
import { createGenerateMetadata, openGraph } from "../../lib/metadata";

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
  const text = await getTextSnippet("Music");

  return (
    <>
      <MDXContent>{text}</MDXContent>
      <TopMusic />
      <NowPlaying />
      <ContactWidget />
    </>
  );
};

export default MusicPage;
