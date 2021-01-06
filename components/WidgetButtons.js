import { Linkedin, Mail, Twitter } from 'react-feather';

import Button from './Button';

export default function WidgetButtons() {
    return (
        <>
            <div
                className={
                    'flex flex-col justify-between items-center space-y-4 sm:space-y-0 h-full w-full px-6 xl:px-12 pt-0 sm:pt-12 py-12 xl:py-20'
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
