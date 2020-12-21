import Layout from '../components/layout';
import Profileimage from '../components/profileimage';
import Teaser from '../components/teaser';
import Textblock from '../components/textblock';
import { getPersonalInfo } from '../lib/api';
import markdownToHTML from '../lib/markdownToHTML';

export default function Home({ personalInfo }) {
    return (
        <Layout data={personalInfo}>
            <Teaser text={personalInfo.introduction} />
            <div className={'flex justify-center'}>
                <Profileimage url={personalInfo.image.fields.file.url} />
            </div>
            <Textblock text={personalInfo.description} />
        </Layout>
    );
}

export async function getStaticProps() {
    const personalInfo = await getPersonalInfo();

    // Convert markdown fields to html
    const introduction = await markdownToHTML(personalInfo.introduction);
    const description = await markdownToHTML(personalInfo.description);

    return {
        props: {
            personalInfo: {
                ...personalInfo,
                introduction,
                description
            }
        }
    };
}
