import Link from 'next/link';

export default function Navigation({ name, profession }) {
    return (
        <div>
            <Link href="/">
                <a>
                    <div className={'text-lg font-bold'}>{name}</div>
                    <div>{profession}</div>
                </a>
            </Link>
        </div>
    );
}
