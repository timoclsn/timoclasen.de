import { query } from "../../api/query";
import { Markdown } from "../../design-system/Markdown/Markdown";

export const Teaser = async () => {
  const text = await query.content.textSnippet("Frontpage Header");

  return (
    <Markdown
      unstyled
      className="text-2xl sm:text-3xl md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight xl:text-6xl xl:leading-tight [&_h2]:mb-4 [&_h2]:font-bold [&_h2]:md:mb-6 [&_p_a:hover]:underline-offset-8 [&_p_a:hover]:lg:underline-offset-[12px] [&_p_a]:text-highlight [&_p_a]:underline-offset-4 [&_p_a]:dark:text-highlight-dark [&_p_a]:lg:underline-offset-8"
      data-cy="home-page-teaser"
    >
      {text}
    </Markdown>
  );
};
