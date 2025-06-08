"use client";

import { cx } from "cva";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Container } from "../../design-system/Container/Container";
import { SwitchMode } from "../SwitchMode/SwitchMode";
import styles from "./Navigation.module.css";
import { NavigationLink } from "./NavigationLink";

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cx(
        "xl:mb-22 mb-8 bg-light/80 py-4 dark:bg-dark/80 md:mb-20 md:py-6",
        styles.stickyNav,
      )}
    >
      <Container>
        <nav
          role="navigation"
          data-cy="navigation"
          className="flex items-start justify-between sm:items-center"
        >
          <a href="#skip" className="sr-only">
            Zu Inhalt springen
          </a>
          <div className="flex flex-1 items-center gap-2 sm:flex-initial md:gap-4">
            <Link
              href="/"
              title="Home"
              className="whitespace-nowrap hover:text-highlight dark:hover:text-highlight-dark"
            >
              <h1>Timo Clasen</h1>
            </Link>
            <SwitchMode />
          </div>
          <ul
            className={`${
              menuOpen ? "flex" : "hidden"
            } mt-16 flex-1 flex-col items-center gap-8 pb-8 sm:mt-0 sm:flex sm:flex-initial sm:flex-row sm:gap-4 sm:pb-0 md:gap-8`}
          >
            <li>
              <Link href="/ueber" passHref legacyBehavior>
                <NavigationLink onClick={closeMenu}>Über</NavigationLink>
              </Link>
            </li>
            <li>
              <Link href="/blog" passHref legacyBehavior>
                <NavigationLink onClick={closeMenu}>Blog</NavigationLink>
              </Link>
            </li>
            <li>
              <Link href="/podcasts" passHref legacyBehavior>
                <NavigationLink onClick={closeMenu}>Podcasts</NavigationLink>
              </Link>
            </li>
            <li>
              <Link href="/musik" passHref legacyBehavior>
                <NavigationLink onClick={closeMenu}>Musik</NavigationLink>
              </Link>
            </li>
            <li>
              <Link href="/fotografie" passHref legacyBehavior>
                <NavigationLink onClick={closeMenu}>Fotografie</NavigationLink>
              </Link>
            </li>
          </ul>
          <div className="flex flex-1 justify-end sm:hidden sm:flex-initial">
            <button
              type="button"
              className={cx(
                "focus-visible:outline-hidden h-8 w-8",
                styles.menuIcon,
              )}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen ? "true" : "false"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">
                {menuOpen ? "Menü schließen" : "Menü öffnen"}
              </span>
              <Menu data-hide={menuOpen} />
              <X data-hide={!menuOpen} />
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
};
