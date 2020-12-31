const spaceId = process.env.CONTENTFUL_SPACE_ID;
const publicAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const previewAccessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

export async function queryContent(query, preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${
                    preview ? previewAccessToken : publicAccessToken
                }`
            },
            body: JSON.stringify({ query })
        }
    ).then((response) => response.json());
}
