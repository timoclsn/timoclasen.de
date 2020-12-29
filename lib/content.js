const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const publicAccessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const previewAccessToken =
    process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN;

async function fetchGraphQL(query, preview = false) {
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

export async function getPageBySlug(slug) {
    const entry = await fetchGraphQL(
        `query {
            pageCollection(where: { slug: "${slug}" }, limit: 1) {
                items {
                    title
                    description
                    previewImage {
                        url
                        description
                    }
                }
                
            }
        }`
    );
    return entry.data.pageCollection.items[0];
}

export async function getAbout() {
    const entry = await fetchGraphQL(
        `query {
            personalInformationCollection (
                limit: 1
            ){
                items {
                    name
                    introduction
                    image {
                        url
                        description
                    }
                    description
                    contact
                    tools
                }
            }
        }`
    );
    return entry.data.personalInformationCollection.items[0];
}

export async function getLegal() {
    const entry = await fetchGraphQL(
        `query {
            legalCollection (
                limit: 1
            ){
                items {
                    content
                }
            }
        }`
    );
    return entry.data.legalCollection.items[0];
}

export async function getError() {
    const entry = await fetchGraphQL(
        `query {
            errorCollection (
                limit: 1
            ){
                items {
                    content
                }
            }
        }`
    );
    return entry.data.errorCollection.items[0];
}
