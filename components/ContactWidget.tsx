import { Linkedin, Mail, Twitter } from 'react-feather';

import { Button } from './Button';
import { WidgetLayout } from './WidgetLayout';
import { WidgetText } from './WidgetText';

interface Props {
  text: string;
}

export function ContactWidget({ text }: Props) {
  return (
    <WidgetLayout>
      <WidgetText title="Kontakt" text={text} />
      <div className="flex h-full w-full flex-col items-center justify-between space-y-4 px-6 py-12 pt-0 sm:space-y-0 sm:pt-12 xl:px-12 xl:py-20">
        <Button as="a" href="mailto:timo@timoclasen.de" fullWidth>
          <Mail />
          E-Mail
        </Button>
        <Button
          as="a"
          variant="ghost"
          href="https://twitter.com/timoclsn"
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
        >
          <Twitter />
          Twitter
        </Button>
        <Button
          as="a"
          variant="ghost"
          href="https://www.linkedin.com/in/timoclsn/"
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
        >
          <Linkedin />
          LinkedIn
        </Button>
      </div>
    </WidgetLayout>
  );
}
