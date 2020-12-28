import Link from 'next/link';
import Container from './CenteredColumn';
import NavigationLink from './NavigationLink';

export default function Navigation({ name, profession }) {
    return (
        <header
            className={
                'sticky-nav bg-light dark:bg-dark bg-opacity-80 py-4 mb-6 md:mb-12 xl:mb-24'
            }>
            <Container>
                <nav className={'flex justify-between items-center'}>
                    <Link href="/">
                        <a
                            className={
                                'hover:text-highlight dark:hover:text-highlight-dark'
                            }>
                            {name}
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
