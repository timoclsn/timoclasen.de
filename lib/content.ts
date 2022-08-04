import ky from 'ky';

const {
  CONTENTFUL_SPACE_ID: spaceId,
  CONTENTFUL_ACCESS_TOKEN: publicAccessToken,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN: previewAccessToken,
  NODE_ENV: env,
} = process.env;

export async function queryContent(query: string, preview = false) {
  const draftContentInDevelopmentMode = true;

  if (draftContentInDevelopmentMode) {
    preview = preview || env === 'development';
  }

  if (preview) {
    query = query.replace(/preview: false/g, 'preview: true');
  }

  const response = await ky(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          preview ? previewAccessToken : publicAccessToken
        }`,
      },
      json: { query },
    }
  );

  return await response.json<any>();
}
