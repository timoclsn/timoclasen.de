import { getTextSnippet } from "../../data/content";
import { markdownToHTML } from "../../lib/text";
import styles from "./Teaser.module.css";

export const Teaser = async () => {
  const headerText = await getTextSnippet("Frontpage Header");
  const text = await markdownToHTML(headerText);

  return (
    <section
      className={styles.textTeaser}
      data-cy="home-page-teaser"
      dangerouslySetInnerHTML={{ __html: text }}
    ></section>
  );
};
