import Link from 'next/link';

export default function Navigation({ name, profession }) {
    return (
        <header className={'flex justify-start mb-16'}>
            <Link href="/">
                <a
                    className={
                        'hover:text-highlight dark:hover:text-highlight-dark'
                    }>
                    <div className={'text-xl font-bold'}>
                        <h1>{name}</h1>
                    </div>
                    <div className={'text-sm'}>{profession}</div>
                </a>
            </Link>
        </header>
    );
}
