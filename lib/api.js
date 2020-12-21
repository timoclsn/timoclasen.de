import * as contentful from 'contentful';

const client = contentful.createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
});

export async function getEntryById(id) {
    const entry = await client.getEntry(id);
    return entry.fields;
}

export async function getPersonalInfo() {
    const entry = await client.getEntry('61BhybCrbV6PD6amyajBUA');
    return entry.fields;
}

export async function getLegal() {
    const entry = await client.getEntry('44I1yKwTvmbvmd1j8kkeZC');
    return entry.fields;
}
