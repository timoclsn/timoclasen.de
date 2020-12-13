import Layout from '../components/layout';
import Profileimage from '../components/profileimage';
import Teaser from '../components/teaser';
import Textblock from '../components/textblock';
import { fetchEntries } from '../lib/api';

export default function Home({ homepage }) {
    const data = homepage[0].fields;
    return (
        <Layout>
            <Profileimage url={data.profileImage.fields.file.url} />
            <Teaser text={data.title} />
            <Textblock text={data.about} />
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
