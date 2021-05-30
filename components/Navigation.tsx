import Link from 'next/link';

import { CenteredColumn } from './CenteredColumn';
import { NavigationLink } from './NavigationLink';
import { SwitchMode } from './SwitchMode';

interface Props {
    name: string;
}

export function Navigation({ name }: Props) {
    return (
        <header className="py-4 mb-8 sticky-nav bg-light dark:bg-dark bg-opacity-80 dark:bg-opacity-80 md:py-6 md:mb-20 xl:mb-22">
            <CenteredColumn>
                <nav
                    data-cy="navigation"
                    className="flex items-center justify-between">
                    <a href="#skip" className="sr-only">
                        Zu Inhalt springen
                    </a>
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <Link href="/">
                            <a
                                title="Home"
                                className="hover:text-highlight dark:hover:text-highlight-dark">
                                <h1>{name}</h1>
                            </a>
                        </Link>
                        <SwitchMode />
                    </div>
                    <ul className="flex space-x-4 md:space-x-8">
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
                        <li>
                            <Link href="/podcasts" passHref>
                                <NavigationLink>Podcasts</NavigationLink>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </CenteredColumn>
        </header>
    );
}
