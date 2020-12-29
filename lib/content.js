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

export async function getPerson(id) {
    const entry = await fetchGraphQL(
        `query {
            person(id: "${id}") {
                name
                username
                picture {
                    description
                    url
                }
                address
                email
                phone
                cvText
            }
        }`
    );
    return entry.data.person;
}

export async function getTextSnippet(id) {
    const entry = await fetchGraphQL(
        `query {
            textSnippet(id: "${id}") {
                title
                content
            }
        }`
    );
    return entry.data.textSnippet;
}

export async function getPage(id) {
    const entry = await fetchGraphQL(
        `query {
            page(id: "${id}") {
                title
                slug
                description
                previewImage {
                    description
                    url
                }
            }
        }`
    );
    return entry.data.page;
}
