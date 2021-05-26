export default async function Fetcher(...args: any[]) {
    // @ts-expect-error Don't know how to fix at the moment
    const res = await fetch(...args);

    return res.json();
}
