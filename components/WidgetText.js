import Link from 'next/link';
import { ArrowRight } from 'react-feather';

import Button from '@/components/Button';

export default function WidgetText({ title, text, linkText, href }) {
    return (
        <div className="flex flex-col justify-between h-full px-6 py-12 xl:px-12 xl:py-20">
            <div>
                <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
                    {title}
                </h2>
                <div
                    className="flex flex-col space-y-4"
                    dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
            {href && (
                <div className="flex justify-end mt-4 -mb-6 xl:-mb-12">
                    <Link href={href}>
                        <Button as="a" variant="link">
                            <ArrowRight />
                            {linkText}
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
