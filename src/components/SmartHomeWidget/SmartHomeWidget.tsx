import { getTextSnippet } from "../../data/content";
import { Markdown } from "../../design-system/Markdown/Markdown";
import { BalconyControl } from "./BalconyControl/BalconyControl";

export const SmartHomeWidget = async () => {
  const text = await getTextSnippet("Smart Home Widget");
  const footnote = await getTextSnippet("Smart Home Widget Footnote");

  return (
    <section id="smarthome">
      <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
        Smart Home
      </h2>
      <div className="mb-8" />
      <Markdown unstyled className="mb-8">
        {text}
      </Markdown>
      {/* <Dashboard /> */}
      <Markdown unstyled className="my-8 text-sm opacity-60">
        {footnote}
      </Markdown>
      <BalconyControl />
    </section>
  );
};
