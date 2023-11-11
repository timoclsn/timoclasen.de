import Head from "next/head";

interface PreviewImage {
  url: string;
  description: string;
}

interface Props {
  title: string;
  description: string;
  slug: string;
  previewImage?: PreviewImage;
  name: string;
}

export function SEO({ title, description, slug, previewImage, name }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <link
        rel="canonical"
        href={`https://timoclasen.de${slug}`}
        key="canonical"
      />

      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:site_name" content={name} key="og:site_name" />
      <meta property="og:locale" content="de" key="og:locale" />
      <meta
        property="og:url"
        content={`https://timoclasen.de${slug}`}
        key="og:url"
      />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:image" content={previewImage?.url} key="og:image" />
      <meta
        property="og:image:alt"
        content={previewImage?.description}
        key="og:image:alt"
      />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
      <meta name="twitter:site" content="@timoclsn" key="twitter:site" />
      <meta name="twitter:creator" content="@timoclsn" key="twitter:creator" />
    </Head>
  );
}
