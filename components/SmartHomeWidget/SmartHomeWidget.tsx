import { getTextSnippet } from "../../data/content";
import { MDXContent } from "../MDXContent/MDXContent";
import { BalconyControl } from "./BalconyControl/BalconyControl";
import { Dashboard } from "./Dashboard/Dashboard";

export const SmartHomeWidget = async () => {
  const text = await getTextSnippet("Smart Home Widget");
  const footnote = await getTextSnippet("Smart Home Widget Footnote");

  return (
    <section id="smarthome">
      <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
        Smart Home
      </h2>
      <div className="mb-8" />
      <MDXContent styled={false} className="mb-8">
        {text}
      </MDXContent>
      <Dashboard />
      <MDXContent styled={false} className="my-8 text-sm opacity-60">
        {footnote}
      </MDXContent>
      <BalconyControl />
    </section>
  );
};
