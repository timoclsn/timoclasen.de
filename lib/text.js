import remark from 'remark';
import html from 'remark-html';
import strip from 'strip-markdown';

export async function markdownToHTML(markdown) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}

export async function stripMarkdown(markdown) {
    const result = await remark().use(strip).process(markdown);
    return result.toString();
}

export function truncate(str, n, useWordBoundary) {
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

export function stripFirstLine(text) {
    return text.substring(text.indexOf('\n') + 1);
}
