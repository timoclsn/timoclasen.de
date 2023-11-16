import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../../design-system/Button";
import { Markdown } from "../../design-system/Markdown/Markdown";

interface Props {
  title: string;
  text: string;
  linkText?: string;
  href?: string;
}

export const TextWidget = ({ title, text, linkText, href }: Props) => {
  return (
    <div className="flex h-full flex-col justify-between px-6 py-12 xl:px-12 xl:py-20">
      <div>
        <h2 className="mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
          {title}
        </h2>
        <Markdown unstyled className="flex flex-col gap-4">
          {text}
        </Markdown>
      </div>
      {href && (
        <div className="-mb-6 mt-4 flex justify-end xl:-mb-12">
          <Link href={href} passHref legacyBehavior>
            <Button as="a" variant="link">
              <ArrowRight />
              {linkText}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
