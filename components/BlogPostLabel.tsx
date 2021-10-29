import type { Icon } from 'react-feather';

interface Props {
  Icon: Icon;
  text: string;
  href?: string;
}

export function BlogPostLabel({ Icon, text, href }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Icon size={16} />
      <p className="whitespace-nowrap">
        {href ? (
          <a
            className="underline hover:opacity-80"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        ) : (
          text
        )}
      </p>
    </div>
  );
}
