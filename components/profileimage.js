import Image from 'next/image';

export default function Profileimage({ url, alt }) {
    return (
        <div
            className={
                'flex justify-center border-b-4 border-highlight dark:border-highlight-dark'
            }>
            <Image
                src={'/images/preview-image.jpg'}
                width={400}
                height={500}
                alt={alt}
                priority
            />
        </div>
    );
}
