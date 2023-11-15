import { getTextSnippet } from "../../data/content";
import { Markdown } from "../../design-system/Markdown/Markdown";
import styles from "./Teaser.module.css";

export const Teaser = async () => {
  const text = await getTextSnippet("Frontpage Header");

  return (
    <Markdown unstyled className={styles.textTeaser} data-cy="home-page-teaser">
      {text}
    </Markdown>
  );
};
