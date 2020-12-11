import Image from 'next/image';
import Layout from '../components/layout';
import { fetchEntries } from '../lib/api';

export default function Home({ homepage }) {
    return (
        <Layout>
            <div className={'text-5xl text-red-900'}>
                {homepage[0].fields.title}
            </div>
            <div>{homepage[0].fields.about}</div>
            <Image
                src={`https:${homepage[0].fields.profileImage.fields.file.url}`}
                width={500}
                height={500}
            />
        </Layout>
    );
}

export async function getStaticProps() {
    const homepage = await fetchEntries();
    return {
        props: {
            homepage
        }
    };
}
