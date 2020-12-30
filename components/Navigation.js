import Link from 'next/link';
import Container from './CenteredColumn';
import NavigationLink from './NavigationLink';

export default function Navigation({ name }) {
    return (
        <header
            className={
                'bg-light dark:bg-dark bg-opacity-80 py-4 md:py-6 mb-8 md:mb-20 xl:mb-22'
            }>
            <Container>
                <nav className={'flex justify-between items-center'}>
                    <Link href="/">
                        <a
                            className={
                                'hover:text-highlight dark:hover:text-highlight-dark'
                            }>
                            <h1>{name}</h1>
                        </a>
                    </Link>
                    <ul className={'flex space-x-4 md:space-x-8'}>
                        <li>
                            <Link href="/ueber" passHref>
                                <NavigationLink>Über</NavigationLink>
                            </Link>
                        </li>
                        <li>
                            <NavigationLink href="https://codeatelier.com">
                                Codeatelier
                            </NavigationLink>
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    );
}
