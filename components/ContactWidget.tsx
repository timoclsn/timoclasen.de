import { Linkedin, Mail, Twitter } from 'react-feather';

import Button from './Button';
import WidgetLayout from './WidgetLayout';
import WidgetText from './WidgetText';

interface Props {
    text: string;
}

export default function ContactWidget({ text }: Props) {
    return (
        <WidgetLayout>
            <WidgetText title="Kontakt" text={text} />
            <div className="flex flex-col items-center justify-between w-full h-full px-6 py-12 pt-0 space-y-4 sm:space-y-0 xl:px-12 sm:pt-12 xl:py-20">
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
                    fullWidth>
                    <Twitter />
                    Twitter
                </Button>
                <Button
                    as="a"
                    variant="ghost"
                    href="https://www.linkedin.com/in/timoclsn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth>
                    <Linkedin />
                    LinkedIn
                </Button>
            </div>
        </WidgetLayout>
    );
}
