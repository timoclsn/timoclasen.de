import Image from 'next/image';

export default function Profileimage({ url }) {
    return <Image src={`https:${url}`} width={500} height={500} />;
}
