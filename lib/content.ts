import { z } from "zod";

const {
  CONTENTFUL_SPACE_ID: spaceId,
  CONTENTFUL_ACCESS_TOKEN: publicAccessToken,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: previewAccessToken,
  NODE_ENV: env,
} = process.env;

export const queryContent = async <TSchema extends z.ZodTypeAny>(
  query: string,
  schema: TSchema
) => {
  let preview = false;
  const draftContentInDevelopmentMode = true;
  if (draftContentInDevelopmentMode) {
    preview = preview || env === "development";
  }
  if (preview) {
    query = query.replace(/preview: false/g, "preview: true");
  }

  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview ? previewAccessToken : publicAccessToken
        }`,
      },
      body: JSON.stringify({ query }),
      next: {
        revalidate: 60,
      },
    }
  );
  const data = await res.json();

  return schema.parse(data) as z.infer<TSchema>;
};
