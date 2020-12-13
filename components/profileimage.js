import Image from 'next/image';

export default function Profileimage({ url }) {
    return (
        <Image
            src={`https:${url}`}
            width={400}
            height={500}
            className={'rounded-3xl'}
        />
    );
}
