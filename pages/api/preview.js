import { queryContent } from '../../lib/content';

export default async function preview(req, res) {
    const { secret, slug } = req.query;

    if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (!post) {
        return res.status(401).json({ message: 'Invalid slug' });
    }

    res.setPreviewData({});

    const post = await queryContent(
        `{
            blogPost: blogPostCollection(where: {slug: "${slug}"}, limit: 1) {
                items {
                    title
                    slug
                }
            }
        }`
    );

    res.redirect(`/blog/${post.slug}`);
    res.end();
}
