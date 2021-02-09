import Link from 'next/link';

import Container from '@/components/CenteredColumn';
import NavigationLink from '@/components/NavigationLink';
import SwitchMode from '@/components/SwitchMode';

export default function Navigation({ name }) {
    return (
        <header
            className={
                'sticky-nav bg-light dark:bg-dark bg-opacity-80 dark:bg-opacity-80 py-4 md:py-6 mb-8 md:mb-20 xl:mb-22'
            }>
            <Container>
                <nav
                    data-cy="navigation"
                    className={'flex justify-between items-center'}>
                    <a href="#skip" className="sr-only">
                        Zu Inhalt springen
                    </a>
                    <div className={'flex items-center space-x-2 md:space-x-4'}>
                        <Link href="/">
                            <a
                                title="Home"
                                className={
                                    'hover:text-highlight dark:hover:text-highlight-dark'
                                }>
                                <h1>{name}</h1>
                            </a>
                        </Link>
                        <SwitchMode />
                    </div>
                    <ul className={'flex space-x-4 md:space-x-8'}>
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
