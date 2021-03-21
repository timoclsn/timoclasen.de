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
    const styles = `px-8 py-3 rounded-full cursor-pointer font-bold flex items-center justify-center space-x-2 ${
        !secondary
            ? 'bg-highlight dark:bg-highlight-dark text-light dark:text-light hover:bg-opacity-90 dark:hover:bg-opacity-90 disabled:opacity-50'
            : 'border-dark dark:border-light hover:bg-dark dark:hover:bg-light hover:bg-opacity-10 dark:hover:bg-opacity-10 border-2 disabled:opacity-50'
    } ${fullWidth && 'w-full'}`;

    return (
        <Tag
            className={styles}
            type={Tag === 'button' ? type : undefined}
            onClick={onClick}
            disabled={disabled}
            aria-label={Tag === 'button' ? text : undefined}
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
            {isLoading ? (
                <Loader size={20} className="animate-spin" />
            ) : (
                <Icon size={20} />
            )}
            <span>{text}</span>
        </Tag>
    );
}
