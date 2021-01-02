import Link from 'next/link';
import Container from './CenteredColumn';
import NavigationLink from './NavigationLink';

export default function Navigation({ name }) {
    return (
        <header
            className={
                'sticky-nav bg-light dark:bg-dark bg-opacity-80 py-4 md:py-6 mb-8 md:mb-20 xl:mb-22'
            }>
            <Container>
                <nav>
                    <ul className={'flex justify-end space-x-4 md:space-x-8'}>
                        <li className={'mr-auto'}>
                            <Link href="/">
                                <a
                                    title="Home"
                                    className={
                                        'hover:text-highlight dark:hover:text-highlight-dark'
                                    }>
                                    <h1>{name}</h1>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/ueber" passHref>
                                <NavigationLink>Über</NavigationLink>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" passHref>
                                <NavigationLink>Blog</NavigationLink>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    );
}
