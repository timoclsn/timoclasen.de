const fs = require('fs');
const fetch = require('node-fetch');
const parser = require('fast-xml-parser');

const coversDir = './public/podcasts';

if (fs.existsSync(coversDir)) {
    fs.rmdirSync(coversDir, { recursive: true });
}

fs.mkdirSync(coversDir);

(async () => {
    const subsXML = fs
        .readFileSync('./scripts/podcasts/subscriptions.opml')
        .toString();

    const subsJSObj = parser.parse(
        subsXML,
        {
            attributeNamePrefix: '',
            attrNodeName: false,
            ignoreAttributes: false
        },
        true
    ).opml.body.outline;

    const data = await Promise.all(
        subsJSObj.flatMap(async (podcast) => {
            let podcastObj = {
                titel: podcast.title,
                feedUrl: podcast.xmlUrl
            };

            const response = await fetch(podcast.xmlUrl);
            if (response.ok) {
                const podcastXML = await response.text();
                try {
                    const podcastJSObj = parser.parse(
                        podcastXML,
                        {
                            attributeNamePrefix: '',
                            attrNodeName: false,
                            ignoreAttributes: false
                        },
                        true
                    ).rss.channel;

                    podcastObj.title = podcastJSObj.title;
                    podcastObj.description = podcastJSObj.description;
                    podcastObj.website = podcastJSObj.link;
                    podcastObj.hosts = podcastJSObj['itunes:author'];

                    const randomString = Math.random()
                        .toString(36)
                        .substring(7);

                    const imageUrl = podcastJSObj.image
                        ? podcastJSObj.image.url
                        : podcastJSObj['itunes:image'].href;

                    const imageResponse = await fetch(imageUrl);
                    const buffer = await imageResponse.buffer();
                    fs.writeFile(
                        `${coversDir}/${randomString}.jpg`,
                        buffer,
                        () => {}
                    );
                    podcastObj.image = `/public/podcasts/${randomString}.jpg`;
                } catch (e) {
                    console.log(`❌ ${podcast.title} (${podcast.xmlUrl})`);
                    return [];
                }
            } else {
                console.log(`❌ ${podcast.title} (${podcast.xmlUrl})`);
                return [];
            }
            return podcastObj;
        })
    );

    console.log(data);
})();
