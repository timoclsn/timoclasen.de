import Link from 'next/link';
import CenteredColumn from './CenteredColumn';
import NavigationLink from './NavigationLink';

export default function Footer() {
    return (
        <footer className={'mt-auto'}>
            <CenteredColumn>
                <ul
                    className={
                        'flex flex-col space-y-6 text-center sm:text-left sm:space-y-0 sm:flex-row sm:space-x-8 mt-12 md:mt-16 xl:mt-24 mb-12'
                    }>
                    <li>
                        <NavigationLink
                            href="https://twitter.com/timoclsn"
                            target="_blank"
                            rel="noopener noreferrer">
                            Twitter
                        </NavigationLink>
                    </li>
                    <li>
                        <NavigationLink
                            href="https://www.linkedin.com/in/timoclsn"
                            target="_blank"
                            rel="noopener noreferrer">
                            LinkedIn
                        </NavigationLink>
                    </li>
                    <li>
                        <NavigationLink
                            href="https://github.com/timoclsn"
                            target="_blank"
                            rel="noopener noreferrer">
                            Github
                        </NavigationLink>
                    </li>
                    <li>
                        <NavigationLink
                            href="https://www.strava.com/athletes/timoclsn"
                            target="_blank"
                            rel="noopener noreferrer">
                            Strava
                        </NavigationLink>
                    </li>
                    <li>
                        <Link href="/impressum" passHref>
                            <NavigationLink>
                                Impressum & Datenschutz
                            </NavigationLink>
                        </Link>
                    </li>
                </ul>
            </CenteredColumn>
        </footer>
    );
}
