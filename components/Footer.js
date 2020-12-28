import Link from 'next/link';
import CenteredColumn from './CenteredColumn';
import NavigationLink from './NavigationLink';

export default function Footer() {
    return (
        <footer className={'mt-auto'}>
            <CenteredColumn>
                <ul
                    className={
                        'flex flex-col space-y-6 text-center sm:text-left sm:space-y-0 sm:flex-row sm:space-x-8 mt-6 md:mt-12 xl:mt-24 mb-12'
                    }>
                    <li>
                        <NavigationLink href="https://twitter.com/timoclsn">
                            Twitter
                        </NavigationLink>
                    </li>
                    <li>
                        <NavigationLink href="https://www.linkedin.com/in/timoclsn">
                            LinkedIn
                        </NavigationLink>
                    </li>
                    <li>
                        <NavigationLink href="https://github.com/timoclsn">
                            Github
                        </NavigationLink>
                    </li>
                    <li>
                        <NavigationLink href="https://www.strava.com/athletes/timoclsn">
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
