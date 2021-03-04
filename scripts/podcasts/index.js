const fs = require('fs');
const fetch = require('node-fetch');
const parser = require('fast-xml-parser');
const sharp = require('sharp');

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
                    podcastObj.feed = podcast.xmlUrl;
                    // podcastObj.description = podcastJSObj.description;
                    podcastObj.website = podcastJSObj.link;
                    podcastObj.hosts = podcastJSObj['itunes:author'];
                    // podcastObj.category =
                    //     podcastJSObj['media:category'] ||
                    //     podcastJSObj['itunes:category'];
                    podcastObj.image = `cover-${hashString(
                        podcastObj.title
                    )}.jpg`;
                    const imageUrl = podcastJSObj.image
                        ? podcastJSObj.image.url
                        : podcastJSObj['itunes:image'].href;
                    const imageResponse = await fetch(imageUrl);
                    const imageBuffer = await imageResponse.buffer();
                    sharp(imageBuffer)
                        .resize(1000)
                        .toFile(`${coversDir}/${podcastObj.image}`);
                } catch (e) {
                    console.log(
                        `❌ (parse feed) ${podcast.title} (${podcast.xmlUrl})`
                    );
                    return [];
                }
            } else {
                console.log(
                    `❌ (fetch feed) ${podcast.title} (${podcast.xmlUrl})`
                );
                return [];
            }
            return podcastObj;
        })
    );

    const podcastsClean = podcasts
        .flat()
        .sort((a, b) => a.title.localeCompare(b.title));

    fs.writeFileSync('./data/podcasts.json', JSON.stringify(podcastsClean));
})();

function hashString(string) {
    let hash = 0;

    if (string.length === 0) {
        return hash;
    }

    for (let i = 0; i < string.length; i++) {
        let chr = string.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
