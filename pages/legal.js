import Layout from '../components/layout';
import Textblock from '../components/textblock';
import { getPersonalInfo, getLegal } from '../lib/api';
import { markdownToHTML, stripMarkdown } from '../lib/markdown';

export default function Home({ personalInfo, legal }) {
    return (
        <Layout
            name={personalInfo.name}
            title={personalInfo.title}
            description={personalInfo.introductionStriped}
            twitterHandle={personalInfo.username}
            previewImage={personalInfo.previewImage.fields.file.url}
            keywords={personalInfo.keywords}>
            <Textblock text={legal.content} />
        </Layout>
    );
}

export async function getStaticProps() {
    const personalInfo = await getPersonalInfo();
    const legal = await getLegal();

    // Convert markdown fields to html
    const introduction = await markdownToHTML(personalInfo.introduction);
    const introductionStriped = await stripMarkdown(personalInfo.introduction);
    const description = await markdownToHTML(personalInfo.description);
    const content = await markdownToHTML(legal.content);

    return {
        props: {
            personalInfo: {
                ...personalInfo,
                introduction,
                introductionStriped,
                description
            },
            legal: {
                ...legal,
                content
            }
        }
    };
}
