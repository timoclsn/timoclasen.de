import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'react-feather';

import { CenteredColumn } from './CenteredColumn';
import { NavigationLink } from './NavigationLink';
import { SwitchMode } from './SwitchMode';

interface Props {
  name: string;
}

export function Navigation({ name }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-4 mb-8 sticky-nav bg-light dark:bg-dark bg-opacity-80 dark:bg-opacity-80 md:py-6 md:mb-20 xl:mb-22">
      <CenteredColumn>
        <nav
          role="navigation"
          data-cy="navigation"
          className="flex items-start justify-between sm:items-center"
        >
          <a href="#skip" className="sr-only">
            Zu Inhalt springen
          </a>
          <div className="flex items-center flex-1 space-x-2 sm:flex-initial md:space-x-4">
            <Link href="/">
              <a
                title="Home"
                className="hover:text-highlight dark:hover:text-highlight-dark whitespace-nowrap"
              >
                <h1>{name}</h1>
              </a>
            </Link>
            <SwitchMode />
          </div>
          <ul
            className={`${
              menuOpen ? 'flex' : 'hidden'
            } flex-col sm:flex-row sm:space-y-0 sm:space-x-4 sm:flex md:space-x-8 mt-16 sm:mt-0 space-y-8 items-center pb-8 sm:pb-0 flex-1 sm:flex-initial`}
          >
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
            <li>
              <Link href="/musik" passHref>
                <NavigationLink>Musik</NavigationLink>
              </Link>
            </li>
          </ul>
          <div className="flex justify-end flex-1 sm:flex-initial sm:hidden">
            <button
              type="button"
              className="w-8 h-8 focus:outline-none menuIcon"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen ? 'true' : 'false'}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">
                {menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              </span>
              <Menu data-hide={menuOpen} />
              <X data-hide={!menuOpen} />
            </button>
          </div>
        </nav>
      </CenteredColumn>
    </header>
  );
}
