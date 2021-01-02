const spaceId = process.env.CONTENTFUL_SPACE_ID;
const publicAccessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const previewAccessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

export async function queryContent(query, preview = false) {
    const draftContentInDevelopmentMode = true;

    if (draftContentInDevelopmentMode) {
        preview = preview || process.env.NODE_ENV === 'development';
    }

    if (preview) {
        query = query.replaceAll('preview: false', 'preview: true');
    }

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
