import Button from './Button';
import { Mail, Twitter, Linkedin } from 'react-feather';

export default function WidgetButtons() {
    return (
        <>
            <div
                className={
                    'flex flex-col justify-between items-center space-y-10 h-full w-full px-6 pt-0 sm:pt-12 py-12'
                }>
                <Button
                    Icon={Mail}
                    text={'E-Mail'}
                    href={'mailto:timo@timoclasen.de'}
                />
                <Button
                    Icon={Twitter}
                    text={'Twitter'}
                    href={'https://twitter.com/timoclsn'}
                    secondary
                />
                <Button
                    Icon={Linkedin}
                    text={'LinkedIn'}
                    href={'https://www.linkedin.com/in/timoclsn/'}
                    secondary
                />
            </div>
        </>
    );
}
