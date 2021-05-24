export default async function Fetcher(...args: any[]) {
    // @ts-ignore
    const res = await fetch(...args);

    return res.json();
}
