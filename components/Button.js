export default function Button({ Icon, text, href, secondary }) {
    return (
        <a
            className={`${
                !secondary
                    ? 'bg-highlight dark:bg-highlight-dark text-light dark:text-light hover:bg-opacity-90'
                    : 'border-dark dark:border-light hover:bg-dark dark:hover:bg-light hover:bg-opacity-10 border-2'
            } block w-full p-3  rounded-full cursor-pointer`}
            href={href}>
            <div className={'flex justify-center items-center space-x-2'}>
                <Icon size={20} />
                <div>{text}</div>
            </div>
        </a>
    );
}
