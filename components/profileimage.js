import Image from 'next/image';

export default function Profileimage({ url, alt }) {
    return (
        <div className={'flex justify-center'}>
            <Image src={`https:${url}`} width={400} height={500} alt={alt} />
        </div>
    );
}
