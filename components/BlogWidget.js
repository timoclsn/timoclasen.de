import WidgetLayout from './WidgetLayout';
import WidgetText from './WidgetText';

export default function BlogWidget({ blogPost1, blogPost2 }) {
    return (
        <WidgetLayout
            FirstWidget={
                <WidgetText
                    title={blogPost1.title}
                    text={blogPost1.summary}
                    href={`/blog/${blogPost1.slug}`}
                />
            }
            SecondWidget={
                <WidgetText
                    title={blogPost2.title}
                    text={blogPost2.summary}
                    href={`/blog/${blogPost1.slug}`}
                />
            }
        />
    );
}
