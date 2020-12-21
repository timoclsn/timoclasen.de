import Layout from '../components/layout';
import Profileimage from '../components/profileimage';
import Teaser from '../components/teaser';
import Textblock from '../components/textblock';
import { getPersonalInfo } from '../lib/api';
import { markdownToHTML, stripMarkdown } from '../lib/markdown';

export default function Home({ personalInfo }) {
    return (
        <Layout
            name={personalInfo.name}
            title={personalInfo.title}
            description={personalInfo.introductionStriped}
            twitterHandle={personalInfo.twitter}
            previewImage={personalInfo.previewImage.fields.file.url}
            keywords={personalInfo.keywords}>
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
    const introductionStriped = await stripMarkdown(personalInfo.introduction);
    const description = await markdownToHTML(personalInfo.description);

    return {
        props: {
            personalInfo: {
                ...personalInfo,
                introduction,
                introductionStriped,
                description
            }
        }
    };
}
