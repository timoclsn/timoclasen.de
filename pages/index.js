import Layout from '../components/layout';
import Post from '../components/post';
import { fetchEntries } from '../lib/contentful.js';

export default function Home({ posts }) {
    return (
        <Layout>
            <div className={'text-5xl text-red-900'}>Test</div>
            {posts.length > 0
                ? posts.map((p) => (
                      <Post
                          alt={p.fields.alt}
                          date={p.fields.date}
                          key={p.fields.title}
                          image={p.fields.image}
                          title={p.fields.title}
                          url={p.fields.url}
                      />
                  ))
                : null}
        </Layout>
    );
}

export async function getStaticProps() {
    const posts = await fetchEntries();
    return {
        props: {
            posts
        }
    };
}
