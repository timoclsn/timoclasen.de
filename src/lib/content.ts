import { draftMode } from "next/headers";
import { z } from "zod";

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  NODE_ENV: env,
} = process.env;

export const queryContent = async <TSchema extends z.ZodTypeAny>(
  query: string,
  schema: TSchema,
) => {
  let isDraftMode = false;

  // Draft Mode is only available in server components
  // Add try catch to prevent error in other environments
  try {
    isDraftMode = draftMode().isEnabled;
  } catch (error) {
    // Ignore error
  }
  const draftContentInDevelopmentMode = true;
  if (draftContentInDevelopmentMode) {
    isDraftMode = isDraftMode || env === "development";
  }
  if (isDraftMode) {
    query = query.replace(/preview: false/g, "preview: true");
  }

  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          isDraftMode
            ? CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    },
  );
  const data = await res.json();

  return schema.parse(data) as z.infer<TSchema>;
};
