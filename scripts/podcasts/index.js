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

    const podcasts = await Promise.all(
        subsJSObj.map(async (podcast) => {
            let podcastObj = {};

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
                    podcastObj.feedUrl = podcastJSObj.xmlUrl;
                    podcastObj.description = podcastJSObj.description;
                    podcastObj.website = podcastJSObj.link;
                    podcastObj.hosts = podcastJSObj['itunes:author'];
                    podcastObj.category =
                        podcastJSObj['media:category'] ||
                        podcastJSObj['itunes:category'];

                    const randomString = Math.random()
                        .toString(36)
                        .substring(7);

                    const imageUrl = podcastJSObj.image
                        ? podcastJSObj.image.url
                        : podcastJSObj['itunes:image'].href;

                    const imageResponse = await fetch(imageUrl);
                    const imageBuffer = await imageResponse.buffer();
                    const filename = `${coversDir}/cover-${randomString}.jpg`;
                    fs.writeFile(filename, imageBuffer, () => {});
                    podcastObj.image = filename;
                } catch (e) {
                    console.log(
                        `❌ (parse feed) ${podcast.title} (${podcast.xmlUrl})`
                    );
                    return null;
                }
            } else {
                console.log(
                    `❌ (fetch feed) ${podcast.title} (${podcast.xmlUrl})`
                );
                return null;
            }
            return podcastObj;
        })
    );

    const filteredPodcasts = podcasts.filter(
        (podcast) => podcast !== null || Object.keys(podcast).length === 0
    );

    const podcastsJSON = JSON.stringify(filteredPodcasts);
    fs.writeFileSync('./data/podcasts.json', podcastsJSON);
})();
