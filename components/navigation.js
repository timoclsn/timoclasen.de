import Link from 'next/link';

export default function Navigation({ name, title }) {
    return (
        <div>
            <Link href="/">
                <a>
                    <div className={'text-lg font-bold'}>{name}</div>
                    <div>{title}</div>
                </a>
            </Link>
        </div>
    );
}
