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
