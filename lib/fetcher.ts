export default async function Fetcher(...args: any[]) {
    // @ts-expect-error
    const res = await fetch(...args);

    return res.json();
}
