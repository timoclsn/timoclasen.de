const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const publicAccessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const previewAccessToken =
    process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN;

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
