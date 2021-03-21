import { Loader } from 'react-feather';

export default function Button({
    Icon,
    text,
    secondary,
    fullWidth,
    type = 'button',
    onClick,
    disabled,
    isLoading,
    href,
    target
}) {
    const Tag = href ? 'a' : 'button';
    const className = [
        'flex',
        'items-center',
        'justify-center',
        'px-8',
        'py-3',
        'rounded-full',
        'font-bold',
        'space-x-2',
        'disabled:opacity-50',
        'focus:outline-none',
        ...(!secondary
            ? [
                  'bg-highlight dark:bg-highlight-dark text-light dark:text-light hover:bg-opacity-90 dark:hover:bg-opacity-90'
              ]
            : [
                  'border-dark dark:border-light hover:bg-dark dark:hover:bg-light hover:bg-opacity-10 dark:hover:bg-opacity-10 border-2'
              ]),
        ...(fullWidth ? ['w-full'] : ['w-full sm:w-auto'])
    ].join(' ');

    return (
        <Tag
            className={className}
            type={Tag === 'button' ? type : undefined}
            aria-label={Tag === 'button' ? text : undefined}
            onClick={onClick}
            disabled={disabled}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
            {Icon &&
                (isLoading ? (
                    <Loader size={20} className="animate-spin" />
                ) : (
                    <Icon size={20} />
                ))}
            {text && <span>{text}</span>}
        </Tag>
    );
}
