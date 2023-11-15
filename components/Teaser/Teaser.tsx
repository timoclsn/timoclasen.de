import { getTextSnippet } from "../../data/content";
import { MDXContent } from "../MDXContent/MDXContent";
import styles from "./Teaser.module.css";

export const Teaser = async () => {
  const text = await getTextSnippet("Frontpage Header");

  return (
    <MDXContent
      styled={false}
      className={styles.textTeaser}
      data-cy="home-page-teaser"
    >
      {text}
    </MDXContent>
  );
};
