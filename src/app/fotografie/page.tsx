import { query } from "../../api/query";
import { ContactWidget } from "../../components/ContactWidget/ContactWidget";
import { Markdown } from "../../design-system/Markdown/Markdown";

const PhotographyPage = async () => {
  const text = await query.content.textSnippet("Photography");

  return (
    <>
      <Markdown>{text}</Markdown>
      <ContactWidget />
    </>
  );
};

export default PhotographyPage;
