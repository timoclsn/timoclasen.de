import Image from 'next/image';

export default function ProfileImage({ url, alt }) {
    return (
        <div className={'flex justify-center'}>
            <Image
                src={url}
                width={400}
                height={400}
                alt={alt}
                quality={90}
                priority
                className={'rounded-3xl'}
            />
        </div>
    );
}
