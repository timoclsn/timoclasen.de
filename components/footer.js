import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={'flex justify-end mt-16'}>
            <Link href="/legal">
                <a
                    className={
                        'text-sm hover:text-highlight dark:hover:text-highlight-dark'
                    }>
                    Impressum & Datenschutzerklärung
                </a>
            </Link>
        </footer>
    );
}
