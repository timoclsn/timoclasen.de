import { draftMode } from "next/headers";
import { z } from "zod";

const {
  CONTENTFUL_SPACE_ID: spaceId,
  CONTENTFUL_ACCESS_TOKEN: publicAccessToken,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: previewAccessToken,
  NODE_ENV: env,
} = process.env;

export const queryContent = async <TSchema extends z.ZodTypeAny>(
  query: string,
  schema: TSchema,
) => {
  let isDraftMode = draftMode().isEnabled;
  const draftContentInDevelopmentMode = true;
  if (draftContentInDevelopmentMode) {
    isDraftMode = isDraftMode || env === "development";
  }
  if (isDraftMode) {
    query = query.replace(/preview: false/g, "preview: true");
  }

  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          isDraftMode ? previewAccessToken : publicAccessToken
        }`,
      },
      body: JSON.stringify({ query }),
    },
  );
  const data = await res.json();

  return schema.parse(data) as z.infer<TSchema>;
};
