import WidgetLayout from '@/components/WidgetLayout';
import WidgetText from '@/components/WidgetText';

export default function BlogWidget({ blogPost1, blogPost2 }) {
    return (
        <WidgetLayout
            FirstWidget={
                <WidgetText
                    title={blogPost1.title}
                    text={blogPost1.summary}
                    linkText="Blog"
                    href={`/blog/${blogPost1.slug}`}
                />
            }
            SecondWidget={
                <WidgetText
                    title={blogPost2.title}
                    text={blogPost2.summary}
                    linkText="Blog"
                    href={`/blog/${blogPost1.slug}`}
                />
            }
        />
    );
}
