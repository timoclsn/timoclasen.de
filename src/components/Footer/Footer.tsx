import { Container } from "../../design-system/Container/Container";
import { NavigationLink } from "../Navigation/NavigationLink";

export const Footer = () => {
  return (
    <footer className="mt-auto" data-cy="footer">
      <Container>
        <ul className="mb-12 mt-12 flex flex-col gap-6 text-center sm:flex-row sm:gap-0 sm:text-left md:mt-16 xl:mt-24">
          <li className="mr-0 sm:mr-8">
            <NavigationLink
              href="https://twitter.com/timoclsn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </NavigationLink>
          </li>
          <li className="mr-0 sm:mr-8">
            <NavigationLink
              href="https://www.linkedin.com/in/timoclsn"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </NavigationLink>
          </li>
          <li className="mr-0 sm:mr-8">
            <NavigationLink
              href="https://github.com/timoclsn"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </NavigationLink>
          </li>
          <li className="mr-0 sm:mr-8">
            <NavigationLink
              href="https://www.strava.com/athletes/timoclsn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Strava
            </NavigationLink>
          </li>
          <li className="mr-0 sm:mr-8">
            <NavigationLink href="/rss.xml">RSS</NavigationLink>
          </li>
          <li className="ml-0 sm:ml-auto">
            <NavigationLink href="/impressum">
              Impressum & Datenschutz
            </NavigationLink>
          </li>
        </ul>
      </Container>
    </footer>
  );
};
