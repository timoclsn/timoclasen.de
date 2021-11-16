import styles from './Teaser.module.css';

interface Props {
  text: string;
}

export function Teaser({ text }: Props) {
  return (
    <section
      className={styles.textTeaser}
      data-cy="home-page-teaser"
      dangerouslySetInnerHTML={{ __html: text }}
    ></section>
  );
}
