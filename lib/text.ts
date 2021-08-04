import remark from 'remark';
import html from 'remark-html';
import strip from 'strip-markdown';

export async function markdownToHTML(markdown: string) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}

export async function stripMarkdown(markdown: string) {
    const result = await remark().use(strip).process(markdown);
    return result.toString();
}

export function truncate(str: string, n: number, useWordBoundary: boolean) {
    if (str.length <= n) {
        return str;
    }
    const subString = str.substr(0, n - 1);
    return (
        (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + '&hellip;'
    );
}

export function stripFirstLine(text: string) {
    return text.substring(text.indexOf('\n') + 1);
}

export function objToUrlParams(params: Record<string, string>) {
    return Object.entries(params)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join('&');
}
