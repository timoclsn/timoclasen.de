export async function fetcher(...args: [RequestInfo, RequestInit?]) {
    const res = await fetch(...args);

    return res.json();
}
