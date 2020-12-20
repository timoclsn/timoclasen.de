import Layout from '../components/layout';
import Profileimage from '../components/profileimage';
import Teaser from '../components/teaser';
import Textblock from '../components/textblock';
import { getPersonalInfo } from '../lib/api';
import markdownToHtml from '../lib/markdownToHtml';

export default function Home({ personalInfo }) {
    return (
        <Layout data={personalInfo}>
            <div className={'flex justify-center'}>
                <Profileimage url={personalInfo.image.fields.file.url} />
            </div>
            <Teaser text={personalInfo.introduction} />
            <Textblock text={personalInfo.description} />
        </Layout>
    );
}

export async function getStaticProps() {
    const personalInfo = await getPersonalInfo();

    // Convert markdown fields to html
    const introduction = await markdownToHtml(personalInfo.introduction);
    const description = await markdownToHtml(personalInfo.description);

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
