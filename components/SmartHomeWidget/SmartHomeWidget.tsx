import { getTextSnippet } from "../../data/content";
import { markdownToHTML } from "../../lib/text";
import { BalconyControl } from "./BalconyControl/BalconyControl";
import { Dashboard } from "./Dashboard/Dashboard";

export const SmartHomeWidget = async () => {
  const textData = await getTextSnippet("Smart Home Widget");
  const text = await markdownToHTML(textData);

  const footnoteData = await getTextSnippet("Smart Home Widget Footnote");
  const footnote = await markdownToHTML(footnoteData);

  return (
    <section id="smarthome">
      <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
        Smart Home
      </h2>
      <div className="mb-8" dangerouslySetInnerHTML={{ __html: text }} />
      <Dashboard />
      <div
        className="my-8 text-sm opacity-60"
        dangerouslySetInnerHTML={{ __html: footnote }}
      />
      <BalconyControl />
    </section>
  );
};
